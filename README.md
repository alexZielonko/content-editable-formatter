# content-editable-formatter

[![Build Status](https://travis-ci.org/alexZielonko/content-editable-formatter.svg?branch=master)](https://travis-ci.org/alexZielonko/content-editable-formatter)
[![npm Version](https://img.shields.io/badge/npm-v2.2.0-blue.svg)](https://www.npmjs.com/package/content-editable-formatter)

Content-editable-formatter provides a handful of string formatting utilities for user's [contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable) input. Although the package aims to aid sanitization of content editable div element input, it can just as easily be used to remove HTML elements by any string.

## Installation

```bash
npm install content-editable-formatter --save
```

## Usage

```js
import {
  removeBrElements,
  removeDivElements,
  removeNonBreakingSpaces,
  transformString
} from 'content-editable-formatter'
```

## API

### `transformString(string)`

Returns a function serving as convience method to apply multiple formatting transformations to the passed string.

```js
const input = '<div><br></div>foo<br>&nbsp;'
const cleanInput = transformString(input)(
  removeDivElements,
  removeBrElements,
  removeNonBreakingSpaces
)

console.log(cleanInput) // 'foo'
```

### `removeDivElements(string)`

Returns a string with all inline instances of `<div>` element variants (`<div>`, `</div>`, `<DIV>`, `</DIV>`) removed.

```js
const input = '<div>foo</div>'

removeDivElements(input) // 'foo'
```

### `removeBrElements(string)`

Returns a string with all inline instances of `<br>` element variants (`<br>`, `<br />`, `< br />`,`<BR>`, `<BR />`, `< BR />`) removed.

```js
const input = 'foo<br>bar'

removeBrElements(input) // 'foobar'
```

### `removeLeadingBrElements(string)`

Returns a string with all leading instances of `<br>` element variants (`<br>`, `<br />`, `< br />`,`<BR>`, `<BR />`, `< BR />`) removed.

```js
const input = '<br>foo<br>bar<br>'

removeLeadingBrElements(input) // 'foo<br>bar<br>'
```

### `removeTrailingBrElements(string)`

Returns a string with all trailing instances of `<br>` element variants (`<br>`, `<br />`, `< br />`,`<BR>`, `<BR />`, `< BR />`) removed.

```js
const input = '<br>foo<br>bar<br>'

removeTrailingBrElements(input) // '<br>foo<br>bar'
```

### `removeNonBreakingSpaces(string)`

Returns a string with all inline instance of `&nbsp;` removed. This does not remove the numeric character references (`&#160;`, `&#xA0;`).

```js
const input = 'foo&nbsp;bar'

removeNonBreakingSpaces(input) // 'foobar'
```

### `removeEmptyEmphasisElements(string)`

Whitespace sensative, this returns a string will all inline instances of `<em></em>` removed.

```js
const input = 'foo<em></em>bar'

removeEmptyEmphasisElements(input) // 'foobar'
```

It will remove nested, empty `<em>` parents and children,

```js
const input = '<em><em></em></em>'

removeEmptyEmphasisElements(input) // ''
```

but it will not remove any of the elements if the nested children enclose text,

```js
const input = '<em><em>foo</em></em>'

removeEmptyEmphasisElements(input) // '<strong><strong>foo</strong></strong>'
```

### `removeEmptyParagraphElements(string)`

Whitespace sensative, this returns a string will all inline instances of `<p></p>` removed.

```js
const input = 'foo<p></p>bar'

removeEmptyEmphasisElements(input) // 'foobar'
```

It will remove nested, empty `<p>` parents and children,

```js
const input = '<p><p></p></p>'

removeEmptyEmphasisElements(input) // ''
```

but it will not remove any of the elements if the nested children enclose text,

```js
const input = '<p><p>foo</p></p>'

removeEmptyEmphasisElements(input) // '<strong><strong>foo</strong></strong>'
```

### `removeEmptyStrongElements(string)`

Whitespace sensative, this returns a string will all inline instances of `<strong></strong>` removed.

```js
const input = 'foo<strong></strong>bar'

removeEmptyStrongElements(input) // 'foobar'
```

It will remove nested, empty `<strong>` parents and children,

```js
const input = '<strong><strong></strong></strong>'

removeEmptyStrongElements(input) // ''
```

but it will not remove any of the elements if the nested children enclose text,

```js
const input = '<strong><strong>foo</strong></strong>'

removeEmptyStrongElements(input) // '<strong><strong>foo</strong></strong>'
```


## Future Versions

Methods to be implemented in future versions include,
* `removeAllHtmlElements(string)`
* `removeCaridgeReturns(string)`
* `removeWhiteSpaceMetacharacters(string)`
* `unescapeHtml(string)`
