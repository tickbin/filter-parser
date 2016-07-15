import chrono from 'chrono-node'
import wholeMonth from 'chrono-refiner-wholemonth'

export default extractDates

const parser = new chrono.Chrono
parser.refiners.push(wholeMonth)

function extractDates(str, timezoneOffset) {
  let extracted = str
  const dates = [] 

  for (let match of parser.parse(str)) {
    //  If timezoneOffset is supplied, this set's the parsed time into user's
    //  timezone
    if (timezoneOffset) {
      match.start.assign('timezoneOffset', timezoneOffset)
      match.end.assign('timezoneOffset', timezoneOffset)
    }

    let startMoment = match.start.moment().startOf('day').utc()
    let endMoment = match.end.moment().endOf('day').utc()
    let start = startMoment.toDate()
    let end =   endMoment.toDate()
    let startArr = JSON.stringify(startMoment.toArray())
    let endArr =   JSON.stringify(endMoment.toArray())
    let text = `(startArr >= ${startArr} and startArr <= ${endArr})`
    dates.push(
      { start, end, text }
    )
    extracted = extracted.replace(match.text, '')
  }

  return {extracted, dates}
}
