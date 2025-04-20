const convertValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value instanceof Object) {
    return '[complex value]';
  }
  return value;
};

const added = (currentKey, value) => {
  const message = `Property '${currentKey}' was added with value: ${convertValue(value)}`;
  return message;
};

const removed = (currentKey) => {
  const message = `Property '${currentKey}' was removed`;
  return message;
};

const updated = (currentKey, replaceableValue, updateValue) => {
  const message = `Property '${currentKey}' was updated. From ${convertValue(updateValue)} to ${convertValue(replaceableValue)}`;
  return message;
};

const getPlainFormatter = (arrDiff, listPathElements = []) => {
  const result = arrDiff.flatMap((element) => {
    const pathToKey = [...listPathElements, element.key].join('.');
    if (Array.isArray(element.value)) {
      const pathElements = [...listPathElements, element.key]
      return [...getPlainFormatter(element.value, pathElements)];
    };
    if (element.action === 'removed') {
      const firstElement = 0;
      const update = arrDiff
      .filter((elem) => elem.key === element.key && elem.action !== element.action);
      if (update.length !== 0) {
        return updated(pathToKey, update[firstElement].value, element.value);
      } 
      return removed(pathToKey);
    }
    if (element.action === 'added') {
        const remove = arrDiff
        .filter((elem) => elem.key === element.key && elem.action !== element.action);
        if (remove.length === 0) {
          return added(pathToKey, element.value);
        } 
    }
    return;
  });
  return result;
};

const plain = (arrDiff) => {
  const result = getPlainFormatter(arrDiff).filter((str) => str !== undefined)
  .join('\n')
  .replace(/(,)/g, '');
  return result;
};

export default plain;
