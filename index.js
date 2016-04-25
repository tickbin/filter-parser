import compileExpression from 'filtrex'
import replaceTags from './replaceTags'
export default compile

function compile(str) {
  const functions = { includes }
  return compileExpression(replaceTags(str), functions)
}

function includes (haystack, needle) {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] == needle)
      return true 
  }

  return false
}

