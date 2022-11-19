"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/api', function (req, res) {
    res.status(200).send({
        success: 'true',
        message: 'Api Node.js + Postgre',
        version: '1.0.0',
    });
});
exports.default = router;
