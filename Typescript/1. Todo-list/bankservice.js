"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAccount = exports.SavingsAccount = exports.BankAccount = void 0;
var BankAccount = /** @class */ (function () {
    function BankAccount(customerName, age, location, state, country, email) {
        this.accountNumber = "";
        this.balance = 0;
        this.customerName = customerName;
        this.age = age;
        this.location = location;
        this.state = state;
        this.country = country;
        this.email = email;
    }
    BankAccount.prototype.setAccountNumber = function (accountNumber) {
        this.accountNumber = accountNumber;
    };
    BankAccount.prototype.generateAccountNumber = function (accountTypePrefix) {
        var uniqueId = Math.floor(Math.random() * 10000);
        this.setAccountNumber("".concat(accountTypePrefix).concat(uniqueId));
    };
    BankAccount.prototype.getAccountNumber = function () {
        return this.accountNumber;
    };
    BankAccount.prototype.getCustomerName = function () {
        return this.customerName;
    };
    BankAccount.prototype.getEmail = function () {
        return this.email;
    };
    BankAccount.prototype.getBalance = function () {
        return this.balance;
    };
    BankAccount.prototype.deposit = function (amount) {
        this.balance += amount;
        console.log("Balance: ".concat(amount));
    };
    BankAccount.prototype.withdraw = function (amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log("Withdrawn: ".concat(amount));
            return true;
        }
        else {
            console.log("Insufficient balance");
            return false;
        }
    };
    BankAccount.prototype.getAccountType = function () {
        return "Base Account";
    };
    return BankAccount;
}());
exports.BankAccount = BankAccount;
var SavingsAccount = /** @class */ (function (_super) {
    __extends(SavingsAccount, _super);
    function SavingsAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SavingsAccount.prototype.generateAccountNumber = function () {
        var accountTypePrefix = "sav";
        _super.prototype.generateAccountNumber.call(this, accountTypePrefix);
    };
    SavingsAccount.prototype.getAccountType = function () {
        return "Savings Account";
    };
    return SavingsAccount;
}(BankAccount));
exports.SavingsAccount = SavingsAccount;
var CurrentAccount = /** @class */ (function (_super) {
    __extends(CurrentAccount, _super);
    function CurrentAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CurrentAccount.prototype.generateAccountNumber = function () {
        var accountTypePrefix = "curr";
        _super.prototype.generateAccountNumber.call(this, accountTypePrefix);
    };
    CurrentAccount.prototype.getAccountType = function () {
        return "Current Account";
    };
    return CurrentAccount;
}(BankAccount));
exports.CurrentAccount = CurrentAccount;
