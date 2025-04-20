const stringify = (obj, deep = 1) => {
  const repeatAmount = 4;
  const repeatChar = ' ';
  const leftShift = 2;
  const offsetIndent = repeatChar.repeat(deep * repeatAmount - leftShift);
  const indentWithoutOffset = repeatChar.repeat(deep * repeatAmount);
  const listKey = Object.keys(obj);
  const result = listKey.map((key) => {
    if (obj[key] instanceof Object) {
      return `\n${offsetIndent}${key}: {${stringify(obj[key], deep + 1)}\n${indentWithoutOffset}}`;
    }
    return `\n${offsetIndent}${key}: ${obj[key]}`;
  });
  return result;
};

const setDistinctiveMark = (obj) => {
  switch(obj.action){
    case ('added'):
      return `+ ${obj.key}`;
    case ('removed'):
      return `- ${obj.key}`;
    default:
      return `  ${obj.key}`;
  }
};

const setIndentation = (obj) => {
  const listKeys = Object.keys(obj);
  return listKeys.map((key) => {
    return { key, value: obj[key] };
  });
};

export const formatterTree = (arrDiff) => {
  const result = arrDiff.reduce((acc, obj) => {
    const { value } = obj;
    if (Array.isArray(value)) {
      return { ...acc, [setDistinctiveMark(obj)]: formatterTree(value) };
    }
    if (value instanceof Object) {
      return { ...acc, [setDistinctiveMark(obj)]: formatterTree(setIndentation(value)) };
    }
    return { ...acc, [setDistinctiveMark(obj)]: value };
  }, {});
  return result;
};

export const tree = (arrDiff) => {
  const result = formatterTree(arrDiff);
  return `{${stringify(result)}\n}`.replace(/(,)/g, '');
};
