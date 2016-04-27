import compileExpression from 'filtrex'
import replaceTags from './replaceTags'
import replaceDates from './replaceDates'

export default compile

function compile(str) {
  const functions = { includes, dateBetween }
  str = replaceTags(str)
  str = replaceDates(str)
  return compileExpression(str, functions)
}

function includes (haystack, needle) {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] == needle)
      return true 
  }

  return false
}

function dateBetween (date, start, end) {
  const afterStart = date >= new Date(start)
  const beforeEnd = date <= new Date(end)

  return (afterStart && beforeEnd)
}

