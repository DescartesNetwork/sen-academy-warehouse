const fs = require('fs')
const path = require('path')

const src = path.join(__dirname, './src')
function validateFilename(filename) {
  const rule = /^([0-9]*)\.json$/
  if (!rule.test(filename)) return false
  return true
}

const data = {}
fs.readdirSync(src).forEach(function (file) {
  const manifest = require(`./src/${file}`)
  if (!validateFilename(file)) throw new Error('Invalid filename.')
  const id = file.replace('.json', '')
  data[id] = manifest
})
if (!fs.existsSync('./build')) fs.mkdirSync('./build')
fs.writeFileSync('./build/data.json', JSON.stringify(data, null, 2))

console.log('********************************')
console.log(
  `There are ${Object.keys(data).length} applications have been built!`,
)
console.log('********************************')
