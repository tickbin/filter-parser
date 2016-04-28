import test from 'tape'
import replaceDates from '../replaceDates'

test('replace single date', t => {
  const str = replaceDates('Feb - Mar')
  t.equals(str, 'dateBetween(start, "2016-02-01T00:00:00.000Z", "2016-03-31T23:59:59.999Z")')
  t.end()
})
