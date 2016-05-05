import jouch from 'jouch'
import replaceTags from './replaceTags'
import replaceDates from './replaceDates'

export default compile

function compile(str) {
  str = replaceTags(str)
  // TODO: turned off date replacement for the time being
  // it conflicts with the way tick log -d works and defaults
  //str = replaceDates(str)
  return jouch(str)
}
