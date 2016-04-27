import test from 'tape'
import compile from '../index'

const pizza = { tags: ['#cheesy', '#italian'] }
const sushi = { tags: ['#japanese'] }
const udon = { tags: ['#noodle', '#japanese']}
const pasta = { tags: ['#noodle', '#italian'] }
const burrito = { tags: ['#cheesy', '#mexican'] }

test('can filter on single tag', t => {
  const exp = "#noodle"
  const filter = compile(exp)

  t.notOk(filter(pizza), 'pizza is not a noodle')
  t.notOk(filter(sushi), 'sushi is not a noodle')
  t.ok(filter(udon), 'udon is a noodle')
  t.ok(filter(pasta), 'pasta is a noodle')
  t.notOk(filter(burrito), 'burrito is not a noodle')
  t.end()
})

test('can filter multiple and tags', t => {
  const exp = "#noodle and #japanese"
  const filter = compile(exp)

  t.notOk(filter(pizza), 'pizza is not a noodle')
  t.notOk(filter(sushi), 'sushi is not a noodle')
  t.ok(filter(udon), 'udon is a noodle and japanese')
  t.notOk(filter(pasta), 'pasta is a noodle but not japanese')
  t.notOk(filter(burrito), 'burrito is not a noodle')
  t.end()
})

test('can filter multiple or tags', t => {
  const exp = "#cheesy or #italian"
  const filter = compile(exp)

  t.ok(filter(pizza), 'pizza is cheesy AND italian')
  t.notOk(filter(sushi), 'sushi is not cheesy nor italian')
  t.notOk(filter(udon), 'udon is not cheesy nor italian')
  t.ok(filter(pasta), 'pasta is italian')
  t.ok(filter(burrito), 'burrito is cheesy')
  t.end()
})

test('negating tags', t => {
  const exp = "#cheesy and not #mexican"
  const filter = compile(exp)

  t.ok(filter(pizza), 'pizza is cheesy AND not mexican')
  t.notOk(filter(sushi), 'sushi is not cheesy')
  t.notOk(filter(udon), 'udon is not cheesy')
  t.notOk(filter(pasta), 'pasta is not cheesy')
  t.notOk(filter(burrito), 'burrito is cheesy but it is mexican')
  t.end()
})

test('negating non-existing tags', t => {
  const exp = "not (#noodle or #cheesy)"
  const filter = compile(exp)

  t.notOk(filter(pizza), 'pizza is cheesy')
  t.ok(filter(sushi), 'sushi is neither cheesy nor noodle')
  t.notOk(filter(udon), 'udon is a noodle')
  t.notOk(filter(pasta), 'pasta is a noodle')
  t.notOk(filter(burrito), 'burrito is cheesy')
  t.end()
})

const mar = { date: new Date('2016-03-15')}
const apr = { date: new Date('2016-04-15')}
const may = { date: new Date('2016-05-15')}

test('filter on dates', t => {
  const exp = 'Mar - Apr 2016'  
  const filter = compile(exp)

  t.ok(filter(mar), 'March is in bounds')
  t.ok(filter(apr), 'April is in bounds')
  t.notOk(filter(may), 'May is in bounds')
  t.end()
})
