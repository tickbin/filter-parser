import chrono from 'chrono-node'
import wholeMonth from 'chrono-refiner-wholemonth'

export default extractDates

const parser = new chrono.Chrono
parser.refiners.push(wholeMonth)

function extractDates(str) {
  let extracted = str
  const dates = [] 

  for (let match of parser.parse(str)) {
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
