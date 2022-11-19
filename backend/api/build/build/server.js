"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = __importDefault(require("./src/app.js"));
var port = process.env.PORT || 5000;
app_js_1.default.listen(port, function () { console.log("Server started at http://localhost:", port); });
