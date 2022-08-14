const { exec } = require('child_process')

module.exports = async (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      // If exec returns an error, print it and exit with return code 1
      if (error) {
        console.error(command, error.stderr || error.message)
        return reject(error)
      }
      // If exec returns content in stderr, but no error, print it as a warning
      if (stderr) {
        console.warn(command, stderr)
      }
      return resolve(stdout)
    })
  })
}
