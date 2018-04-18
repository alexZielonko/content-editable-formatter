# content-editable-formatter

Content-editable-formatter provides a handful of string formatting utilities for user's [contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable) input. Although the package aims to aid sanitization of content editable div element input, it can just as easily be used to remove HTML elements by any string.

## Installation

```bash
npm install content-editable-formatter --save
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

### `removeNonBreakingSpaces(string)`

Returns a string with all inline instance of `&nbsp;` removed. This does not remove the numeric character reference (`&#160;`, `&#xA0;`).

```js
const input = 'foo&nbsp;bar'

removeNonBreakingSpaces(input) // 'foobar'
```
