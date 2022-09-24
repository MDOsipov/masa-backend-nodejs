import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { ErrorService } from '../services/error.services';
import bcrypt from "bcryptjs";
import { AuthenticationService } from '../services/authentication.services';
import { systemError, whiteBoardType } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';
import { AppError } from '../enums';
import { TOKENSECRET } from "../constants";
import { jwtUserData } from "../entities"

interface localUser {
    login: string;
    password: string;
}


const errorService: ErrorService = new ErrorService();
const authenticationService: AuthenticationService = new AuthenticationService(errorService);

const login = async (req: Request, res: Response, next: NextFunction) => {

    const user: localUser = req.body;

    authenticationService.login(user.login, user.password)
        .then((userData: jwtUserData) => {

            const token: string = jwt.sign(
                userData,
                TOKENSECRET,
                {
                    expiresIn: "2h"
                }
            );

            return res.status(200).json({
                token: token
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error, true);
        });

}

export default { login };