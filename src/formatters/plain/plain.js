const convertValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`
  }
  if (value instanceof Object) {
    return '[complex value]'
  }
  return value
}

const added = (currentKey, value) => {
  const message = `Property '${currentKey}' was added with value: ${convertValue(value)}`
  return message
}

const removed = (currentKey) => {
  const message = `Property '${currentKey}' was removed`
  return message
}

const updated = (currentKey, replaceableValue, updateValue) => {
  const message = `Property '${currentKey}' was updated. From ${convertValue(updateValue)} to ${convertValue(replaceableValue)}`
  return message
}

const getPlainFormatter = (arrDiff, listPathElements = []) => {
  const result = arrDiff.flatMap((element) => {
    const pathToKey = [...listPathElements, element.key].join('.')
    const pathElements = [...listPathElements, element.key]
    switch (element.action) {
      case ('added'):
        return added(pathToKey, element.value)
      case ('removed'):
        return removed(pathToKey)
      case ('nested node'):
        return [...getPlainFormatter(element.children, pathElements)]
      case ('change'):
        return updated(pathToKey, element.newValue, element.prevValue)
      default:
        return 'unchange'
    }
  })
  return result
}

const plain = (arrDiff) => {
  const result = getPlainFormatter(arrDiff).filter(str => str !== 'unchange')
    .join('\n')
    .replace(/(,)/g, '')
  return result
}

export default plain
