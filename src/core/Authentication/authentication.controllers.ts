import { Request, Response, NextFunction } from "express"
import AuthenticationService from "./authentication.services";
import jwt from "jsonwebtoken";
import { TOKENSECRET } from "../../constants";
import { authenticationToken, systemError, whiteBoardType, jwtUserData } from '../../entities';
import { ResponseHelper } from "../../framework/response.helper";

interface localUser {
    login: string;
    password: string;
}

class AuthenticationController {
    constructor() {

    }

    async login(req: any, res: Response, next: NextFunction) {
        // return res.status(200).json({
        //     success: true
        // })
        const user: localUser = req.body;

        AuthenticationService.login(user.login, user.password)
            .then((userData: jwtUserData) => {

                const authenticationToken: authenticationToken = {
                    userData: userData
                };

                const token: string = jwt.sign(
                    authenticationToken,
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

}

export default new AuthenticationController();