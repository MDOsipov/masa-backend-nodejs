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
const getHelloWorld = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        message: "Hello world!"
    });
});
const getWithTimeout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    setTimeout(() => {
        return res.status(200).json({
            message: "Timeout in 1 second!"
        });
    }, 1000);
});
const getWithDelay = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let delayInSeconds = parseInt(req.params.seconds);
    setTimeout(() => {
        return res.status(200).json({
            message: `Timeout in ${delayInSeconds} second(s)!`
        });
    }, delayInSeconds * 1000);
});
const getWithDelayValidated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const secondsStringParameter = req.params.seconds;
    if (isNaN(Number(secondsStringParameter))) {
        // Error response
        // return res.status(406).json({
        //     error: "Incorrect seconds parameter value"
        // });
        // Second way
        return res.sendStatus(406);
    }
    else {
        let delayInSeconds = parseInt(req.params.seconds);
        setTimeout(() => {
            return res.status(200).json({
                message: `Timeout in ${delayInSeconds} second(s)!`
            });
        }, delayInSeconds * 1000);
    }
});
exports.default = { getHelloWorld, getWithTimeout, getWithDelay, getWithDelayValidated };
