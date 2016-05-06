import replaceTags from './replaceTags'
import replaceDates from './replaceDates'

export default parse

function parse(str) {
  str = replaceTags(str)
  str = replaceDates(str)
  return str
}
