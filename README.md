# Validater

[![Build Status](https://travis-ci.org/Flcwl/validater.svg?branch=master)](https://travis-ci.org/github/Flcwl/validater)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Flcwl/validater/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@flcwly/validater.svg?style=flat)](https://www.npmjs.com/package/validater)

> A excellent and useful JavaScript validation library, it works better with the Validator.js.

---

## Getting Started

### Installation

```console
npm install --save @flcwly/validater
```

### Documentation

You can Using the `Validater` to check any data, like `string` and others.

Firstly, you need extend the Validator plugins as your need.

```js
const Validater = require('@flcwly/validater').default
const requiredPlugin = (value: any, strategy = true) => {
  return strategy && !!value
}
const maxPlugin = (value: string, strategy: number) => {
  return required(value) && value.length <= strategy
}

// extend
Validater.extend('required', requiredPlugin).extend('max', maxPlugin)
```

Secondly, you can Using the `required` and `max` like the following way.

```js
const v = new Validater([
  {
    name: 'required',
    strategy: true,
    message: 'please enter your name.',
  },
  {
    name: 'max',
    strategy: 11,
    message: 'Please enter the correct name.',
  },
])
const errorMsg = v.validateOne('abc1234567890') // "Please enter the correct name."
```

You can define the order of validators by array.

or using ES6 Module:

```js
import Validater from '@flcwly/validater'
```

### constructor

The Validater constructor accepts two parameters: `new Validater(rules, options)`.

- `rules: ValidaterRule[]`

A array that type is `ValidaterRule`.

```js
name: string      // extend ruleName for validation
strategy: any     // extend strategy for validation
message?: string  // rule error message
```

- `options`

```js
type: 'string' | 'boolean' | 'number' // transform type before validating, default is `string`
trim: boolean // trim(value) before validating when type is string, default is `true`
defaultMessage: string // default global error message, default is `The value is incorrect`,
```

If you have not set a specific error message for rule, the error message will using `defaultRuleMessage`.

```js
const defaultRuleMessage = 'required defaultRuleMessage'
Validater.extend('required', requiredPlugin).extend('max', maxPlugin, defaultRuleMessage)

const v = new Validater([
  {
    name: 'required',
    strategy: true,
  },
])
const errorMsg = v.validateOne('') // "required defaultRuleMessage"
```

If you don't set a `defaultRuleMessage` when `extend`, Then will using the `defaultMessage`.

```js
const v = new Validater([
  {
    name: 'required',
    strategy: true,
  },
])
const errorMsg = v.validateOne('') // "The value is incorrect"
```

The message string's relationship for overriding is:

```console
message > defaultRuleMessage > defaultMessage
```

And the message string is parsed and replaced with the value by \$0.

```js
const v = new Validater([
  {
    name: 'numeric',
    strategy: true,
    message: '$0 error',
  },
])
const errorMsg = v.validateOne('1a1') // "1a1 error"
```

---

### Instance Functions

- `addRules: (rules?: ValidaterRule[] | undefined) => void;`

Traverse rules to register validators generated based on rules.

- `validate: (value: unknown, ruleName?: string | undefined) => string | void;`

Validate a value with special ruleName.

- `validateOne: (value: unknown) => string | void;`

Validate a value base on array order starts at 0.

- `validateAll: (value: unknown) => this;`

Validate a value for all rules, then will return `this`.

- `hasError: () => boolean;`

Check if the error exists, return `true` when error.

- `getError: (ruleName?: string | undefined) => any;`

Get error to special ruleName, return all error as object when `ruleName === undefined`.

---

## with validator.js

It works better with the [Validator.js](https://github.com/validatorjs/validator.js).

```js
import Validator from 'validator'

Validater.extend('isEmail', Validator.isEmail)

const v = new Validater([
  {
    name: 'isEmail',
    message: '"$0" error',
  },
])
const errorMsg = v.validateOne('@mail.com') // ""@mail.com" error"
```

---

## Tests

You can find all cases in `files:/test/*.spec.js`, And testing Using below script.

```console
npm run test
```
