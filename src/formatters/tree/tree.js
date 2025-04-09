import getSortedTreeDiff from './sorted-tree.js';

const stringify = (obj, repeatChar, repeatAmount, deep = 1) => {
  let result = '';
  const leftShift = 2;
  const offsetIndent = repeatChar.repeat(deep * repeatAmount - leftShift);
  const indentWithoutOffset = repeatChar.repeat(deep * repeatAmount);
  const listKey = Object.keys(obj);
  listKey.forEach((key) => {
    if (obj[key] instanceof Object) {
        result = `${result}\n${offsetIndent}${key}: {${stringify(obj[key], repeatChar, repeatAmount, deep + 1)}\n${indentWithoutOffset}}`;
        return;
      }
      result = `${result}\n${offsetIndent}${key}: ${obj[key]}`;
  })
  return result;
}

const tree = (firstFileContent, secondFileContent) => {
  const sortedTreeDiff = getSortedTreeDiff(firstFileContent, secondFileContent);
  const result = `{${stringify(sortedTreeDiff, ' ', 4)}\n}`;
  return result;
};

export default tree;
