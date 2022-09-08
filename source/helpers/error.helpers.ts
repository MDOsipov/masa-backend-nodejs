import { systemError } from "../entities";

export class ErrorHelper {
    public static parseError(code: number, message: string): systemError {
        const error: systemError = {
            code,
            message
        }
        return error;
    };
}