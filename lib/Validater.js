"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
var ValidaterType;
(function (ValidaterType) {
    ValidaterType["string"] = "string";
    ValidaterType["boolean"] = "boolean";
    ValidaterType["number"] = "number";
})(ValidaterType || (ValidaterType = {}));
// function parseScheme(scheme: string) {
//   let [ruleName, ruleParam] = scheme.split(':')
//   // contains:$1,$2,$3
//   const funcParams = ruleParam ? ruleParam.split(',') : []
//   // rule.setParams(funcParams);
//   // rules[ruleName] = rule;
//   return funcParams
// }
const getConvert = (type, trim) => {
    switch (type) {
        case ValidaterType.number:
            return Number;
        case ValidaterType.boolean:
            return Boolean;
        default:
            return trim ? (value) => String(value).trim() : (value) => String(value);
    }
};
const REGEX_FORMAT = /\/[^\/]|\$(0)/g;
const defaultOptions = {
    trim: true,
    type: ValidaterType.string,
    defaultMessage: 'The value is incorrect.',
};
/**
 * check if true/false, if false then return msg special field to
 */
class Validater {
    /**
     * @param rules validation rules of user
     * @param options validation options of user
     */
    constructor(rules, options) {
        /**
         * Traverse rules to generate validators
         */
        this.addRules = (rules) => {
            if (utils_1.default.a(rules) === false) {
                console.warn('Warn: Expected an array is not empty for rules.');
                return;
            }
            // @ts-ignore
            rules.forEach((rule) => {
                try {
                    this.registerValidator(rule);
                }
                catch (error) {
                    console.warn(`Warn: Invalid Rule "${rule.name}" has been remove.`);
                }
            });
        };
        /**
         * Register validators generated based on rules
         */
        this.registerValidator = (rule) => {
            const { name, strategy, message } = rule;
            const { defaultMsg, formatMessage, convert } = this;
            const { validate, message: defaultRuleMsg } = Validater.strategyTable[name];
            const validator = (value) => {
                if (validate(convert(value), strategy) === false) {
                    return formatMessage(message || defaultRuleMsg || defaultMsg, value);
                }
            };
            this.validatorTable[name] = validator;
        };
        this.validate = (value, ruleName) => {
            if (utils_1.default.u(ruleName)) {
                return this.validateOne(value);
            }
            // @ts-ignore
            const validator = this.validatorTable[ruleName];
            if (!validator) {
                throw 'Validator rule not found in register ruleTable.';
            }
            const errorMsg = validator(value);
            if (errorMsg) {
                // @ts-ignore
                this.errorTable[ruleName] = errorMsg;
                return errorMsg;
            }
        };
        this.validateOne = (value) => {
            const { validatorTable } = this;
            for (const ruleName in validatorTable) {
                if (Object.prototype.hasOwnProperty.call(validatorTable, ruleName)) {
                    const validator = validatorTable[ruleName];
                    const errorMsg = validator(value);
                    if (errorMsg) {
                        this.errorTable[ruleName] = errorMsg;
                        return errorMsg;
                    }
                }
            }
        };
        this.validateAll = (value) => {
            const { validatorTable } = this;
            for (const ruleName in validatorTable) {
                if (Object.prototype.hasOwnProperty.call(validatorTable, ruleName)) {
                    const validator = validatorTable[ruleName];
                    const errorMsg = validator(value);
                    if (errorMsg) {
                        this.errorTable[ruleName] = errorMsg;
                    }
                }
            }
            return this;
        };
        this.formatMessage = (message, value) => {
            return message.replace(REGEX_FORMAT, (_, $1) => ($1 ? value : $1));
        };
        this.hasError = () => {
            return Object.keys(this.errorTable).length > 0;
        };
        this.getError = (ruleName) => {
            return ruleName ? this.errorTable[ruleName] : this.errorTable;
        };
        const { trim, type, defaultMessage } = Object.assign({}, options, Validater.defaultOptions);
        this.errorTable = {};
        this.validatorTable = {};
        this.defaultMsg = defaultMessage;
        this.convert = getConvert(type, trim);
        this.addRules(rules);
    }
    /**
     * Extend validation plugin
     */
    static extend(ruleName, validate, message = '') {
        if (utils_1.default.u(Validater.strategyTable[ruleName]) === false) {
            throw `Validator named ${ruleName} already exists.`;
        }
        if (utils_1.default.f(validate)) {
            throw 'Validator must be a function';
        }
        Validater.strategyTable[ruleName] = { validate, message };
        return Validater;
    }
}
Validater.strategyTable = {}; // injected validation strategies
Validater.defaultOptions = defaultOptions; // validation options
exports.default = Validater;
