/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/general/board-types', controller.getBoardTypes);
router.get('/general/board-type/:id', controller.getBoardType);
router.put('/general/board-type/:id', controller.updateBoardType);
router.post('/general/board-type', controller.addBoardType);
router.delete('/general/board-type/:id', controller.deleteBoardTypeById);



export default { router }; 