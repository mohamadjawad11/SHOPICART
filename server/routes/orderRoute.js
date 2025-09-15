import express from "express";
import { placeOrderCOD, getUserOrders,getAllOrders,placeOrderStripe } from "../controllers/orderController.js";
import authSeller from "../middlewares/authSeller.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();

router.post("/cod",authUser,placeOrderCOD);
router.get("/user",authUser,getUserOrders);
router.get("/seller",authSeller, getAllOrders);
router.post("/stripe",authUser,placeOrderStripe);


export default router;