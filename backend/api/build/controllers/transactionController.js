"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsOut = exports.getTransactionsIn = exports.getTransactionsByAccount = exports.createTransaction = void 0;
var database_js_1 = __importDefault(require("../config/database.js"));
var userController_js_1 = require("./userController.js");
var createTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client, _a, debtAccount, targetName, valueInCents, date, credAccount, currentBalance, queryText, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, database_js_1.default.connect()];
            case 1:
                client = _b.sent();
                _a = req.body, debtAccount = _a.debtAccount, targetName = _a.targetName, valueInCents = _a.valueInCents, date = _a.date;
                return [4 /*yield*/, (0, userController_js_1.getAccountByName)(targetName)];
            case 2:
                credAccount = _b.sent();
                return [4 /*yield*/, getCurrentBalance(debtAccount)];
            case 3:
                currentBalance = _b.sent();
                if (currentBalance < valueInCents) {
                    res.status(400).send({
                        message: "Saldo insuficiente."
                    });
                    return [2 /*return*/];
                }
                ;
                if (debtAccount == credAccount) {
                    res.status(409).send({
                        message: "Conta de origem e destino não podem ser iguais"
                    });
                    return [2 /*return*/];
                }
                ;
                if (!(credAccount > 0)) {
                    res.status(404).send({
                        message: "Conta do destinatário informado não foi encontrada."
                    });
                    return [2 /*return*/];
                }
                ;
                return [4 /*yield*/, client.query('BEGIN')];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _b.trys.push([5, 8, 10, 11]);
                queryText = "INSERT INTO transactions (debitedAccount, creditedAccount, value, createdAt) VALUES ($1, $2, $3, $4) RETURNING id";
                return [4 /*yield*/, client.query(queryText, [debtAccount, credAccount, valueInCents, date.date])];
            case 6:
                result = _b.sent();
                updateBalance(debtAccount, credAccount, valueInCents, client);
                return [4 /*yield*/, client.query('COMMIT')];
            case 7:
                _b.sent();
                res.status(201).send({
                    message: "Transaction success",
                    body: {
                        transactionId: result.rows[0].id
                    }
                });
                return [3 /*break*/, 11];
            case 8:
                error_1 = _b.sent();
                return [4 /*yield*/, client.query('ROLLBACK')];
            case 9:
                _b.sent();
                throw error_1;
            case 10:
                client.release();
                return [7 /*endfinally*/];
            case 11:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.createTransaction = createTransaction;
function createWhere(accountId, entradas, saidas, data) {
    var where = ' WHERE true';
    console.log(accountId, entradas, saidas, data);
    if (data && data != '') {
        where = where + " AND t.createdat = '".concat(data, "'");
        console.log(where);
    }
    ;
    console.log(entradas && saidas);
    if (saidas && entradas) {
        where = where + " AND (t.creditedaccount = ".concat(accountId, " OR t.debitedaccount = ").concat(accountId, ")");
        console.log(where);
    }
    else if (entradas) {
        where = where + " AND t.creditedaccount = ".concat(accountId);
        console.log(where);
    }
    else if (saidas) {
        where = where + " AND t.debitedaccount = ".concat(accountId);
        console.log(where);
    }
    return where;
}
;
var getTransactionsByAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(req, res);
        return [2 /*return*/];
    });
}); };
exports.getTransactionsByAccount = getTransactionsByAccount;
var getTransactionsIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client, accountId, queryText, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_js_1.default.connect()];
            case 1:
                client = _a.sent();
                accountId = req.body.accountId;
                return [4 /*yield*/, (0, userController_js_1.getAccountByName)(accountId)];
            case 2:
                if ((_a.sent()) != 0) {
                    res.status(404).send({
                        message: "Account not found"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, client.query('BEGIN')];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 7, 9, 10]);
                queryText = "SELECT * FROM transactions WHERE creditedAccount = ".concat(accountId) //${date && ' AND createdAt = ' + date}`;
                ;
                return [4 /*yield*/, client.query(queryText)];
            case 5:
                result = _a.sent();
                return [4 /*yield*/, client.query('COMMIT')];
            case 6:
                _a.sent();
                res.status(200).send({
                    body: {
                        data: result.rows
                    }
                });
                return [3 /*break*/, 10];
            case 7:
                error_2 = _a.sent();
                return [4 /*yield*/, client.query('ROLLBACK')];
            case 8:
                _a.sent();
                throw error_2;
            case 9:
                client.release();
                return [7 /*endfinally*/];
            case 10:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.getTransactionsIn = getTransactionsIn;
var getTransactionsOut = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client, _a, accountId, date, queryText, result, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, database_js_1.default.connect()];
            case 1:
                client = _b.sent();
                _a = req.body, accountId = _a.accountId, date = _a.date;
                return [4 /*yield*/, (0, userController_js_1.getAccountByName)(accountId)];
            case 2:
                if ((_b.sent()) != 0) {
                    res.status(404).send({
                        message: "Account not found"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, client.query('BEGIN')];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _b.trys.push([4, 7, 9, 10]);
                queryText = "SELECT * FROM transactions WHERE debitedAccount = ".concat(accountId, " ").concat(date && ' AND createdAt = ' + date);
                return [4 /*yield*/, client.query(queryText)];
            case 5:
                result = _b.sent();
                return [4 /*yield*/, client.query('COMMIT')];
            case 6:
                _b.sent();
                res.status(200).send({
                    body: {
                        data: result.rows
                    }
                });
                return [3 /*break*/, 10];
            case 7:
                error_3 = _b.sent();
                return [4 /*yield*/, client.query('ROLLBACK')];
            case 8:
                _b.sent();
                throw error_3;
            case 9:
                client.release();
                return [7 /*endfinally*/];
            case 10:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.getTransactionsOut = getTransactionsOut;
function getCurrentBalance(accountId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, queryText, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!accountId)
                        return [2 /*return*/];
                    return [4 /*yield*/, database_js_1.default.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 6]);
                    queryText = "SELECT \n                balance FROM accounts WHERE \n                    id = ".concat(accountId);
                    return [4 /*yield*/, client.query(queryText)];
                case 3:
                    result = _a.sent();
                    if (result.rows.length > 0) {
                        return [2 /*return*/, result.rows[0].balance];
                    }
                    else {
                        return [2 /*return*/, 0];
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_4 = _a.sent();
                    throw error_4;
                case 5:
                    client.release();
                    return [7 /*endfinally*/];
                case 6:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
function updateBalance(origin, destination, value, client) {
    return __awaiter(this, void 0, void 0, function () {
        var currentBalanceOrigin, currentBalanceDestination, newBalanceOrigin, newBalanceDestination;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!origin)
                        return [2 /*return*/];
                    if (!destination)
                        return [2 /*return*/];
                    if (!value)
                        return [2 /*return*/];
                    return [4 /*yield*/, getCurrentBalance(origin)];
                case 1:
                    currentBalanceOrigin = _a.sent();
                    return [4 /*yield*/, getCurrentBalance(destination)];
                case 2:
                    currentBalanceDestination = _a.sent();
                    newBalanceOrigin = currentBalanceOrigin - value;
                    newBalanceDestination = currentBalanceDestination + value;
                    console.log(currentBalanceOrigin, currentBalanceDestination, newBalanceOrigin, newBalanceDestination);
                    return [4 /*yield*/, client.query("UPDATE accounts set balance = ".concat(newBalanceOrigin, " WHERE id = ").concat(origin))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, client.query("UPDATE accounts set balance = ".concat(newBalanceDestination, " WHERE id = ").concat(destination))];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
;
