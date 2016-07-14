import replaceTags from './replaceTags'
import extractDates from './extractDates'

export default parse

function parse(str, timezoneOffset) {
  let {extracted, dates} = extractDates(str, timezoneOffset)
  extracted = replaceTags(extracted)

  return {parsed: extracted, dates}
}
