import replaceTags from './replaceTags'
import extractDates from './extractDates'

export default parse

function parse(str) {
  let {extracted, dates} = extractDates(str)
  extracted = replaceTags(extracted)

  return {parsed: extracted, dates}
}
