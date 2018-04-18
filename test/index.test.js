import {
  transformString,
  removeBrElements,
  removeDivElements,
  removeNonBreakingSpace
} from '../index'

describe('transformString', () => {
  it('Returns a function', () => {
    const actual = typeof transformString()
    const expected = 'function'

    expect(actual).toBe(expected)
  })

  test("The returned function calls its first argument with transformString's argument", () => {
    const mockFunction0 = jest.fn()
    const str = 'string'
    const returnedFunction = transformString(str)

    returnedFunction(mockFunction0)

    expect(mockFunction0).toHaveBeenCalledWith(str)
  })

  test('The returned function calls subsequent arguments with the return of previous', () => {
    const expected = 'foobar'
    const mockFunction0 = (str) => str + 'bar'
    const mockFunction1 = jest.fn()

    const returnedFunction = transformString('foo')

    returnedFunction(mockFunction0, mockFunction1)

    expect(mockFunction1).toHaveBeenCalledWith(expected)
  })

  test('The returned function calls all passed arguments', () => {
    const functions = [jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn()]
    const returnedFunction = transformString()(...functions)

    functions.forEach((func) => {
      expect(func).toHaveBeenCalled()
    })
  })

  it('Can be used to remove divs', () => {
    const str = '<div>text</div>'
    const expected = 'text'
    const actual = transformString(str)(removeDivElements)

    expect(actual).toBe(expected)
  })
})

describe('removeDivElements', () => {
  it('Does not remove variants "div" from a string', () => {
    const expected = 'div DIV /DIV /div'
    const actual = removeDivElements(expected)

    expect(actual).toBe(expected)
  })

  it('Removes all div elements from a string', () => {
    const str =
      '<div></div>t<DIV>e</DIV><div><div><DIV>x</div></div></DIV>t</DIV>'
    const actual = removeDivElements(str)
    const expected = 'text'

    expect(actual).toBe(expected)
  })
})

describe('removeBrElements', () => {
  it('Does not remove variants of "br" from a string', () => {
    const expected = 'br BR br / br/ BR/ BR / BRbr'
    const actual = removeBrElements(expected)

    expect(actual).toBe(expected)
  })

  it('Removes all div elements from a string', () => {
    const str =
      '<br>t<br/><br />e<BR><BR/><BR />x< br>< BR>t< br />< BR />< br/>< BR/>'

    const actual = removeBrElements(str)
    const expected = 'text'

    expect(actual).toBe(expected)
  })
})

describe('removeNonBreakingSpace', () => {
  it('Does not remove the characters "nbsp"', () => {
    const expected = 'nbsp'
    const actual = removeNonBreakingSpace(expected)

    expect(actual).toBe(expected)
  })

  it('Does not remove the characters "nbsp;"', () => {
    const expected = 'nbsp;'
    const actual = removeNonBreakingSpace(expected)

    expect(actual).toBe(expected)
  })

  it('Does not remove the characters "&nbsp"', () => {
    const expected = '&nbsp'
    const actual = removeNonBreakingSpace(expected)

    expect(actual).toBe(expected)
  })

  it('Removes all instances of "&nbsp;"', () => {
    const str = '&nbsp;foo&nbsp;bar&nbsp;&nbsp;foobar&nbsp;&nbsp;'
    const expected = 'foobarfoobar'
    const actual = removeNonBreakingSpace(str)

    expect(actual).toBe(expected)
  })

  it('Does not remove the numeric character reference "&#160;"', () => {
    const expected = 'foo&#160;bar'
    const actual = removeNonBreakingSpace(expected)

    expect(actual).toBe(expected)
  })

  it('Does not remove the numeric character reference "&#xA0;"', () => {
    const expected = 'foo&#xA0;bar'
    const actual = removeNonBreakingSpace(expected)

    expect(actual).toBe(expected)
  })
})