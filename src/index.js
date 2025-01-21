import { readFileSync } from 'fs'
import path from 'path';

const readFile = (filePath) => {
    const currentDir = process.cwd();
    const file = readFileSync(path.resolve(currentDir, filePath)/* `./bin/${filePath}` */);
    console.log(JSON.parse(file));
}

export default readFile;