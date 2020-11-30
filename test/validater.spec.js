// import Validater from '../src'
// import {
//   required,
//   min,
//   max,
//   len,
//   pattern,
//   nonPattern,
//   include,
//   exclude,
//   equals,
//   unequals,
//   startsWith,
//   endsWith,
//   type,
//   alpha,
//   numeric,
// } from '../lib/validator'

const Validater = require('../lib').default
const {
  required,
  min,
  max,
  len,
  pattern,
  nonPattern,
  include,
  exclude,
  equals,
  unequals,
  startsWith,
  endsWith,
  type,
  alpha,
  numeric,
} = require('../lib/validator')

describe('Test Validater with mock', () => {
  const mockValidateRules = [
    {
      name: 'required',
      strategy: true,
      message: 'please enter your name.',
    },
    {
      name: 'min',
      strategy: 6,
      message: 'min error for $0',
    },
    {
      name: 'max',
      strategy: 11,
      message: 'Please enter the correct name.',
    },
    {
      name: 'pattern',
      strategy: /^[\d]{11}$/,
      message: 'Please enter your complete phone number.',
    },
    {
      name: 'customValidator',
      strategy: (val) => val > 15 && val.endsWith('1'),
      message: 'Alert custom validator.',
    },
  ]

  Validater.extend('required', required)
    .extend('min', min)
    .extend('max', max)
    .extend('len', len)
    .extend('pattern', pattern)
    .extend('nonPattern', nonPattern)
    .extend('include', include)
    .extend('exclude', exclude)
    .extend('equals', equals)
    .extend('unequals', unequals)
    .extend('startsWith', startsWith)
    .extend('endsWith', endsWith)
    .extend('type', type)
    .extend('alpha', alpha)
    .extend('numeric', numeric)

  describe('required', () => {
    it('Validate when $0 = ""', () => {
      const v = new Validater(mockValidateRules)
      const result = v.validateOne('')
      expect(result).toEqual('please enter your name.')
    })
  })

  describe('min', () => {
    it('Validate when $0 = "aaa"', () => {
      const v = new Validater(mockValidateRules)
      const result = v.validateOne('aaa')
      expect(result).toEqual('min error for aaa')
    })
  })

  describe('max', () => {
    it('Validate when $0 = "abc1234567890"', () => {
      const v = new Validater(mockValidateRules)
      const result = v.validateOne('abc1234567890')
      expect(result).toEqual('Please enter the correct name.')
    })
  })

  describe('pattern', () => {
    it('Validate when $0 = a1323848482', () => {
      const v = new Validater(mockValidateRules)
      const result = v.validateOne('a1323848482')
      expect(result).toEqual('Please enter your complete phone number.')
    })
  })

  describe('customValidator', () => {
    const customValidator = (value, fn) => required(value) && fn(value)
    Validater.extend('customValidator', customValidator)

    it('Validate when $0 = 25678682349', () => {
      const v = new Validater(mockValidateRules)
      const result = v.validateOne('25678682349')
      expect(result).toEqual('Alert custom validator.')
    })
  })

  describe('pass all validators', () => {
    it('Validate when $0 = 15678682341', () => {
      const v = new Validater(mockValidateRules)
      const result = v.validateOne(15678682341)
      expect(result).toEqual(undefined)
    })
  })

  describe('Test default error message', () => {
    it('Validate global error message when $0 = ""', () => {
      const v = new Validater([
        {
          name: 'required',
          strategy: true,
        },
      ])
      const result = v.validateOne('')
      expect(result).toEqual('The value is incorrect')
    })

    it('Test default rule error message when $0 = "4"', () => {
      const defaultRuleMessage = 'include defaultRuleMessage'
      Validater.extend('customRule', include, defaultRuleMessage)

      const v = new Validater([
        {
          name: 'customRule',
          strategy: [1, 2, 3, 5],
        },
      ])
      const result = v.validateOne(4)
      expect(result).toEqual(defaultRuleMessage)
    })

    it('Test error message with $0 when $0 = "1a1"', () => {
      const v = new Validater([
        {
          name: 'numeric',
          message: '$0 error',
        },
      ])
      const result = v.validateOne('1a1')
      expect(result).toEqual('1a1 error')
    })
  })
})
