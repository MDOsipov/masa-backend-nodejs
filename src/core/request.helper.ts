import { ErrorCodes, NON_EXISTENT_ID } from "../constants";
import { General } from "../constants"
import { systemError } from "../entities";
import ErrorService from "./error.services"
import { AppError } from "../enums";


export class RequestHelper {
    public static ParseNumericInput(input: string): number | systemError {
        let result: number = NON_EXISTENT_ID;

        if (isNaN(Number(input))) {
            return ErrorService.getError(AppError.NonNumericInput);
        }

        if (input !== null && input !== undefined) {
            result = parseInt(input);
        }
        else {
            return ErrorService.getError(AppError.InputParameterNotSupplied);
        }
        return (result);
    }
}