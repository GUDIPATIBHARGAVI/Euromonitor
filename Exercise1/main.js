"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// main.mjs
var readlineSync = require("readline-sync");
var interface_1 = require("./interface");
var accounts = {};
function welcomeMessage() {
    console.log("Welcome to our bank application");
}
function displayOptions() {
    console.log("Enter your Options:");
    console.log("1. Create New Account");
    console.log("2. Deposit");
    console.log("3. Withdraw");
    console.log("4. Show Balance");
    console.log("5. Display Account Details");
    console.log("6. Exit");
}
function processOptions(option) {
    var optionHandlers = {
        1: handleCreateAccount,
        2: function () { return handleTransaction("deposit"); },
        3: function () { return handleTransaction("withdraw"); },
        4: handleBalanceDisplay,
        5: handleDetailsDisplay,
        6: function () {
            console.log("Exiting application. Thank you !");
            process.exit(0);
        },
    };
    var handler = optionHandlers[option];
    if (handler) {
        handler();
    }
    else {
        console.log("Invalid option. Please choose a valid option.");
    }
}
function handleCreateAccount() {
    var createdAccount = (0, interface_1.createAccount)();
    if (createdAccount) {
        accounts[createdAccount.getAccountNumber().toLowerCase()] = createdAccount;
    }
}
function handleTransaction(action) {
    console.log("Enter the account number to ".concat(action, ":"));
    var accountNumber = readlineSync.prompt();
    var account = accounts[accountNumber.trim().toLowerCase()];
    if (account) {
        (0, interface_1.accountOptions)(account, action);
    }
    else {
        console.log("Account not found for account number: ".concat(accountNumber));
    }
}
function handleBalanceDisplay() {
    console.log("Enter the account number to show balance:");
    var accountNumber = readlineSync.prompt();
    (0, interface_1.showBalance)(accountNumber);
}
function handleDetailsDisplay() {
    console.log("Enter the account number to display details:");
    var accountNumber = readlineSync.prompt();
    (0, interface_1.displayAccountDetails)(accountNumber);
}
function main() {
    welcomeMessage();
    var option;
    do {
        displayOptions();
        option = parseInt(readlineSync.prompt(), 10);
        if (option < 1 || option > 6) {
            console.log("Invalid option. Please choose a valid option.");
        }
        else {
            processOptions(option);
        }
    } while (option !== 6);
}
main();
