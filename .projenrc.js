const { TypeScriptProject, NodePackageManager, ProjectType, NpmAccess } = require('projen');

const project = new TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'lambda-local-caching',
  description: 'Library to cache variables in AWS Lambda',
  keywords: [
    'lambda',
    'caching',
    'projen',
    'typescript',
  ],
  majorVersion: 0,
  packageName: 'lambda-local-caching',
  packageManager: NodePackageManager.NPM,
  projectType: ProjectType.LIB,
  repository: 'https://github.com/yaohanzaismondo/Lambda-Local-Caching.git',
  authorEmail: 'yaohancz@gmail.com',
  authorName: 'Yaohan Zais',
  jest: false,
  devDeps: [
    'chai',
    'ts-node',
    '@types/chai',
    'mocha',
    '@types/mocha',
    '@types/babel__core',
  ],
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  npmTokenSecret: 'NPM_TOKEN',
  minNodeVersion: '14',
  tsconfig: {
    compilerOptions: {
      target: 'ES2019',
      lib: ['ES2019'],
    },
    exclude: [
      '.mocharc.json',
    ],
  },
  autoMergeOptions: {
    buildJob: 'build',
  },
  docgen: true,
});

project.tasks.tryFind('test').exec('mocha');
project.synth();