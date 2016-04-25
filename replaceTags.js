export default replaceTags

function replaceTags(str) {
  const pattern = /(#\w+[\w-]*)/g

  return str.replace(pattern, 'includes(tags, "$1")')
}
