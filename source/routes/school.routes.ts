/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/school.controller';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.get('/board-types', middleware.verifyToken, controller.getBoardTypes);
router.get('/board-type/:id', controller.getBoardType);
router.put('/board-type/:id', middleware.verifyToken, controller.updateBoardType);
router.post('/board-type', middleware.verifyToken, controller.addBoardType);
router.delete('/board-type/:id', middleware.verifyToken, controller.deleteBoardTypeById);



export default { router }; 