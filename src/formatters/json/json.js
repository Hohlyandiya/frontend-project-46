import { formatterTree } from '../tree/tree.js';

const json = (fileContent1, fileContent2) => {
  const sortedTreeDiff = formatterTree(fileContent1, fileContent2);
  return JSON.stringify(sortedTreeDiff, null, 2);
};

export default json;
