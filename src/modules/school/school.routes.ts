import { RouteConfig } from "../../framework/route.config";
import express, { Application, Request, Response } from "express";
import SchoolController from "./school.controllers";
import AuthMiddleware from "../../core/Middleware/auth.middleware";
import { Role } from "../../enums";

export class SchoolRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "SchoolRoutes", "general");
    }
    public configureRoutes() {
        this.app.route(`/${this.baseUrl}/board-types`).get([AuthMiddleware.verifyToken([Role.Administrator]), SchoolController.getBoardTypes]);
        this.app.route(`/${this.baseUrl}/board-type/:id`).get([AuthMiddleware.verifyToken([Role.Administrator]), SchoolController.getBoardType]);
        this.app.route(`/${this.baseUrl}/board-type/:id`).put([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), SchoolController.updateBoardType])
        this.app.route(`/${this.baseUrl}/board-type`).post([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), SchoolController.addBoardType])
        this.app.route(`/${this.baseUrl}/board-type/:id`).delete([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), SchoolController.deleteBoardTypeById])
        return this.app;
    }
}