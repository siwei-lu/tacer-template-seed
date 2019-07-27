import zip from '~/utils/zip'
import { resolve } from 'path'
import { pathExists, remove } from 'fs-extra'

test('zip(".", "../.test.zip"', async () => {
  const from = __dirname
  const to = resolve(__dirname, '../.test.zip')

  jest.spyOn(global.console, 'log').mockImplementation()
  await zip(from, to)

  expect(await pathExists(to)).toBe(true)
  expect(console.log).toBeCalled()

  await remove(to)
})
