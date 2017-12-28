import express from 'express';
import constantCtrl from '../controllers/constant-controller';

const router = express.Router();

router.route('/').put(constantCtrl.update);

export default router;