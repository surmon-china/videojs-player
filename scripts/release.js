// https://github.com/vitejs/vite/blob/main/scripts/release.ts
// https://github.com/vuejs/core/blob/main/scripts/release.js
// https://github.com/vitejs/vite/blob/main/scripts/publishCI.ts

const fs = require('fs-extra')
const path = require('path')
const prompts = require('prompts')
const standardVersion = require('standard-version')
const exec = require('./exec')

const rootDirPath = path.join(__dirname, '..')
const packagesDirPath = path.join(rootDirPath, 'packages')
const packages = fs.readdirSync(packagesDirPath).map((dirName) => {
  const dirPath = path.join(packagesDirPath, dirName)
  const json = require(path.resolve(dirPath, 'package.json'))
  return { dirName, dirPath, json }
})

const main = async () => {
  // select package
  const { packageDirName } = await prompts({
    type: 'select',
    name: 'packageDirName',
    message: 'Select package',
    choices: packages.map((i) => ({ value: i.dirName, title: i.json.name }))
  })

  // isStandardVersion?
  const { isStandardVersion } = await prompts({
    type: 'confirm',
    name: 'isStandardVersion',
    message: 'Standardized version and changelog?',
    initial: false
  })

  const selectedPackage = packages.find((p) => p.dirName === packageDirName)
  const changelogFile = path.resolve(selectedPackage.dirPath, 'CHANGELOG.md')
  const packageFile = path.resolve(selectedPackage.dirPath, 'package.json')
  const packageVersion = selectedPackage.json.version
  const tagPrefix = `${selectedPackage.json.name}@`
  const tagRefName = `${tagPrefix}${packageVersion}`
  const prerelease = packageVersion.includes('beta')
    ? 'beta'
    : packageVersion.includes('alpha')
    ? 'alpha'
    : false

  const standardVersionBaseConfig = {
    commitAll: true,
    tagPrefix,
    prerelease,
    packageFiles: [packageFile],
    bumpFiles: [packageFile],
    infile: changelogFile,
    header: '# Changelog\n\nAll notable changes to this project will be documented in this file.\n'
  }

  if (isStandardVersion) {
    // isStandardVersion === true > standardVersion()
    await standardVersion(standardVersionBaseConfig)
  } else {
    // isStandardVersion === false > fetch tags && standardVersion({ skip: ... })
    let remoteTag = null
    try {
      remoteTag = await exec(`git fetch origin ${tagRefName}`)
    } catch (_) {}

    if (remoteTag) {
      throw new Error(`${tagRefName} already exists!`)
    }

    await standardVersion({
      ...standardVersionBaseConfig,
      releaseAs: packageVersion,
      skip: { changelog: true, commit: true, bump: true }
    })
  }

  // push tags
  const { isPushToGitHub } = await prompts({
    type: 'confirm',
    name: 'isPushToGitHub',
    message: 'Push tags to GitHub?',
    initial: true
  })

  if (isPushToGitHub) {
    await exec(`git push --follow-tags origin main`)
    console.log(
      '\nPushed, publishing should starts shortly on CI.\nhttps://github.com/surmon-china/videojs-player/actions/workflows/publish.yml'
    )
    console.log()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
