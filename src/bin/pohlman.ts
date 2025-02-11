
import { execSync } from 'child_process';
import * as packageJson from '../../package.json';

const args: string[] = process.argv.slice(2);

function checkGitInstalled() {
    try {
        execSync('git --version', { stdio: 'ignore' });
    } catch (error) {
        console.error('Git is not installed. Please install Git to use the rebuild command.');
        process.exit(1);
    }
}

switch (args[0]) {
    case '-v':
    case '--version':
        console.log(`Version: ${(packageJson as any).version}`);
        break;
    case '-h':
    case '--help':
        console.log(`usage: pohlman [-v | --version] [-h | --help] [rebuild]

These are common pohlman commands used in various situations:

start a working area
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
    default:
        console.log(`unknown option: ${args[0]}`);
        console.log('usage: pohlman [-v | --version] [-h | --help] [rebuild]');
        break;
}