import { Response } from 'express';
import { ErrorCodes } from '../constants';
import { systemError } from "../entities";

export class ResponseHelper {
    public static handleError(response: Response, error: systemError): Response<any, Record<string, any>> {
        switch (error.code) {
            case ErrorCodes.ConnectionError:
                return response.status(408).json({
                    errorMessage: error.message
                });
            case ErrorCodes.queryError:
                return response.status(406).json({
                    errorMessage: error.message
                });
            case ErrorCodes.NonNumericInput:
                return response.setMaxListeners(406).json({
                    errorMessage: error.message
                });
            case ErrorCodes.noData:
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