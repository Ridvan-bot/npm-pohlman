#!/usr/bin/env node
import { execSync } from 'child_process';
import * as packageJson from '../../package.json';

const args: string[] = process.argv.slice(2);

switch (args[0]) {
    case '-v':
    case '--version':
        console.log(`Version: ${(packageJson as any).version}`);
        break;
    case 'rebuild':
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
    default:
        console.log(`unknown option: ${args[0]}`);
        console.log('usage: pohlman [-v | --version] [rebuild]');
        break;
}