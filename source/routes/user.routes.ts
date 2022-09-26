/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/user.controller';
import middleware from '../middleware/auth.middleware';
import { Role } from "../enums";
const router = express.Router();

router.post('/', middleware.verifyToken([Role.Administrator]), controller.add);
router.put('/:id', middleware.verifyToken([Role.Administrator]), controller.updateById);
router.delete('/:id', middleware.verifyToken([Role.Administrator]), controller.deleteById);



export default { router }; 