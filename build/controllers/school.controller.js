"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_helper_1 = require("../helpers/request.helper");
const response_helper_1 = require("../helpers/response.helper");
const school_services_1 = require("../services/school.services");
const schoolService = new school_services_1.SchoolService();
const getBoardTypes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    schoolService.getBoardTypes()
        .then((result) => {
        return res.status(200).json({
            message: result
        });
    })
        .catch((error) => {
        return response_helper_1.ResponseHelper.handleError(res, error);
    });
});
const getBoardType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.getBoardType(numericParamOrError)
                .then((result) => {
                return res.status(200).json({
                    result
                });
            })
                .catch((error) => {
                return response_helper_1.ResponseHelper.handleError(res, error);
            });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return response_helper_1.ResponseHelper.handleError(res, numericParamOrError);
    }
});
const updateBoardType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numericParamOrError = request_helper_1.RequestHelper.ParseNumericInput(req.params.id);
    console.log("Я тут!");
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body = req.body;
            console.log("Я тут!2");
            schoolService.updateBoardType({
                id: numericParamOrError,
                type: body.type
            })
                .then(() => {
                return res.sendStatus(200);
            })
                .catch((error) => {
                return response_helper_1.ResponseHelper.handleError(res, error);
            });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return response_helper_1.ResponseHelper.handleError(res, numericParamOrError);
    }
});
exports.default = { getBoardTypes, getBoardType, updateBoardType };
