import express, { Express, Application, Request, Response } from "express";
import * as http from "http";
import cors from "cors";
import { RouteConfig } from "./framework/route.config";
import { UserRoutes } from "./modules/user/user.routes";
import { SchoolRoutes } from "./modules/school/school.routes";
import { AuthenticationRoutes } from "./core/Authentication/authentication.routes";

const routes: Array<RouteConfig> = [];
const app: Express = express();
app.use(express.json());
app.use(cors());

const PORT: number = 6060;

// if (process.env.DEBUG) {
//     process.on("unhandledRejection", (reason) => {
//         process.exit(1);
//     });
// }

routes.push(new UserRoutes(app));
routes.push(new SchoolRoutes(app));
routes.push(new AuthenticationRoutes(app));

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome world");
});

const server: http.Server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    routes.forEach((route: RouteConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
});