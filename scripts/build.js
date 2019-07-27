const { zip } = require('..')
const { join } = require('path')

const cwd = process.cwd()

function build() {
  const from = join(cwd, 'template')
  const to = join(cwd, 'template.zip')
  return zip(from, to)
}

module.exports = build
