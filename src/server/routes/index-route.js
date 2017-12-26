import express from 'express';
import userRoute from './user-route';
import problemRoute from './problem-route';
import solutionRoute from './solution-route';


const router = express.Router();

router.use('/users', userRoute);
router.use('/problems', problemRoute);
router.use('/solutions', solutionRoute);

export default router;
