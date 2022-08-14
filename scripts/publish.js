const { exec, getPackageByName, getPrereleaseTagByVersion } = require('./utils')

async function main() {
  const [tag] = process.argv.slice(2)
  if (!tag) {
    throw new Error('No tag specified')
  }

  console.log(`Publish ${tag}`)

  const [_, _packageName, packageVersion] = tag.split('@')
  const packageName = `@${_packageName}`
  const package = getPackageByName(packageName)
  if (!package) {
    throw new Error(`Package "${packageName}" not found.`)
  }

  const { dirPath, json } = package
  if (packageVersion !== json.version)
    throw new Error(
      `Package version from tag "${packageVersion}" mismatches with current version "${json.version}"`
    )

  console.log('Publishing package...')

  const publicArgs = ['publish', '--access', 'public']
  const releaseTag = getPrereleaseTagByVersion(packageVersion)
  if (releaseTag) {
    publicArgs.push(`--tag`, releaseTag)
  }

  const { stdout, stderr } = await exec(`cd ${dirPath} && npm ${publicArgs.join(' ')}`)
  console.log('stdout:', stdout)
  console.log('stderr:', stderr)
  console.log()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
