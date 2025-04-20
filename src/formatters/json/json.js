import { formatterStylish } from '../stylish/stylish.js';

const json = (fileContent1, fileContent2) => {
  const sortedTreeDiff = formatterStylish(fileContent1, fileContent2);
  return JSON.stringify(sortedTreeDiff, null, 2);
};

export default json;
