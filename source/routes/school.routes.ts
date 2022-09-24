/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/school.controller';
import middleware from '../middleware/auth.middleware';
import { Role } from "../enums";
const router = express.Router();

router.get('/board-types', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getBoardTypes);
router.get('/board-type/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getBoardType);
router.put('/board-type/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.updateBoardType);
router.post('/board-type', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.addBoardType);
router.delete('/board-type/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.deleteBoardTypeById);



export default { router }; 