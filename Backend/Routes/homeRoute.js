import express from 'express';
const router = express.Router();
import { blogs } from '../Controller/controller.js';

router.get('/blogs', blogs);

export default router;