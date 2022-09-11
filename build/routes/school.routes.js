"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** source/routes/posts.ts */
const express_1 = __importDefault(require("express"));
const school_controller_1 = __importDefault(require("../controllers/school.controller"));
const router = express_1.default.Router();
router.get('/general/board-types', school_controller_1.default.getBoardTypes);
router.get('/general/board-type/:id', school_controller_1.default.getBoardType);
router.put('/general/board-type/:id', school_controller_1.default.updateBoardType);
exports.default = { router };
