import express from 'express';
const router = express.Router();
import {createblogs, Updateblogs, deleteblogs, blogs, getBlogByUserId, getBlogById, likeblogs , allblogs, allUser, userUpdate, commitBlogs } from '../Controller/controller.js';

// router.post('/login',login);

// router.post('/signup', signup);

router.get('/admin/allblogs', allblogs);
router.get('/admin/allUser', allUser);
router.put('/admin/userUpdate/:userId', userUpdate);

router.post('/createblogs', createblogs)

router.patch('/updateblogs/:id', Updateblogs)

router.delete('/deleteblogs/:id', deleteblogs)

// router.get('/blogs', blogs);

router.get('/blogs/:id', getBlogByUserId);

router.get('/blog/:id', getBlogById);

router.patch('/likeblogs/:id', likeblogs);
router.patch('/commits/:id', commitBlogs)

export default router;