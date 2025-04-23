import yaml from 'js-yaml'

const filesparse = (fileData) => {
  switch (fileData.extension) {
    case ('json'):
      return JSON.parse(fileData.content)
    case ('yaml'):
    case ('yml'):
      return yaml.load(fileData.content)
    default:
      throw new Error('Unsupported file extension')
  }
}

export default filesparse
