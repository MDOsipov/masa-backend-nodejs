import { Request, Response, NextFunction } from 'express';

const getBoardTypes = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: "getBoardTypes"
    });
};



export default { getBoardTypes };