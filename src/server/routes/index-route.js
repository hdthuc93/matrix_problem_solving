import express from 'express';
import itemRoute from './item-route';


const router = express.Router();

router.use('/items', itemRoute);

export default router;
