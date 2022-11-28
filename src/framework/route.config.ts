import express, { Application } from "express"
export abstract class RouteConfig {
    app: Application;
    name: string;
    protected baseUrl: String;

    constructor(app: Application, name: string, baseUrl: string) {
        this.app = app;
        this.name = name;
        this.baseUrl = baseUrl;
        this.configureRoutes();
    }

    getName() {
        return this.name;
    }

    abstract configureRoutes(): Application;
}