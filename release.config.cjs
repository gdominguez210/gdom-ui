module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        parserOpts: {
          headerCorrespondence: ['emoji', 'type', 'scope', 'subject', 'ticket'],
          // Test URL: https://regex101.com/r/YxXWi5/11
          headerPattern:
            /^((?::\w*:|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]|[⏪\u2600-\u2B55]|🔨|⬆️|🔧|📦|📝|🎉|🚀|🐛|🧐|🎨|🧪)\s)?(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?!\s).)\s?(?<ticket>#\d*)?$/,
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        parserOpts: {
          headerCorrespondence: ['emoji', 'type', 'scope', 'subject', 'ticket'],
          // Test URL: https://regex101.com/r/YxXWi5/11
          headerPattern:
            /^((?::\w*:|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]|[⏪\u2600-\u2B55]|🔨|⬆️|🔧|📦|📝|🎉|🚀|🐛|🧐|🎨|🧪)\s)?(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?!\s).)\s?(?<ticket>#\d*)?$/,
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    ['@semantic-release/npm',
    {
      "npmPublish": false,
    }],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'dist/**'],
        message:
          '📦 chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
