import express from 'express';
import Cors from 'cors'
import router from './src/routes/index.js'
import userRouter from './src/routes/userRouter.js';
import transactionRouter from './src/routes/transactionRoute.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(Cors());
app.use(router);
app.use('/api/', userRouter)
app.use('/api/', transactionRouter)

export default app;