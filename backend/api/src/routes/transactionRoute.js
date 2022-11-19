import PromiseRouter from "express-promise-router";
import { createTransaction, getTransactionsByAccount } from "../controllers/transactionController.js";


const transactionRouter = PromiseRouter();

transactionRouter.post('/transaction', createTransaction);

transactionRouter.get('/transactions/', getTransactionsByAccount);


export default transactionRouter;