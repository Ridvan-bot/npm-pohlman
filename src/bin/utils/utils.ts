import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export const createDirectory = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

export const createFile = (filePath: string, content: string) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
}


export const checkGitInstalled = () => {
    try {
        execSync('git --version', { stdio: 'ignore' });
    } catch (error) {
        console.error('Git is not installed. Please install Git to use the rebuild command.');
        process.exit(1);
    }
}


export const readTemplate = (filePath: string): string => {
    return fs.readFileSync(filePath, 'utf8');
}