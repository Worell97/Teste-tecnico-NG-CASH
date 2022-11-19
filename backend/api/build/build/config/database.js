"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("pg"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var pool = new pg_1.default.Pool({
    connectionString: process.env.DATABASE_URL
});
exports.default = pool;
