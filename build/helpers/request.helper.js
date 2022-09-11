"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHelper = void 0;
const error_helpers_1 = require("./error.helpers");
const constants_1 = require("../constants");
const constants_2 = require("../constants");
class RequestHelper {
    static ParseNumericInput(input) {
        let result;
        if (isNaN(Number(input))) {
            return error_helpers_1.ErrorHelper.parseError(constants_1.ErrorCodes.NonNumericInput, constants_2.General.NonNumericInput);
        }
        if (input !== null && input !== undefined) {
            result = parseInt(input);
        }
        else {
            return error_helpers_1.ErrorHelper.parseError(constants_1.ErrorCodes.InputParameterNotSupplied, constants_2.General.InputParameterNotSupplied);
        }
        return (result);
    }
}
exports.RequestHelper = RequestHelper;
