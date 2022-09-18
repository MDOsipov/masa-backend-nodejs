import { ErrorHelper } from "./error.helpers";
import { ErrorCodes, NON_EXISTENT_ID } from "../constants";
import { General } from "../constants"
import { systemError } from "../entities";
import { ErrorService } from "../services/error.services"
import { AppError } from "../enums";


export class RequestHelper {
    public static ParseNumericInput(errorService: ErrorService, input: string): number | systemError {
        let result: number = NON_EXISTENT_ID;

        if (isNaN(Number(input))) {
            return errorService.getError(AppError.NonNumericInput);
        }

        if (input !== null && input !== undefined) {
            result = parseInt(input);
        }
        else {
            return errorService.getError(AppError.InputParameterNotSupplied);
        }
        return (result);
    }
}