import test from 'tape'
import compile from '../index'

const et = { tags: ['#alien'] }
const superman = { tags: ['#alien', '#dc', '#male'] }
const batman = { tags: ['#human', '#dc', '#male'] }
const ironman = { tags: ['#human', '#marvel', '#male'] }
const wolverine = { tags: ['#human', '#mutant', '#marvel', '#male'] }
const wonderwoman = { tags: ['#alien', '#dc', '#female'] }

const heroes = [et, superman, batman, ironman, wolverine, wonderwoman]

test('can filter on single tag', t => {
  const exp = "#alien"
  const filter = compile(exp)

  t.ok(filter(et), 'et is an alien')
  t.ok(filter(superman), 'superman is an alien')
  t.notOk(filter(batman), 'batman is an human')
  t.notOk(filter(ironman), 'ironman is a human')
  t.notOk(filter(wolverine), 'wolverine is a human')
  t.ok(filter(wonderwoman), 'wonderwoman is an alien')
  t.end()
})

test('can filter multiple and tags', t => {
  const exp = "#alien and #dc"
  const filter = compile(exp)

  t.notOk(filter(et), 'et is not an alien nor from dc')
  t.ok(filter(superman), 'superman is an alien and from dc')
  t.notOk(filter(batman), 'batman is not an alien but is from dc')
  t.not(filter(ironman), 'ironman is not an alien nor from dc')
  t.notOk(filter(wolverine), 'wolverine is not an alien nor from dc')
  t.ok(filter(wonderwoman), 'wonderwoman is an alien and from dc')
  t.end()
})

test('can filter multiple or tags', t => {
  const exp = "#human or #female"
  const filter = compile(exp)

  t.notOk(filter(et), 'et is not human')
  t.notOk(filter(superman), 'superman is not human')
  t.ok(filter(batman), 'batman is a human')
  t.ok(filter(ironman), 'ironman is a human')
  t.ok(filter(wolverine), 'wolverine is human')
  t.ok(filter(wonderwoman), 'wonderwoman is female')
  t.end()
})

test('negating tags', t => {
  const exp = "#human and not #mutant"
  const filter = compile(exp)

  t.notOk(filter(et), 'et is not human')
  t.notOk(filter(superman), 'superman is not human')
  t.ok(filter(batman), 'batman is a human')
  t.ok(filter(ironman), 'ironman is a human')
  t.notOk(filter(wolverine), 'wolverine is human but a mutant')
  t.notOk(filter(wonderwoman), 'wonderwoman is an alien')
  t.end()
})

test('negating non-existing tags', t => {
  const exp = "not (#dc or #marvel)"
  const filter = compile(exp)

  t.ok(filter(et), 'et is not dc or marvel')
  t.notOk(filter(superman), 'superman is from dc')
  t.notOk(filter(batman), 'batman is from dc')
  t.notOk(filter(ironman), 'ironman is from marvel')
  t.notOk(filter(wolverine), 'wolverine is from marvel')
  t.notOk(filter(wonderwoman), 'wonderwoman is from dc')
  t.end()
})
