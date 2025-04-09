import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

const filesparse = (filepath) => {
  const index = -1;
  const currentDir = process.cwd();
  const fileContent = readFileSync(path.resolve(currentDir, filepath));
  switch (filepath.split('.').at(index)) {
    case ('json'):
      return JSON.parse(fileContent);
    case ('yaml'):
    case ('yml'):
      return yaml.load(fileContent);
    default:
      throw new Error('Unsupported file extension');
  }
};

export default filesparse;
