"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.encrypt = exports.getToken = void 0;
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config = process.env;
var getToken = function (user) {
    return jsonwebtoken_1.default.sign({
        user: user
    }, config.JWT_SECRET, {
        expiresIn: '24h'
    });
};
exports.getToken = getToken;
var encrypt = function (password) {
    var salt = generateSalt(16);
    var passwordAndSalt = sha512(password, salt);
    return passwordAndSalt;
};
exports.encrypt = encrypt;
function sha512(password, salt) {
    var hash = crypto_1.default.createHmac('sha512', salt);
    hash.update(password);
    var hash = hash.digest('hex');
    return {
        salt: salt,
        hash: hash,
    };
}
function generateSalt(length) {
    return crypto_1.default.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0.16);
}
function login(password, saltOnBank, hashOnBank) {
    var passwordESalt = sha512(password, saltOnBank);
    return hashOnBank === passwordESalt.hash;
}
exports.login = login;
