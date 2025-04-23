import _ from 'lodash'

const buildDiff = (fileContent1, fileContent2) => {
  const allKey = [..._.keys(fileContent1), ..._.keys(fileContent2)]
  const allUnionKey = _.uniq(allKey)
  const result = allUnionKey.flatMap((key) => {
    if (!_.has(fileContent1, key)) {
      return { key, value: fileContent2[key], action: 'added' }
    }
    if (!_.has(fileContent2, key)) {
      return { key, value: fileContent1[key], action: 'removed' }
    }
    if (fileContent1[key] === fileContent2[key]) {
      return { key, value: fileContent2[key], action: 'unchanged' }
    }
    if (fileContent1[key] instanceof Object && fileContent2[key] instanceof Object) {
      return { key, children: buildDiff(fileContent1[key], fileContent2[key]), action: 'nested node' }
    }
    return { key, prevValue: fileContent1[key], newValue: fileContent2[key], action: 'change' }
  })
  return _.sortBy(result, ['key'])
}

export default buildDiff
