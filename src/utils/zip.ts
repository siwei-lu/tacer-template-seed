import archiver from 'archiver'
import { createWriteStream } from 'fs'
import { join } from 'path'
import { pathExists, readFile } from 'fs-extra'

const ignoreFilename = '.tacerignore'
const ignoreFilePathIn = (dir: string) => join(dir, ignoreFilename)

export default async function zip(from: string, to: string) {
  const ws = createWriteStream(to)
  const ac = archiver('zip')

  const ignores = [ignoreFilename]
  const ignoreFile = ignoreFilePathIn(from)
  if (await pathExists(ignoreFile)) {
    const content = await readFile(ignoreFile, 'utf8')
    ignores.push(...content.split('\n'))
  }

  ac.pipe(ws)
  ac.glob('**', {
    ignore: ignores,
    cwd: from,
    dot: true,
  })
  ac.on('entry', e => {
    if (e.stats.isFile()) {
      console.log(e.name)
    }
  })
  ac.finalize()

  return new Promise<void>((res, rej) => {
    ac.on('error', rej).on('finish', res)
  })
}
