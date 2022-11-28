import { Request, Response, NextFunction } from "express"
import { NON_EXISTENT_ID } from "../../constants";
import { RequestHelper } from "../../core/request.helper";
import { systemError, whiteBoardType } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import SchoolService from "./school.services";

class SchoolController {
    constructor() {

    }

    async getBoardTypes(req: any, res: Response, next: NextFunction) {
        // return res.status(200).json({
        //     success: true
        // })
        // console.log("User data: ", (req as AuthenticatedRequest).userData);
        SchoolService.getBoardTypes()
            .then((result: whiteBoardType[]) => {
                return res.status(200).json({
                    message: result
                });
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    }

    async getBoardType(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                SchoolService.getBoardType(numericParamOrError)
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

    async updateBoardType(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: whiteBoardType = req.body;

                SchoolService.updateBoardType({
                    id: numericParamOrError,
                    type: body.type
                }, (req as any).userData.userId)
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

    async deleteBoardTypeById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                SchoolService.deleteBoardTypeById(numericParamOrError, (req as any).userData.userId)
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

    async addBoardType(req: Request, res: Response, next: NextFunction) {
        const body: whiteBoardType = req.body;

        SchoolService.addBoardType({
            id: NON_EXISTENT_ID,
            type: body.type
        }, (req as any).userData.userId)
            .then((result: whiteBoardType) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    }

}

export default new SchoolController();