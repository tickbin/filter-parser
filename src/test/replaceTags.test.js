import test from 'tape'
import parse from '../'

test('replace single tags', t => {
  const str = parse('#tag')
  t.equals(str, 'tags has "#tag"')
  t.end()
})

test('replace multiple tags', t => {
  const str = parse('#tag1 and #tag2')
  t.equals(str, 'tags has "#tag1" and tags has "#tag2"')
  t.end()
})
