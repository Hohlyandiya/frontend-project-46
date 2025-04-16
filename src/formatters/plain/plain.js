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

const getPlainFormatter = (arrDiff, listKeys = []) => {
  const result = [];
  const prevElements = [];
  const pathElements = listKeys;
  arrDiff.forEach((element) => {
    pathElements.push(element.key);
    const pathToKey = pathElements.join('.');
    if (Array.isArray(element.value)) {
      result.push(...getPlainFormatter(element.value, pathElements));
    }
    if (element.action === 'removed') {
      prevElements.push(element)
      result.push(removed(pathToKey));
    }
    if (element.action === 'added') {
      const lastElement = prevElements[prevElements.length - 1];
      if (lastElement !== undefined && lastElement.key === element.key) {
        result.splice(-1, 1);
        result.push(updated(pathToKey, element.value, lastElement.value));
      } else {
        result.push(added(pathToKey, element.value));
      }
    }
    pathElements.splice(-1, 1);
  });
  return result;
};

const plain = (arrDiff) => {
  const result = _.sortBy(getPlainFormatter(arrDiff)).join('\n');
  return result;
};

export default plain;
