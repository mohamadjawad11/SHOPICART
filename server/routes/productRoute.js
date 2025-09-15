import express from 'express';
import { addProduct,productList,productById,changeStock } from '../controllers/productController.js';
import {upload} from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';

const router=express.Router();

router.post('/add',upload.array(["images"]), authSeller,addProduct);
router.get('/list',productList);
router.get('/id',productById);
router.post('/stock',authSeller,changeStock);

export default router;