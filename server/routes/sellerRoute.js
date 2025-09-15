import express from 'express';
import { sellerLogin,logoutSeller,isSellerAuth } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const router=express.Router();

router.post('/seller-login',sellerLogin);
router.post('/logout',logoutSeller);
router.get('/is-auth',authSeller,isSellerAuth);

export default router;