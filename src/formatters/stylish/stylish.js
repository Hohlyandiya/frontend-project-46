import _ from 'lodash'

const stringify = (obj, deep = 1) => {
  const repeatAmount = 4
  const repeatChar = ' '
  const leftShift = 2
  const offsetIndent = repeatChar.repeat(deep * repeatAmount - leftShift)
  const indentWithoutOffset = repeatChar.repeat(deep * repeatAmount)
  const listKey = Object.keys(obj)
  const result = listKey.map((key) => {
    if (obj[key] instanceof Object) {
      return `\n${offsetIndent}${key}: {${stringify(obj[key], deep + 1)}\n${indentWithoutOffset}}`
    }
    return `\n${offsetIndent}${key}: ${obj[key]}`
  })
  return result
}

const setIndentation = (obj) => {
  const listKeys = Object.keys(obj)
  return listKeys.map((key) => {
    const object = { key, value: obj[key] }
    return object
  })
}

const getFinalValue = (obj) => {
  if (_.isObject(obj)) {
    const listKeys = Object.keys(obj)
    return listKeys.reduce((acc, key) => {
      const object = {
        ...acc,
        [`  ${key}`]: _.isObject(obj[key]) ? getFinalValue(obj[key]) : obj[key],
      }
      return object
    }, {})
  }
  return obj
}

export const formatterStylish = (arrDiff) => {
  const result = arrDiff.reduce((acc, obj) => {
    switch (obj.action) {
      case ('added'):
        return { ...acc, [`+ ${obj.key}`]: getFinalValue(obj.value) }
      case ('removed'):
        return { ...acc, [`- ${obj.key}`]: getFinalValue(obj.value) }
      case ('nested node'):
        return { ...acc, [`  ${obj.key}`]: formatterStylish(obj.children) }
      case ('change'):
        return { ...acc, [`- ${obj.key}`]: getFinalValue(obj.prevValue), [`+ ${obj.key}`]: getFinalValue(obj.newValue) }
      case ('unchanged'):
        return { ...acc, [`  ${obj.key}`]: getFinalValue(obj.value) }
      default:
        throw new Error('Unknown action')
    }
  }, {})
  return result
}

export const stylish = (arrDiff) => {
  const result = formatterStylish(arrDiff)
  return `{${stringify(result)}\n}`.replace(/(,)/g, '')
}
