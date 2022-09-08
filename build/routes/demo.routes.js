"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** source/routes/posts.ts */
const express_1 = __importDefault(require("express"));
const demo_controller_1 = __importDefault(require("../controllers/demo.controller"));
const router = express_1.default.Router();
router.get('/hello-world', demo_controller_1.default.getHelloWorld);
router.get('/timeout', demo_controller_1.default.getWithTimeout);
router.get('/delay/:seconds', demo_controller_1.default.getWithDelay);
router.get('/delay-validated/:seconds', demo_controller_1.default.getWithDelayValidated);
exports.default = { router };
