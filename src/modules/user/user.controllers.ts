import { Request, Response, NextFunction } from "express"
import { RequestHelper } from "../../core/request.helper";
import { AuthenticatedRequest, systemError, user } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import UserService from './user.services';
import bcrypt from "bcryptjs";
import { NON_EXISTENT_ID } from "../../constants";
import LoggerService from "../../core/logger.services";

class UserController {
    constructor() {

    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        UserService.getUsers()
            .then((result: user[]) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    };

    async getUserById(req: Request, res: Response, next: NextFunction) {
        LoggerService.debug("getUserById method start");
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                UserService.getUserById(numericParamOrError)
                    .then((result: user) => {
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

    async deleteById(req: Request, res: Response, next: NextFunction) {

        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                UserService.deleteById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
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

    async updateById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: user = req.body;

                UserService.updateById({
                    id: numericParamOrError,
                    firstName: body.firstName,
                    lastName: body.lastName,
                }, (req as AuthenticatedRequest).userData.userId)
                    .then((result: user) => {
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

    async add(req: Request, res: Response, next: NextFunction) {
        const body: user = req.body;
        const hashedPassword = bcrypt.hashSync(body.password as string);

        UserService.add({
            id: NON_EXISTENT_ID,
            firstName: body.firstName,
            lastName: body.lastName,
            login: body.login,
            password: hashedPassword
        }, (req as AuthenticatedRequest).userData.userId)
            .then((result: user) => {
                const returnedUser: user = {
                    id: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName
                }
                return res.status(200).json(returnedUser);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    }

}

export default new UserController();