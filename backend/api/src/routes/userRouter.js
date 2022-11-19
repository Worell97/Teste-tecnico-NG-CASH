import PromiseRouter from "express-promise-router"; 
import {createUser, getAccountByName, getBalanceByAccount, signin} from '../controllers/userController.js';

const userRouter = PromiseRouter();

userRouter.post('/signup', createUser);

userRouter.post('/users/', getAccountByName);

userRouter.post("/signin", signin);

userRouter.get("/balance", getBalanceByAccount);

export default userRouter;