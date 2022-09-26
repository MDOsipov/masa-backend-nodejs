import { AppError, Role } from "./enums";
import { Request, Response, NextFunction } from "express";


export interface entityWithId {
    id: number;
}

export interface whiteBoardType extends entityWithId {
    type: string;
}

export interface systemError {
    key: AppError;
    code: number;
    message: string;
}

export interface sqlParameter {
    name: string;
    type: any;
    value: string | number;
}

export interface jwtUserData {
    userId: number;
    roleId: Role;
}

export interface authenticationToken {
    userData: jwtUserData;
}

export interface user extends entityWithId {
    firstName: string;
    lastName: string;
    login?: string;
    password?: string;
}

export interface AuthenticatedRequest extends Request, authenticationToken { }