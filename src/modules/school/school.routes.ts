import { RouteConfig } from "../../framework/route.config";
import express, { Application, Request, Response } from "express";
import SchoolController from "./school.controllers";

export class SchoolRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "SchoolRoutes");
    }
    public configureRoutes() {
        this.app.route(`/general/board-types`).get([SchoolController.getBoardTypes]);
        this.app.route(`/general/board-type/:id`).get([SchoolController.getBoardType]);
        return this.app;
    }
}