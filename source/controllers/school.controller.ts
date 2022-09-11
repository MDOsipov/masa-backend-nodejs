import { Request, Response, NextFunction } from 'express';
import { resolveProjectReferencePath } from 'typescript';
import { ErrorCodes, General } from '../constants';
import { systemError, whiteBoardType } from '../entities';
import { ErrorHelper } from '../helpers/error.helpers';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { SchoolService } from '../services/school.services';

const schoolService: SchoolService = new SchoolService();

const getBoardTypes = async (req: Request, res: Response, next: NextFunction) => {
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

    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
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

const updateBoardType = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
    console.log("Я тут!");
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: whiteBoardType = req.body;
            console.log("Я тут!2");
            schoolService.updateBoardType({
                id: numericParamOrError,
                type: body.type
            })
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


export default { getBoardTypes, getBoardType, updateBoardType };