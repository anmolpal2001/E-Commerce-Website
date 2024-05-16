import express from "express";
import {
  addToCart,
  deleteFromCart,
  getCartByUserId,
  updateCart,
} from "../controllers/Cart.js";
import {protect, isUser } from "../middlewares/protect.js";

const router = express.Router();

router.post("/",protect,isUser, addToCart);
router.get("/",protect,isUser, getCartByUserId);
router.patch("/:id",protect,isUser, updateCart);
router.delete("/:id", protect,isUser,deleteFromCart);

export default router;
