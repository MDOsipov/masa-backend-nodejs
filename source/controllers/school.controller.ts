import { Request, Response, NextFunction } from 'express';
import { resolveProjectReferencePath } from 'typescript';
import { ErrorCodes, General, NON_EXISTENT_ID } from '../constants';
import { AuthenticatedRequest, systemError, whiteBoardType } from '../entities';
import { ErrorHelper } from '../helpers/error.helpers';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.services';
import { SchoolService } from '../services/school.services';

const errorService: ErrorService = new ErrorService();
const schoolService: SchoolService = new SchoolService(errorService);


const getBoardTypes = async (req: Request, res: Response, next: NextFunction) => {
    console.log("User data: ", (req as AuthenticatedRequest).userData);
    schoolService.getBoardTypes()
        .then((result: whiteBoardType[]) => {
            return res.status(200).json({
                message: result
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const getBoardType = async (req: Request, res: Response, next: NextFunction) => {

    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.getBoardType(numericParamOrError)
                .then((result: whiteBoardType) => {
                    return res.status(200).json({
                        result
                    });
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

const deleteBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {

    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.deleteBoardTypeById(numericParamOrError)
                .then(() => {
                    return res.sendStatus(200);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

const updateBoardType = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: whiteBoardType = req.body;
            schoolService.updateBoardType({
                id: numericParamOrError,
                type: body.type
            })
                .then((result: whiteBoardType) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

const addBoardType = async (req: Request, res: Response, next: NextFunction) => {
    const body: whiteBoardType = req.body;

    schoolService.addBoardType({
        id: NON_EXISTENT_ID,
        type: body.type
    })
        .then((result: whiteBoardType) => {
            console.log('Я тут1!');
            return res.status(200).json(result);
        })
        .catch((error: systemError) => {
            console.log('Я тут2!');
            return ResponseHelper.handleError(res, error);
        });
    console.log('Я тут3!');
}


export default { getBoardTypes, getBoardType, updateBoardType, addBoardType, deleteBoardTypeById };