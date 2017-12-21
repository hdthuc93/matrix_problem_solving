import express from 'express';
import userCtrl from '../controllers/user-controller';

const router = express.Router();

router.route('/register').post(userCtrl.register);
router.route('/login').post(userCtrl.login);

export default router;