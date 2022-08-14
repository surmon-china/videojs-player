// https://github.com/vitejs/vite/blob/main/scripts/release.ts
// https://github.com/vuejs/core/blob/main/scripts/release.js
// https://github.com/vitejs/vite/blob/main/scripts/publishCI.ts

const path = require('path')
const prompts = require('prompts')
const standardVersion = require('standard-version')
const { exec, packages, getPackageByName, getPrereleaseTagByVersion } = require('./utils')

const main = async () => {
  // select package
  const { selectedPackageName } = await prompts({
    type: 'select',
    name: 'selectedPackageName',
    message: 'Select package',
    choices: packages.map((i) => ({ value: i.json.name, title: i.json.name }))
  })

  // isStandardVersion?
  const { isStandardVersion } = await prompts({
    type: 'confirm',
    name: 'isStandardVersion',
    message: 'Standardized version and changelog?',
    initial: false
  })

  const selectedPackage = getPackageByName(selectedPackageName)
  const changelogFile = path.resolve(selectedPackage.dirPath, 'CHANGELOG.md')
  const packageFile = path.resolve(selectedPackage.dirPath, 'package.json')
  const packageVersion = selectedPackage.json.version
  const tagPrefix = `${selectedPackage.json.name}@`
  const tagRefName = `${tagPrefix}${packageVersion}`

  const standardVersionBaseConfig = {
    commitAll: true,
    tagPrefix,
    prerelease: getPrereleaseTagByVersion(packageVersion) ?? false,
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
    let existsRemoteTag = false
    try {
      await exec(`git fetch origin ${tagRefName}`)
      existsRemoteTag = true
    } catch (_) {
      existsRemoteTag = false
    }
    if (existsRemoteTag) {
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
    const message = `Pushed, publishing should starts shortly on CI.`
    const url = `https://github.com/surmon-china/videojs-player/actions/workflows/publish.yml`
    console.log(`\n${message}\n${url}`)
    console.log()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
