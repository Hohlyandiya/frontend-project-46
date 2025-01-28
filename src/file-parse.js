import { readFileSync } from 'fs'
import path from 'path';

const readFile = (filePath) => {
    const currentDir = process.cwd();
    const fileContent = readFileSync(path.resolve(currentDir, filePath));
    return JSON.parse(fileContent);
}

export default readFile;