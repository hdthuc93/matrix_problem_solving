import express from 'express';
import userRoute from './user-route';
import problemRoute from './problem-route';


const router = express.Router();

router.use('/users', userRoute);
router.use('/problems', problemRoute);

export default router;
