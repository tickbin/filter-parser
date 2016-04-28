import test from 'tape'
import replaceTags from '../replaceTags'

test('replace single tags', t => {
  const str = replaceTags('#tag')
  t.equals(str, 'includes(tags, "#tag")')
  t.end()
})

test('replace multiple tags', t => {
  const str = replaceTags('#tag1 and #tag2')
  t.equals(str, 'includes(tags, "#tag1") and includes(tags, "#tag2")')
  t.end()
})
