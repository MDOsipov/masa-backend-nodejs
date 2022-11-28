import { RouteConfig } from "../../framework/route.config";
import express, { Application, Request, Response } from "express";
import UserController from "./user.controllers";
import AuthMiddleware from "../../core/Middleware/auth.middleware";
import { Role } from "../../enums";
export class UserRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "UserRoutes", "");
    }
    public configureRoutes() {
        this.app.route(`/users`).get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), UserController.getUsers]);
        this.app.route(`/user/:id`).get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), UserController.getUserById]);
        this.app.route(`/user`).post([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), UserController.add]);
        this.app.route(`/user/:id`).put([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), UserController.updateById]);
        this.app.route(`/user/:id`).delete([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), UserController.deleteById]);
        return this.app;
    }
}