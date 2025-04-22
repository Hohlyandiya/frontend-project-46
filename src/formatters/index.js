import json from './json/json.js'
import plain from './plain/plain.js'
import { stylish } from './stylish/stylish.js'

const useFormatter = (arrDiff, formatter) => {
  switch (formatter) {
    case 'plain':
      return plain(arrDiff)
    case 'json':
      return json(arrDiff)
    default:
      return stylish(arrDiff)
  }
}

export default useFormatter
