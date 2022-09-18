export interface entityWithId {
    id: number;
}

export interface whiteBoardType extends entityWithId {
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

