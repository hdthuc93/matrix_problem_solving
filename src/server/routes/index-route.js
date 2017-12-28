import express from 'express';
import userRoute from './user-route';
import constantRoute from './constant-route';
import problemRoute from './problem-route';
import solutionRoute from './solution-route';
import submissionRoute from './submission-route';
import auth from '../middlewares/authentication';


const router = express.Router();

router.use('/users', userRoute);

router.use('/*', auth.authenToken);

router.use('/problems', problemRoute);
router.use('/solutions', solutionRoute);
router.use('/submissions', submissionRoute);
router.use('/constants', constantRoute);

export default router;
