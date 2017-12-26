import express from 'express';
import solutionCtrl from '../controllers/solution-controller';

const router = express.Router();

router.route('/')
    .post(solutionCtrl.insert);

router.route('/:id').get(solutionCtrl.getById);

export default router;