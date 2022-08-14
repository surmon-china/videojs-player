const path = require('path')
const fs = require('fs-extra')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const rootDirPath = path.join(__dirname, '..')
const packagesDirPath = path.join(rootDirPath, 'packages')
const packages = fs.readdirSync(packagesDirPath).map((dirName) => {
  const dirPath = path.join(packagesDirPath, dirName)
  const json = require(path.resolve(dirPath, 'package.json'))
  return { dirName, dirPath, json }
})

exports.exec = exec
exports.packages = packages

exports.getPackageByName = (packageName) => {
  return packages.find((package) => package.json.name === packageName)
}

exports.getPrereleaseTagByVersion = (packageVersion) => {
  return packageVersion.includes('beta')
    ? 'beta'
    : packageVersion.includes('alpha')
    ? 'alpha'
    : void 0
}
