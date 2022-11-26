import { Request, Response, NextFunction } from "express"

class UserController {
    constructor() {

    }

    async getUserById(req: any, res: Response, next: NextFunction) {
        return res.status(200).json({
            success: true,
            data: [
                {
                    name: "John",
                },
                {
                    name: "Steve",
                },
            ],
        })
    }

    // async getUserById (req: Request, res: Response, next: NextFunction) {
    //     const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    //     if (typeof numericParamOrError === "number") {
    //         if (numericParamOrError > 0) {
    //             userService.getUserById(numericParamOrError)
    //                 .then((result: user) => {
    //                     return res.status(200).json(result);
    //                 })
    //                 .catch((error: systemError) => {
    //                     return ResponseHelper.handleError(res, error);
    //                 });
    //         }
    //         else {
    //             // TODO: Error handling
    //         }
    //     }
    //     else {
    //         return ResponseHelper.handleError(res, numericParamOrError);
    //     }
    // };
}

export default new UserController();