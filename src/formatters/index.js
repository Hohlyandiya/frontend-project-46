import json from './json/json.js';
import plain from './plain/plain.js';
import tree from './tree/tree.js';

const useFormatter = (fileContent1, fileContent2, formatter) => {
  switch (formatter) {
    case 'plain':
      return plain(fileContent1, fileContent2);
    case 'json':
      return json(fileContent1, fileContent2);
    default:
      return tree(fileContent1, fileContent2);
  }
};

export default useFormatter;
