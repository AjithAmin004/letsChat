import express from 'express';
import authorize from '../middleware/authMiddleware.js';
import { accessChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addToGroup} from '../controllers/chatController.js';
const router = express.Router();

router.use(authorize)
router.route('/').post(accessChat);
router.route('/').get(fetchChat);
router.route('/group').post(createGroupChat);
router.route('/rename').put(renameGroup);
router.route('/groupRemove').put(removeFromGroup);
router.route('/groupAdd').put(addToGroup);

export default router;