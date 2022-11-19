"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var userController_js_1 = require("../controllers/userController.js");
var userRouter = (0, express_promise_router_1.default)();
userRouter.post('/signup', userController_js_1.createUser);
userRouter.post('/users/', userController_js_1.getAccountByName);
userRouter.post("/signin", userController_js_1.signin);
userRouter.get("/balance", userController_js_1.getBalanceByAccount);
exports.default = userRouter;
