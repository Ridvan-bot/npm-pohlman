#!/usr/bin/env node

import { execSync } from 'child_process';
import * as packageJson from '../../package.json';
import { createDirectory, checkGitInstalled, createFile, readTemplate} from './utils/utils';
import path from 'path';

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
            createFile('.github/workflows/deploy.yml', readTemplate(path.join(__dirname, '../../templates/deploy.yml')));
            createFile('.github/workflows/validate.yml', readTemplate(path.join(__dirname, '../../templates/validate.yml')));
            createFile('.github/workflows/release.yml', readTemplate(path.join(__dirname, '../../templates/release.yml')));

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