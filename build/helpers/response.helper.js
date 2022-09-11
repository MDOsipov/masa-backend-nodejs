"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
const constants_1 = require("../constants");
class ResponseHelper {
    static handleError(response, error) {
        console.log(error.code + " " + error.message);
        switch (error.code) {
            case constants_1.ErrorCodes.ConnectionError:
                return response.status(408).json({
                    errorMessage: error.message
                });
            case constants_1.ErrorCodes.queryError:
                return response.status(406).json({
                    errorMessage: error.message
                });
            case constants_1.ErrorCodes.NonNumericInput:
                return response.setMaxListeners(406).json({
                    errorMessage: error.message
                });
            case constants_1.ErrorCodes.noData:
                return response.setMaxListeners(404).json({
                    errorMessage: error.message
                });
            default:
                return response.status(400).json({
                    errorMessage: error.message
                });
        }
    }
}
exports.ResponseHelper = ResponseHelper;
