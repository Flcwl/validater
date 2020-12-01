export interface StrategyPlugin {
    [key: string]: ValidaterStrategy;
}
export interface ValidaterRule {
    name: string;
    strategy: any;
    message?: string;
}
interface ValidateFunc {
    (value: unknown, strategy: any): boolean;
}
interface Validator {
    (value: unknown): string | undefined;
}
interface ValidaterStrategy {
    validate: ValidateFunc;
    message: string;
}
interface ValidatorTable {
    [key: string]: Validator;
}
interface ErrorTable {
    string?: string;
}
declare enum ValidaterType {
    string = "string",
    boolean = "boolean",
    number = "number"
}
interface ValidaterOptions {
    trim: boolean;
    type: ValidaterType;
    defaultMessage: string;
}
/**
 * check if true/false, if false then return msg special field to
 */
declare class Validater {
    static strategyTable: StrategyPlugin;
    static defaultOptions: ValidaterOptions;
    type: ValidaterType;
    trim: boolean;
    convert: (value: unknown) => boolean | string | number;
    defaultMsg: string;
    errorTable: ErrorTable;
    validatorTable: ValidatorTable;
    ruleSequence: string[];
    /**
     * @param rules validation rules of user
     * @param options validation options of user
     */
    constructor(rules?: ValidaterRule[], options?: ValidaterOptions);
    /**
     * Traverse rules to generate validators
     */
    addRules: (rules?: ValidaterRule[] | undefined) => void;
    /**
     * Register validators generated based on rules
     */
    registerValidator: (rule: ValidaterRule) => void;
    validate: (value: unknown, ruleName?: string | undefined) => string | void;
    validateOne: (value: unknown) => string | void;
    validateAll: (value: unknown) => Validater;
    formatMessage: (message: string, value: unknown) => string;
    hasError: () => boolean;
    getError: (ruleName?: string | undefined) => any;
    /**
     * Extend validation plugin
     */
    static extend(ruleName: string, validate: ValidateFunc, message?: string): typeof Validater;
}
export default Validater;
