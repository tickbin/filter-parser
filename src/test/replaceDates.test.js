import test from 'tape'
import replaceDates from '../replaceDates'

test('replace single date', t => {
  const str = replaceDates('Feb - Mar')
  t.equals(str, 'start >= [2016,1,1,0,0,0,0] and start <= [2016,2,31,23,59,59,999]')
  t.end()
})
