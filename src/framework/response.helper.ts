import { Response } from 'express';
import { ErrorCodes } from '../constants';
import { systemError } from "../entities";
import { AppError } from '../enums';
import LoggerService from '../core/logger.services';

export class ResponseHelper {
    public static handleError(response: Response, error: systemError, isAuthentication: boolean = false): Response<any, Record<string, any>> {
        switch (error.key) {
            case AppError.ConnectionError:
                LoggerService.error(error.message, "Code: ", error.code);
                return response.status(408).json({
                    errorMessage: error.message
                });
            case AppError.queryError:
                LoggerService.error(error.message, "Code: ", error.code);
                return response.status(406).json({
                    errorMessage: error.message
                });
            case AppError.NonNumericInput:
                LoggerService.warn(error.message, "Code: ", error.code);
                return response.status(406).json({
                    errorMessage: error.message
                });
            case AppError.noData:
                if (isAuthentication) {
                    LoggerService.error(error.message, "Code: ", error.code);
                    return response.sendStatus(403);
                }
                else {
                    LoggerService.warn(error.message, "Code: ", error.code);
                    return response.status(404).json({
                        errorMessage: error.message
                    });
                }
            default:
                LoggerService.error(error.message, "Code: ", error.code);
                return response.status(400).json({
                    errorMessage: error.message
                });
        }
    }
}