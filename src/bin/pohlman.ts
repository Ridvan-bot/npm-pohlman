#!/usr/bin/env node

import { execSync } from 'child_process';
import * as packageJson from '../../package.json';
import { createDirectory, checkGitInstalled,createFile} from './utils/utils';

const args: string[] = process.argv.slice(2);


switch (args[0]) {
    case '-v':
    case '--version':
        console.log(`Version: ${(packageJson as any).version}`);
        break;
    case '-h':
    case '--help':
        console.log(`usage: pohlman [-v | --version] [-h | --help] [rebuild]

These are common pohlman commands used in various situations:

rebuild a working area
   rebuild   Reset local repository to match GitHub

For more information, visit https://github.com/Ridvan-bot/npm-pohlman`);
        break;
    case 'rebuild':
        checkGitInstalled();
        try {
            console.log('Resetting local repository to match GitHub...');
            execSync('git fetch origin', { stdio: 'inherit' });
            const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
            execSync(`git reset --hard origin/${currentBranch}`, { stdio: 'inherit' });
            console.log('Local repository has been reset.');
        } catch (error) {
            console.error('Failed to reset local repository:', error);
        }
        break;
    case 'new':
        if (args[1] === 'project') {
            console.log('Creating a new backend project...');
            execSync('npm init -y', { stdio: 'inherit' });
            execSync('npm install typescript --save-dev', { stdio: 'inherit' });
            execSync('npm install @types/node --save-dev', { stdio: 'inherit' });
            execSync('npx tsc --init', { stdio: 'inherit' });
            execSync('npm install ts-node --save-dev', { stdio: 'inherit' });
            // create a gitignore file
            execSync('echo dist/ >> .gitignore', { stdio: 'inherit' });
            execSync('echo .env >> .gitignore', { stdio: 'inherit' });
            execSync('echo node_modules/ >> .gitignore', { stdio: 'inherit' });
            execSync('echo package-lock.json >> .gitignore', { stdio: 'inherit' });
            // create .gitub/workflows folder
            createDirectory('.github/workflows');
            // create a CI/CD workflow file
            createFile('.github/workflows/deploy.yml', 'name: Deploy\n\non: [push]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Set up Node.js\n        uses: actions/setup-node@v2\n        with:\n          node-version: "14"\n      - run: npm install\n      - run: npm run build\n      - run: npm publish\n');
            createFile('.github/workflows/test.yml', 'name: Test\n\non: [push]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Set up Node.js\n        uses: actions/setup-node@v2\n        with:\n          node-version: "14"\n      - run: npm install\n      - run: npm test\n');
            createFile('.github/workflows/lint.yml', 'name: Lint\n\non: [push]\n\njobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Set up Node.js\n        uses: actions/setup-node@v2\n        with:\n          node-version: "14"\n      - run: npm install\n      - run: npm run lint\n');



            console.log('Backend project created successfully.');
        } else {
            console.log(`unknown option: ${args.join(' ')}`);
            console.log('usage: pohlman [-v | --version] [-h | --help] [rebuild]');
        }
        break;
    default:
        console.log(`unknown option: ${args.join(' ')}`);
        console.log('usage: pohlman [-v | --version] [-h | --help] [rebuild]');
        break;
}