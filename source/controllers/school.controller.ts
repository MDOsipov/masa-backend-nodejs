import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../constants';
import { systemError, whiteBoardType } from '../entities';
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
    let id: number = -1;
    const sId: string = req.params.id;

    if (isNaN(Number(req.params.id))) {
        // ToDO: Error handling
    }

    if (sId !== null && sId !== undefined) {
        id = parseInt(sId);
    }
    else {
        // TODO: Error handling
    }

    if (id > 0) {
        schoolService.getBoardType(id)
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


};

export default { getBoardTypes, getBoardType };