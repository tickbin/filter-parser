import test from 'tape'
import replaceDates from '../replaceDates'

test('replace single date', t => {
  const str = replaceDates('Feb - Mar')
  t.equals(str, 'dateBetween(start, "2016-02-01T08:00:00.000Z", "2016-04-01T06:59:59.999Z")')
  t.end()
})
