"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readlineSync = exports.accounts = exports.displayAccountDetails = exports.showBalance = exports.createAccount = exports.accountOptions = exports.withdraw = exports.deposit = void 0;
var interface_1 = require("./interface");
Object.defineProperty(exports, "deposit", { enumerable: true, get: function () { return interface_1.deposit; } });
Object.defineProperty(exports, "withdraw", { enumerable: true, get: function () { return interface_1.withdraw; } });
Object.defineProperty(exports, "accountOptions", { enumerable: true, get: function () { return interface_1.accountOptions; } });
Object.defineProperty(exports, "createAccount", { enumerable: true, get: function () { return interface_1.createAccount; } });
Object.defineProperty(exports, "showBalance", { enumerable: true, get: function () { return interface_1.showBalance; } });
Object.defineProperty(exports, "displayAccountDetails", { enumerable: true, get: function () { return interface_1.displayAccountDetails; } });
Object.defineProperty(exports, "readlineSync", { enumerable: true, get: function () { return interface_1.readlineSync; } });
// userdetails.ts
var accounts = {};
exports.accounts = accounts;
