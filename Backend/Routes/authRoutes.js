import express from 'express';
const router = express.Router();
import { login, signup , opt} from '../Controller/controller.js';

router.post('/login',login);

router.post('/signup', signup);

router.post('/opt/:id', opt );

export default router;
