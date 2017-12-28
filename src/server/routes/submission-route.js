import express from 'express';
import submissionCtrl from '../controllers/submission-controller';

const router = express.Router();

router.route('/').post(submissionCtrl.checkCorrectAns);

export default router;