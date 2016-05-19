import chrono from 'chrono-node'
import wholeMonth from 'chrono-refiner-wholemonth'

export default extractDates

const parser = new chrono.Chrono
parser.refiners.push(wholeMonth)

function extractDates(str) {
  let extracted = str
  const dates = [] 

  for (let match of parser.parse(str)) {
    let start = match.start.moment().utc().toDate()
    let end =   match.end.moment().utc().toDate()
    let startArr = JSON.stringify(match.start.moment().utc().toArray())
    let endArr =   JSON.stringify(match.end.moment().utc().toArray())
    let text = `(startArr >= ${startArr} and startArr <= ${endArr})`
    dates.push(
      { start, end, text }
    )
    extracted = extracted.replace(match.text, '')
  }

  return {extracted, dates}
}
