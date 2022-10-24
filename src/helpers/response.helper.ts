import { Response } from 'express';
import { ErrorCodes } from '../constants';
import { systemError } from "../entities";
import { AppError } from '../enums';

export class ResponseHelper {
    public static handleError(response: Response, error: systemError, isAuthentication: boolean = false): Response<any, Record<string, any>> {
        switch (error.key) {
            case AppError.ConnectionError:
                return response.status(408).json({
                    errorMessage: error.message
                });
            case AppError.queryError:
                return response.status(406).json({
                    errorMessage: error.message
                });
            case AppError.NonNumericInput:
                return response.status(406).json({
                    errorMessage: error.message
                });
            case AppError.noData:
                if (isAuthentication) {
                    return response.sendStatus(403);
                }
                else {
                    return response.status(404).json({
                        errorMessage: error.message
                    });
                }
            default:
                return response.status(400).json({
                    errorMessage: error.message
                });
        }
    }
}