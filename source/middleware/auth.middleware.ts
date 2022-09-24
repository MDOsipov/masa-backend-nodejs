import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { TOKENSECRET } from "../constants";
import { authenticationToken, jwtUserData, AuthenticatedRequest } from "../entities";
import { Role } from "../enums"

interface jwtBase {
    userData: jwtUserData;
    exp: number;
    iat: number;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.headers["authorization"]?.toString();

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    // Bearer .............
    try {
        token = token.substring("Bearer ".length);
        const decoded: string | JwtPayload = jwt.verify(token, TOKENSECRET);
        (req as AuthenticatedRequest).userData = (decoded as jwtBase).userData;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

export default { verifyToken };