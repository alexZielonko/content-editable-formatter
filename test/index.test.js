import {
  transformString,
  removeBrElements,
  removeDivElements,
  removeEmptyEmphasisElements,
  removeEmptyParagraphElements,
  removeEmptyStrongElements,
  removeNonBreakingSpaces
} from '../src/index'

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

describe('removeNonBreakingSpaces', () => {
  it('Does not remove the characters "nbsp"', () => {
    const expected = 'nbsp'
    const actual = removeNonBreakingSpaces(expected)

    expect(actual).toBe(expected)
  })

  it('Does not remove the characters "nbsp;"', () => {
    const expected = 'nbsp;'
    const actual = removeNonBreakingSpaces(expected)

    expect(actual).toBe(expected)
  })

  it('Does not remove the characters "&nbsp"', () => {
    const expected = '&nbsp'
    const actual = removeNonBreakingSpaces(expected)

    expect(actual).toBe(expected)
  })

  it('Removes all instances of "&nbsp;"', () => {
    const str = '&nbsp;foo&nbsp;bar&nbsp;&nbsp;foobar&nbsp;&nbsp;'
    const expected = 'foobarfoobar'
    const actual = removeNonBreakingSpaces(str)

    expect(actual).toBe(expected)
  })

  it('Does not remove the numeric character reference "&#160;"', () => {
    const expected = 'foo&#160;bar'
    const actual = removeNonBreakingSpaces(expected)

    expect(actual).toBe(expected)
  })

  it('Does not remove the numeric character reference "&#xA0;"', () => {
    const expected = 'foo&#xA0;bar'
    const actual = removeNonBreakingSpaces(expected)

    expect(actual).toBe(expected)
  })
})

describe('removeEmptyEmphasisElements', () => {
  it('Does not remove emphasis elements containing text', () => {
    const expected = '<em>foo</em>'
    const actual = removeEmptyEmphasisElements(expected)

    expect(actual).toBe(expected)
  })

  it('Does not remove strong elements containg a single space', () => {
    const expected = '<em> </em>'
    const actual = removeEmptyEmphasisElements(expected)

    expect(actual).toBe(expected)
  })

  it('Removes empty emphasis elements', () => {
    const str = '<em></em>'
    const actual = removeEmptyEmphasisElements(str)

    expect(actual).toBe('')
  })

  it('Is case insensative', () => {
    const str = '<EM></EM>'
    const actual = removeEmptyEmphasisElements(str)

    expect(actual).toBe('')
  })

  it('Removes all empty emphasis elements from a string', () => {
    const str = '<em></em><EM></EM><em></em>'
    const actual = removeEmptyEmphasisElements(str)

    expect(actual).toBe('')
  })

  test('Emphasis elements are considered empty and removed if only containing empty emphasis element children', () => {
    const str = '<em><em><em><em></em></em></em></em>'
    const actual = removeEmptyEmphasisElements(str)

    expect(actual).toBe('')
  })

  test('Emphasis elements containing non-empty children are not removed', () => {
    const expected = '<em><em>foo</em></em>'
    const actual = removeEmptyEmphasisElements(expected)

    expect(actual).toBe(expected)
  })
})

describe('removeEmptyParagraphElements', () => {
  it('Does not remove paragraph elements containing text', () => {
    const expected = '<p>foo</p>'
    const actual = removeEmptyParagraphElements(expected)

    expect(actual).toBe(expected)
  })

  it('Does not remove strong elements containg a single space', () => {
    const expected = '<p> </p>'
    const actual = removeEmptyParagraphElements(expected)

    expect(actual).toBe(expected)
  })

  it('Removes empty paragraph elements', () => {
    const str = '<p></p>'
    const actual = removeEmptyParagraphElements(str)

    expect(actual).toBe('')
  })

  it('Is case insensative', () => {
    const str = '<P></P>'
    const actual = removeEmptyParagraphElements(str)

    expect(actual).toBe('')
  })

  it('Removes all empty paragraph elements from a string', () => {
    const str = '<p></p><P></P><p></p>'
    const actual = removeEmptyParagraphElements(str)

    expect(actual).toBe('')
  })

  test('Emphasis elements are considered empty and removed if only containing empty paragraph element children', () => {
    const str = '<p><p><p><p></p></p></p></p>'
    const actual = removeEmptyParagraphElements(str)

    expect(actual).toBe('')
  })

  test('Emphasis elements containing non-empty children are not removed', () => {
    const expected = '<p><p>foo</p></p>'
    const actual = removeEmptyParagraphElements(expected)

    expect(actual).toBe(expected)
  })
})

describe('removeEmptyStrongElements', () => {
  it('Does not remove strong elements containing text', () => {
    const expected = '<strong>foo</strong>'
    const actual = removeEmptyStrongElements(expected)

    expect(actual).toBe(expected)
  })

  it('Does not remove strong elements containg a single space', () => {
    const expected = '<strong> </strong>'
    const actual = removeEmptyStrongElements(expected)

    expect(actual).toBe(expected)
  })

  it('Removes empty strong elements', () => {
    const str = '<strong></strong>'
    const actual = removeEmptyStrongElements(str)

    expect(actual).toBe('')
  })

  it('Is case insensative', () => {
    const str = '<STRONG></STRONG>'
    const actual = removeEmptyStrongElements(str)

    expect(actual).toBe('')
  })

  it('Removes all empty strong elements from a string', () => {
    const str = '<strong></strong><STRONG></STRONG><strong></strong>'
    const actual = removeEmptyStrongElements(str)

    expect(actual).toBe('')
  })

  test('Strong elements are considered empty and removed if only containing empty strong element children', () => {
    const str =
      '<strong><strong><strong><strong></strong></strong></strong></strong>'
    const actual = removeEmptyStrongElements(str)

    expect(actual).toBe('')
  })

  test('Strong elements containing non-empty children are not removed', () => {
    const expected = '<strong><strong>foo</strong></strong>'
    const actual = removeEmptyStrongElements(expected)

    expect(actual).toBe(expected)
  })
})
