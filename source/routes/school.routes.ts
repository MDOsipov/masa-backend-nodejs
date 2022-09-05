/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/general/board-types', controller.getBoardTypes);


export default { router };