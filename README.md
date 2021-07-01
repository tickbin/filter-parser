# Deprecation Notice 

**Deprecation notice:** This project and codebase are not maintained. We might revisit this again in the future, but for now the code is read-only :)

# Filter parser

A simple first pass parser to take strings that look like 
"#tag1 and #tag2 Jan - Feb" and convert them to strings (with the date portion
extracted out) so that they can be recombined in such a way that 
[jouch](https://github.com/tickbin/jouch) can use them to generate a tickbin 
specific couch db 2.0 query selector.

Install
=======

    npm install tickbin-filter-parser

Usage
=====

```javascript
import parse from 'tickbin-filter-parser'

const {parsed, dates} = parse('#dog or #cat Jan - Feb')
// parsed = "tags has '#dog' or tags has '#cat'
// dates = [{
//  start: Date('2016-01-01'), 
//  end: Date('2016-02-29'), 
//  text: '(startArr >= [2016,0,1,0,0,0,0] and startArr <= [2016,1,29,23,59,59,999])'
// ]}
```


### Building

    npm install
    npm test
    npm run build

Copyright © 2016, Two Story Robot Labs Inc.

Lead Maintainer: [Jonathan Bowers](https://github.com/jonotron)
