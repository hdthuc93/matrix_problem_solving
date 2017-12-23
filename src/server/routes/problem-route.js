import express from 'express';
import problemCtrl from '../controllers/problem-controller';
import problemTypeCtrl from '../controllers/problem_type-controller';
import constantCtrl from '../controllers/constant-controller';

const router = express.Router();

router.route('/')
    .post(problemCtrl.insert);
router.route('/type/:type/constant/:const').get(problemCtrl.getAll);
router.route('/type').get(problemTypeCtrl.getAll);
router.route('/constant').get(constantCtrl.getAll);

export default router;