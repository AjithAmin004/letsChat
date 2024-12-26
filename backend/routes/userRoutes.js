import express from 'express'
import {registerUser,loginUser,allUser} from '../controllers/userController.js'
import authorize from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/').get(authorize,allUser)

export default router;
