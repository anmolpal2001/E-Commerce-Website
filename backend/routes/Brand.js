import express from 'express';

import { createBrand, getAllBrands } from '../controllers/Brand.js';
import { isAdmin, protect } from '../middlewares/protect.js';

const router = express.Router();

router.post("/create",protect,isAdmin, createBrand);
router.get("/",getAllBrands);


export default router;