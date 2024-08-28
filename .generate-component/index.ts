import * as fs from 'fs';
import * as readline from 'readline';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { barrel, component, story, test } from './component_templates.js';

// ----------------------------------------------------------------------------------------------------
//  Yargs setup
// ----------------------------------------------------------------------------------------------------

type Arguments = {
  [x: string]: unknown;
  name: string | undefined;
  test: boolean | undefined;
  story: boolean | undefined;
  component: boolean | undefined;
  all: boolean | undefined;
  _: (string | number)[];
  $0: string;
};

const argv: Arguments = yargs(hideBin(process.argv))
  .options({
    name: {
      type: 'string',
      alias: 'n',
      description:
        'The name of the new component. Can be provided in snake_case or "space case"\
         and will be converted to PascalCase.',
    },
    test: {
      type: 'boolean',
      alias: 't',
      description: 'Generate <component name>.test.tsx.',
    },
    story: {
      type: 'boolean',
      alias: 'b',
      description: 'Generate <component name>.stories.tsx.',
    },
    component: {
      type: 'boolean',
      alias: 'c',
      description: 'Generate <component name>.tsx and export it from <folder>/index.ts.',
    },
    all: {
      type: 'boolean',
      alias: 'a',
      description:
        'Generate all file types for the new component. Equivalent to `-cbt` \
        or `--component --story --test`.',
    },
  })
  .parseSync();

// ----------------------------------------------------------------------------------------------------
// Main function
// ----------------------------------------------------------------------------------------------------

async function main() {
  // --------------------------------------------------
  // Argument logic
  // --------------------------------------------------

  let {
    name,
    test: shouldIncludeTest,
    story: shouldIncludeStory,
    component: shouldIncludeComponent,
    all,
  } = argv;

  let folder = await getFolderPath(name, 3);

  if (folder === undefined) {
    throw new Error('You must include a component name.');
  }

  name = folder.split('/').at(-1);
  if (!name) throw new Error('You must include a component name.');
  console.log(`\nCreating files for ${name}`);

  // --------------------------------------------------
  // Generate/Find File Paths
  // --------------------------------------------------

  const componentPath = `${folder}/${name}.tsx`;
  const storyPath = `${folder}/${name}.stories.tsx`;
  const testPath = `${folder}/${name}.test.tsx`;
  const indexPath = `${folder}/index.ts`;

  // --------------------------------------------------
  // Check which files to write
  // --------------------------------------------------

  shouldIncludeComponent ||= all;
  shouldIncludeComponent ||= await askToIncludeFile('component file');
  shouldIncludeComponent &&= isFilePathAvailable(componentPath);

  shouldIncludeStory ||= all;
  shouldIncludeStory ||= await askToIncludeFile('storybook story file');
  shouldIncludeStory &&= isFilePathAvailable(storyPath);

  shouldIncludeTest ||= all;
  shouldIncludeTest ||= await askToIncludeFile('test file');
  shouldIncludeTest &&= isFilePathAvailable(testPath);

  // --------------------------------------------------
  // Write files
  // --------------------------------------------------

  console.log(`\nAdding component files to ${folder}`);

  // component.tsx

  if (shouldIncludeComponent) {
    fs.writeFile(indexPath, '', writeFileErrorHandler);
    fs.writeFile(componentPath, component(name), writeFileErrorHandler);
    updateIndex(indexPath, name, true);
  }

  // storybook.jsx
  if (shouldIncludeStory) {
    fs.writeFile(storyPath, story(name), writeFileErrorHandler);
  }
  // test.tsx
  if (shouldIncludeTest) {
    fs.writeFile(testPath, test(name), writeFileErrorHandler);
  }
}

main();

// ----------------------------------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------------------------------

function capitalize(word: string) {
  return `${word[0]?.toUpperCase() ?? ''}${word.substring(1) ?? ''}`;
}

function replaceUnderscores(string: string = '') {
  return string.replaceAll('_', ' ');
}

function replaceDashes(string: string = '') {
  return string.replaceAll('-', ' ');
}

function camelCase(string: string) {
  return replaceDashes(replaceUnderscores(string))
    .split(' ')
    .map((word) => capitalize(word))
    .join('');
}

async function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

function isFilePathAvailable(path?: string) {
  const doesNotExist = !(path && fs.existsSync(path));
  if (doesNotExist) {
    console.log(`\n Writing ${path}`);
    return doesNotExist;
  }
  console.log(`\n ${path} already exists.`);
  return doesNotExist;
}

function writeFileErrorHandler(err: NodeJS.ErrnoException | null) {
  if (err) throw err;
}

function updateIndex(path: string, name: string, relative?: boolean) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    const multipleExports = data.match(/export \* from ('.*';)/g) ?? [];
    const defaultExports = data.match(/export \{.* from ('.*';)/g) ?? [];
    const defaults = defaultExports.sort().join('\n');
    const multiples = [...multipleExports, barrel(name as string, relative)].sort().join('\n');
    const fileContent = `${defaults}${
      defaultExports.length ? '\n' : ''
    }${multiples}`;

    fs.writeFile(path, fileContent, writeFileErrorHandler);
  });
}

async function askToIncludeFile(fileType: string) {
  return ask(`\nWould you like to include ${fileType}? [y/n] `).then(
    (answer) => answer.toLowerCase() === 'y',
  );
}

async function getFolderPath(componentName: string | undefined, triesLeft: number) {
  if (triesLeft === 0) {
    return;
  }

  const BASE_PATH = `./lib/`;
  let folderName = componentName ? camelCase(componentName) : undefined;
  const existingSubDirs = fs
    .readdirSync(BASE_PATH, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  if (folderName === undefined) {
    folderName = await ask('\nProvide a component name. ');
    folderName = camelCase(folderName);
  }

  const folderExists = folderName === '' || !!existingSubDirs.find((dir) => dir === folderName);
  const potentialFolder = folderExists
    ? undefined
    : existingSubDirs.find((dir) => dir.toLowerCase() === folderName?.toLowerCase());

  if (folderExists) {
    const useExistingFolder = await ask(
      `\n${folderName} is an existing component, do you want to add files to the existing component folder? [y/n]`,
    );
    if (useExistingFolder.toLowerCase() === 'y') {
      return `${BASE_PATH}${folderName}`;
    }
  }

  let potentialSuccess = false;

  if (potentialFolder) {
    await ask(`\nDid you mean ${potentialFolder}? [y/n] `).then((answer) => {
      switch (answer.toLowerCase()) {
        case 'y':
          folderName = potentialFolder;
          potentialSuccess = true;
          break;
        case 'n':
        default:
          break;
      }
    });
  }

  if (potentialSuccess) {
    return `${BASE_PATH}${folderName}`;
  }

  await ask(
    `\nNo ${folderName} component exists. Would you like to create ${BASE_PATH}${folderName}? [y/n]`,
  ).then((answer) => {
    switch (answer.toLowerCase()) {
      case 'y':
        fs.mkdirSync(`${BASE_PATH}${folderName}`);
        fs.writeFile(`${BASE_PATH}${folderName}/index.ts`, '', writeFileErrorHandler);
        updateIndex(`./lib/index.ts`, `./${folderName}`);
        return `${BASE_PATH}${folderName}`;
      case 'n':
      default:
        return getFolderPath(undefined, triesLeft - 1);
    }
  });

  return `${BASE_PATH}${folderName}`;
}
