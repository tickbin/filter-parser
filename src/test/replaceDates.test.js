import test from 'tape'
import parse from '../'

test('replace single date', t => {
  const str = parse('Feb - Mar')
  t.equals(str, 'startArr >= [2016,1,1,0,0,0,0] and startArr <= [2016,2,31,23,59,59,999]')
  t.end()
})
