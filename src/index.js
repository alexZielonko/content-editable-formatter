// @param {String} String (contenteditable innerHTML) to which formatting should be applied
// Returns a function accepting an infinite number of function arguments.
// The first function argument is called with transformString's string argument.
// Subsequent arguments are called with the return value of the previous.
export function transformString(str) {
  return function transform() {
    return [...arguments].reduce((str, func) => func(str), str)
  }
}

// Removes inline instances of <div> variants
export function removeDivElements(str) {
  return str.replace(/<\/?(div)>/gi, '')
}

// Removes inline instances of <br> variants
export function removeBrElements(str) {
  return str.replace(/< ?br ?\/?>/gi, '')
}

// Remove inline instances of &nbsp;, the character entity reference
// Does not remove numeric character reference
export function removeNonBreakingSpaces(str) {
  return str.replace(/&nbsp;/g, '')
}
