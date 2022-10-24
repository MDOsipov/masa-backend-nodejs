import { Request, Response, NextFunction } from 'express';

const getHelloWorld = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: "Hello world!"
    });
};

const getWithTimeout = async (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
        return res.status(200).json({
            message: "Timeout in 1 second!"
        });
    }, 1000);
};

const getWithDelay = async (req: Request, res: Response, next: NextFunction) => {
    let delayInSeconds: number = parseInt(req.params.seconds);

    setTimeout(() => {
        return res.status(200).json({
            message: `Timeout in ${delayInSeconds} second(s)!`
        });
    }, delayInSeconds * 1000);
};

const getWithDelayValidated = async (req: Request, res: Response, next: NextFunction) => {
    const secondsStringParameter: string = req.params.seconds;
    if (isNaN(Number(secondsStringParameter))) {
        // Error response
        // return res.status(406).json({
        //     error: "Incorrect seconds parameter value"
        // });

        // Second way
        return res.sendStatus(406);
    }
    else {
        let delayInSeconds: number = parseInt(req.params.seconds);
        setTimeout(() => {
            return res.status(200).json({
                message: `Timeout in ${delayInSeconds} second(s)!`
            });
        }, delayInSeconds * 1000);
    }
};


export default { getHelloWorld, getWithTimeout, getWithDelay, getWithDelayValidated };