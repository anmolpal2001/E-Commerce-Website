import express from 'express';

import { createCategory, getAllCategories } from '../controllers/Category.js';
import { isAdmin, protect } from '../middlewares/protect.js';

const router = express.Router();

router.post("/create",protect,isAdmin, createCategory);
router.get("/",getAllCategories);


export default router;