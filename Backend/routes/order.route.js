import express from "express";
import { placeOrder, getMyOrders } from "../controllers/order.controller.js";
import { verifyToken } from '../middleware/verifyToken.js'


const router = express.Router();

router.post("/place", verifyToken, placeOrder);
router.get("/my-orders", verifyToken, getMyOrders);

export default router;
