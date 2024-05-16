import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct } from '../controllers/Product.js';
import { isAdmin, protect } from '../middlewares/protect.js';

const router = express.Router();

router.post("/create",protect,isAdmin, createProduct);
router.get("/",getAllProducts);
router.get("/:id",getProductById);
router.patch("/:id",protect,isAdmin,updateProduct);


export default router;