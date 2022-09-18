import { Request, Response, NextFunction } from 'express';
import { ErrorService } from '../services/error.services';
import bcrypt from "bcryptjs";
import { AuthenticationService } from '../services/authentication.services';
import { systemError, whiteBoardType } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';
import { AppError } from '../enums';

interface localUser {
    login: string;
    password: string;
}

const errorService: ErrorService = new ErrorService();
const authenticationService: AuthenticationService = new AuthenticationService(errorService);

const login = async (req: Request, res: Response, next: NextFunction) => {
    console.log("I'm here");
    const body: localUser = req.body;

    authenticationService.login(body.login, body.password)
        .then((id: number) => {
            // TODO: Generate JWT token
            const token: string = "1";
            return res.status(200).json({
                result: token
            });
            // TODO: Handle errors
        })
        .catch((error: systemError) => {
            console.log("I'm here (error)");
            return ResponseHelper.handleError(res, error, true);
        })

}

export default { login };