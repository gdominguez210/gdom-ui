#!/usr/bin/env node

/**
 * This script generates individual icon components for all SVG files.
 * Each icon is implemented in its own directory with the naming pattern IconSvgName.
 * Creates both a component file (IconSvgName.tsx) and a barrel file (index.ts).
 * This approach enables tree-shaking, so users only include the icons they import.
 *
 * Usage:
 * node scripts/generate-icon-components.js         # Skip existing components
 * node scripts/generate-icon-components.js --force # Regenerate all components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import process from 'process';

// Get current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const forceRegeneration = args.includes('--force');

// Configuration
const SVG_DIR = path.resolve(__dirname, '../assets/svgs');
const OUTPUT_DIR = path.resolve(__dirname, '../lib');
const INDEX_FILE = path.resolve(__dirname, '../lib/index.ts');

// Log mode
console.log(`Running in ${forceRegeneration ? 'force regeneration' : 'skip existing'} mode`);

// Get all SVG files
const svgFiles = glob.sync(`${SVG_DIR}/*.svg`);
console.log(`Found ${svgFiles.length} SVG files`);

// Track generated components for index file
const generatedComponents = [];

// Process each SVG file
svgFiles.forEach((svgFile) => {
  const filename = path.basename(svgFile, '.svg');
  const pascalCaseName = filename
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // Create component name with Icon prefix
  const componentName = `Icon${pascalCaseName}`;

  // Create directory path for the component
  const componentDir = path.join(OUTPUT_DIR, componentName);

  // Define file paths
  const componentFile = path.join(componentDir, `${componentName}.tsx`);
  const barrelFile = path.join(componentDir, 'index.ts');

  // Check if component already exists
  if (fs.existsSync(componentFile) && fs.existsSync(barrelFile) && !forceRegeneration) {
    console.log(`Skipping existing component: ${componentName}`);
    generatedComponents.push(componentName); // Still track for index file
    return; // Skip to next iteration
  }

  // Create directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
    console.log(`Created directory: ${componentDir}`);
  }

  // Create component file content
  const componentContent = `import { ReactComponent as ${pascalCaseName}Svg } from '@/assets/svgs/${filename}.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function ${componentName}(props: Omit<IconProps, 'as'>) {
  return <Icon as={${pascalCaseName}Svg} {...props} />;
}
`;

  // Create barrel file content
  const barrelContent = `export { ${componentName} } from './${componentName}';
`;

  // Write component file
  fs.writeFileSync(componentFile, componentContent);
  console.log(
    `${fs.existsSync(componentFile) && forceRegeneration ? 'Regenerated' : 'Generated'} component: ${componentFile}`,
  );

  // Write barrel file
  fs.writeFileSync(barrelFile, barrelContent);
  console.log(
    `${fs.existsSync(barrelFile) && forceRegeneration ? 'Regenerated' : 'Generated'} barrel: ${barrelFile}`,
  );

  // Track for index file
  generatedComponents.push(componentName);
});

// Update the main index file to export the icon components
// First, read the current index file if it exists
let indexContent = '';
try {
  if (fs.existsSync(INDEX_FILE)) {
    indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
  }
} catch (error) {
  console.error('Error reading index file:', error);
}

// Check if index file already has icon exports
if (!indexContent.includes('// Icon Components')) {
  // If not, add icon exports section
  const iconExports = `
// Icon Components
${generatedComponents.map((name) => `export { ${name} } from './${name}';`).join('\n')}
`;

  // Append to index file
  fs.appendFileSync(INDEX_FILE, iconExports);
  console.log(`Updated index file with ${generatedComponents.length} icon exports`);
} else {
  // If index already has icon exports, replace that section
  const startMarker = '// Icon Components';
  // No end marker needed, removing the unused variable

  // Find the start of the icons section
  const startIndex = indexContent.indexOf(startMarker);

  if (startIndex !== -1) {
    // Find the next section marker (if any)
    let endIndex = indexContent.length;
    const nextSectionMatch = indexContent
      .slice(startIndex + startMarker.length)
      .match(/\/\/ [A-Z][a-z]+ [A-Z][a-z]+/);

    if (nextSectionMatch) {
      endIndex = startIndex + startMarker.length + nextSectionMatch.index;
    }

    // Create new section content
    const newSection = `${startMarker}
${generatedComponents.map((name) => `export { ${name} } from './${name}';`).join('\n')}
`;

    // Replace the section
    const newIndexContent =
      indexContent.slice(0, startIndex) + newSection + indexContent.slice(endIndex);

    fs.writeFileSync(INDEX_FILE, newIndexContent);
    console.log(
      `Updated existing icon exports in index file with ${generatedComponents.length} components`,
    );
  }
}

console.log('Icon generation complete!');
