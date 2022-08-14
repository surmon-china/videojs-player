const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports = (command) => {
  return exec(command)
    .then((result) => {
      // If exec returns content in stderr, but no error, print it as a warning
      if (result.stderr) console.warn(result.stderr)
      return result
    })
    .catch((error) => {
      console.error(error.stderr || error.message)
      return Promise.reject(error)
    })
}
