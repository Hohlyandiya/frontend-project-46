import _ from 'lodash';

const convertValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  } else if (value instanceof Object) {
    return '[complex value]';
  }
  return value;
};

const added = (currentKey, value) => {
  return `Property '${currentKey}' was added with value: ${convertValue(value)}`;
};

const removed = (currentKey) => {
  return `Property '${currentKey}' was removed`;
};

const updated = (currentKey, currentValue, previousValue) => {
  return `Property '${currentKey}' was updated. From ${convertValue(previousValue)} to ${convertValue(currentValue)}`;
};

const getPlainFormatter = (fileContent1, fileContent2, allContent, listKeys = []) => {
  const result = [];
  const listCurrentsKeys = listKeys;
  const listKey = Object.keys(allContent);
  listKey.forEach((key) => {
    listCurrentsKeys.push(key);
    const pathToKey = listCurrentsKeys.join('.');
    if (Object.hasOwn(fileContent1, key) && Object.hasOwn(fileContent2, key)) {
      if (fileContent1[key] instanceof Object && fileContent2[key] instanceof Object) {
        const listResults = getPlainFormatter(fileContent1[key], fileContent2[key], allContent[key], listCurrentsKeys);
        result.push(...listResults);
      } else if (fileContent1[key] !== fileContent2[key]) {
        result.push(updated(pathToKey, fileContent2[key], fileContent1[key]));
      }
    } else if (!Object.hasOwn(fileContent2, key) && Object.hasOwn(fileContent1, key)){
      result.push(removed(pathToKey));
    } else if (!Object.hasOwn(fileContent1, key) && Object.hasOwn(fileContent2, key)){
      result.push(added(pathToKey, fileContent2[key]));
    }
    listCurrentsKeys.splice(-1, 1);
  })
  return result;
};

const plain = (fileContent1, fileContent2) => {
  const mainFile = fileContent1;
  const secondaryFile = fileContent2;
  const allContent = _.merge({}, mainFile, secondaryFile);
  const result = getPlainFormatter(mainFile, secondaryFile, allContent).sort().join('\n');
  return result;
};

export default plain;
