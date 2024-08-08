import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrderforAdmin, placeOrder, updateStatus, userOrders, verifyOrder } from '../controller/OrderController.js';

const orderRouter=express.Router();
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorder",authMiddleware,userOrders);
orderRouter.get("/list",listOrderforAdmin);
orderRouter.post("/status",updateStatus);

export default orderRouter ;