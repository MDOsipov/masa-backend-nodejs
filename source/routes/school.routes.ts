/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/board-types', controller.getBoardTypes);
router.get('/board-type/:id', controller.getBoardType);
router.put('/board-type/:id', controller.updateBoardType);
router.post('/board-type', controller.addBoardType);
router.delete('/board-type/:id', controller.deleteBoardTypeById);



export default { router }; 