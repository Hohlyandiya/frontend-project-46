import json from './json/json.js';
import plain from './plain/plain.js';
import { tree } from './tree/tree.js';

const useFormatter = (arrDiff, formatter) => {
  switch (formatter) {
/*     case 'plain':
      return plain(arrDiff); */
    case 'json':
      return json(arrDiff);
    default:
      return tree(arrDiff);
  }
};

export default useFormatter;
