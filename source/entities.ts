export interface whiteBoardType {
    id: number;
    type: string;
}

export interface systemError {
    code: number;
    message: string;
}

export interface sqlParameter {
    name: string;
    type: any;
    value: string | number;
}