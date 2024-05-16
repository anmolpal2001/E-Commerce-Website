import express from 'express';
import { deleteAddress, getUserById, updateUser } from '../controllers/User.js';
import {protect} from '../middlewares/protect.js';

const router = express.Router();

router.get('/',protect,getUserById);
router.patch('/',protect,updateUser);
router.patch('/address',protect,deleteAddress);

export default router;