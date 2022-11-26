import { RouteConfig } from "../../framework/route.config";
import express, { Application, Request, Response } from "express";
import SchoolController from "./school.controllers";
import AuthMiddleware from "../../core/Middleware/auth.middleware";

export class SchoolRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "SchoolRoutes");
    }
    public configureRoutes() {
        this.app.route(`/general/board-types`).get([AuthMiddleware.authenticateJWT, SchoolController.getBoardTypes]);
        this.app.route(`/general/board-type/:id`).get([AuthMiddleware.authenticateJWT, SchoolController.getBoardType]);
        return this.app;
    }
}