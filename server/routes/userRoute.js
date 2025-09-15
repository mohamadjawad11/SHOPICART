import express from 'express';
import { registerUser,LoginUser,isAuth,logoutUser } from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',LoginUser);
router.get('/is-auth',authUser,isAuth);
router.post('/logout',authUser,logoutUser);

export default router;