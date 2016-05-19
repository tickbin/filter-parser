import chrono from 'chrono-node'
import wholeMonth from 'chrono-refiner-wholemonth'

export default replaceDates

const parser = new chrono.Chrono
parser.refiners.push(wholeMonth)

function replaceDates(str) {
  let result = str

  for (let match of parser.parse(str)) {
    let start = JSON.stringify(match.start.moment().toArray())
    let end = JSON.stringify(match.end.moment().toArray())
    let dateText = `(startArr >= ${start} and startArr <= ${end})`
    result = result.replace(match.text, dateText)
  }

  return result
}
