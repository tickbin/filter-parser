import test from 'tape'
import parse from '../'

test('replace single tags', t => {
  const {parsed} = parse('#tag')
  t.equals(parsed, 'tags has "#tag"')
  t.end()
})

test('replace multiple tags', t => {
  const {parsed} = parse('#tag1 and #tag2')
  t.equals(parsed, 'tags has "#tag1" and tags has "#tag2"')
  t.end()
})

test('replace single date', t => {
  const {dates} = parse('Feb - Mar 2016')

  t.equals(dates.length, 1, 'only one date found')
  t.equals(dates[0].text, '(startArr >= [2016,1,1,0,0,0,0] and startArr <= [2016,2,31,23,59,59,999])')
  t.end()
})

test('date relative to timezone offset', t => {
  //  Timezone of -24 hours (-1440 minites) to ensure different date
  const {dates} = parse('Feb - Mar 2016', -1440)

  //  Feb 1 12am - Mar 31 11:59pm in UTC-1440 is the same as Feb 2 12am - April 1 11:59pm in UTC
  t.equals(dates[0].text, '(startArr >= [2016,1,2,0,0,0,0] and startArr <= [2016,3,1,23,59,59,999])')
  t.end()
})
