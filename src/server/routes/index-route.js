import express from 'express';
import userRoute from './user-route';
import problemRoute from './problem-route';
import solutionRoute from './solution-route';
import auth from '../middlewares/authentication';


const router = express.Router();

router.use('/users', userRoute);

router.use('/*', auth.authenToken);

router.use('/problems', problemRoute);
router.use('/solutions', solutionRoute);

export default router;
