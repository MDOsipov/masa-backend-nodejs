import express, { Application } from "express";
import { RouteConfig } from "../../framework/route.config";
import AuthenticationController from './authentication.controllers';

export class AuthenticationRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "AuthenticationRoutes");
    }

    public configureRoutes() {
        this.app.route('/auth/login').post([AuthenticationController.login]);
        return this.app;
    }
}


