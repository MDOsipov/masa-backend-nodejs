import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TOKENSECRET } from "../../constants";


class AuthMiddleware {
    public authenticateJWT(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader !== "null") {

            const token = authHeader.split(" ")[1];

            jwt.verify(token, TOKENSECRET, (err: any, user: any) => {
                if (err) {
                    return res
                        .status(403)
                        .send({ success: false, message: "Token Expired" });
                }
                next();
            })
        }
        else {
            res.status(403).json({ success: false, message: "UnAuthorized" });
        }
    }
}

export default new AuthMiddleware();