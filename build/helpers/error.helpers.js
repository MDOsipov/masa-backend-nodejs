"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHelper = void 0;
class ErrorHelper {
    static parseError(code, message) {
        const error = {
            code,
            message
        };
        return error;
    }
    ;
}
exports.ErrorHelper = ErrorHelper;
