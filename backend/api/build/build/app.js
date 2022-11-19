"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var index_js_1 = __importDefault(require("./routes/index.js"));
var userRouter_js_1 = __importDefault(require("./routes/userRouter.js"));
var transactionRoute_js_1 = __importDefault(require("./routes/transactionRoute.js"));
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.json({ type: 'application/vnd.api+json' }));
app.use((0, cors_1.default)());
app.use(index_js_1.default);
app.use('/api/', userRouter_js_1.default);
app.use('/api/', transactionRoute_js_1.default);
exports.default = app;
