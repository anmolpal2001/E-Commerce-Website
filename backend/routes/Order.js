import express from "express";
import {isAdmin, isUser, protect} from "../middlewares/protect.js";
import { createOrder, getOrderById, getOrdersByUserId, getTotalOrders, updateOrderStatusById } from "../controllers/Order.js";


const router = express.Router();

router.get("/",protect,isUser,getOrdersByUserId);
router.get("/:id",protect,isUser,getOrderById);
router.post("/",protect,isUser,createOrder);
router.get("/admin/:id",protect,isAdmin,getTotalOrders);
router.patch("/:id",protect,isAdmin,updateOrderStatusById);

export default router;