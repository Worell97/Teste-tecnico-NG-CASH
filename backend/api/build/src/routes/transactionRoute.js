"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var transactionController_tsx_1 = require("../controllers/transactionController.tsx");
var transactionRouter = (0, express_promise_router_1.default)();
transactionRouter.post('/transaction', transactionController_tsx_1.createTransaction);
transactionRouter.get('/transactions/', transactionController_tsx_1.getTransactionsByAccount);
exports.default = transactionRouter;
