import express from 'express';
import itemCtrl from '../controllers/test';

const router = express.Router();

router.route('/')
    .get(
        itemCtrl.test
    );

export default router;