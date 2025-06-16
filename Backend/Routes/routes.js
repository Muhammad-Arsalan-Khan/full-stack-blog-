import express from 'express';
const router = express.Router();
import { login, signup, createblogs, Updateblogs, deleteblogs, blogs, getBlogByUserId, getBlogById } from '../Controller/controller.js';

router.post('/login',login);

router.post('/signup', signup);

router.post('/createblogs', createblogs)

router.patch('/updateblogs/:id', Updateblogs)

router.delete('/deleteblogs/:id', deleteblogs)

router.get('/blogs', blogs);

router.get('/blogs/:id', getBlogByUserId);

router.get('/blog/:id', getBlogById);

export default router;