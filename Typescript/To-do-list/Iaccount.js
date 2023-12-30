"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readlineSync = exports.displayAccountDetails = exports.showBalance = exports.createAccount = exports.accountOptions = exports.withdraw = exports.deposit = void 0;
var readlineSync = require("readline-sync");
exports.readlineSync = readlineSync;
var bankservice_1 = require("./bankservice");
var userdetails_1 = require("./userdetails");
function deposit(account) {
    console.log("Initial Balance: " + account.getBalance());
    console.log("Enter the amount to deposit: ");
    var depositAmount = parseFloat(readlineSync.prompt());
    if (!isNaN(depositAmount)) {
        account.deposit(depositAmount);
        console.log("Total Balance after deposit: " + account.getBalance());
    }
    else {
        console.log("Invalid deposit amount.");
    }
}
exports.deposit = deposit;
function withdraw(account) {
    console.log("Enter the amount to withdraw: ");
    var withdrawAmount = parseFloat(readlineSync.prompt());
    if (!isNaN(withdrawAmount)) {
        var currentBalance = account.getBalance();
        if (withdrawAmount > currentBalance) {
            var overdraftLimit = 500;
            if (withdrawAmount - currentBalance <= overdraftLimit) {
                console.log("Using overdraft.");
                var overdraftAmount = withdrawAmount - currentBalance;
                account.deposit(-overdraftAmount);
                console.log("Total Balance after withdrawal (including overdraft): 0");
            }
            else {
                console.log("Withdrawal amount exceeds overdraft limit. Transaction failed.");
            }
        }
        else {
            var withdrawalResult = account.withdraw(withdrawAmount);
            if (withdrawalResult) {
                console.log("Total Balance after withdrawal: " + account.getBalance());
            }
            else {
                console.log("Withdrawal failed.");
            }
        }
    }
    else {
        console.log("Invalid withdraw amount.");
    }
}
exports.withdraw = withdraw;
function accountOptions(account, action) {
    var validActions = ["deposit", "withdraw"];
    if (action && validActions.indexOf(action) !== -1) {
        if (action === "deposit") {
            deposit(account);
        }
        else if (action === "withdraw") {
            withdraw(account);
        }
    }
    else {
        console.log("Invalid action. Please choose a valid action.");
    }
}
exports.accountOptions = accountOptions;
function createAccount() {
    var accountType = getAccountType();
    var customerName = getCustomerName();
    var age = getValidAge();
    var email = getValidEmail();
    var account = null;
    if (accountType.toLowerCase() === "savings") {
        var location_1 = getLocation();
        var state = getState();
        var country = getCountry();
        account = createSavingsAccount(customerName, age, location_1, state, country, email);
    }
    else if (accountType.toLowerCase() === "current") {
        var location_2 = getLocation();
        var state = getState();
        var country = getCountry();
        account = createCurrentAccount(customerName, age, location_2, state, country, email);
    }
    if (account) {
        setupAccount(account);
        return account;
    }
    return null;
}
exports.createAccount = createAccount;
function getAccountType() {
    console.log("Select Account Type (Savings or Current): ");
    return readlineSync.prompt();
}
function getCustomerName() {
    console.log("Customer Name: ");
    return readlineSync.prompt();
}
function getValidAge() {
    var age;
    do {
        console.log("Age: ");
        var ageInput = readlineSync.prompt();
        age = parseInt(ageInput, 10);
        if (isNaN(age)) {
            console.log("Age must be a number. Please enter a valid age.");
        }
        else if (age > 68) {
            console.log("You are not eligible for account opening.");
            return NaN;
        }
    } while (isNaN(age));
    return age;
}
function getLocation() {
    console.log("Location: ");
    return readlineSync.prompt();
}
function getState() {
    console.log("State: ");
    return readlineSync.prompt();
}
function getCountry() {
    console.log("Country: ");
    return readlineSync.prompt();
}
function getValidEmail() {
    var email;
    do {
        console.log("Email ID: ");
        email = readlineSync.prompt();
        if (!isValidEmail(email)) {
            console.log("Invalid email address format. Please enter a valid email address.");
        }
    } while (!isValidEmail(email));
    return email;
}
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function createSavingsAccount(customerName, age, location, state, country, email) {
    var account = new bankservice_1.SavingsAccount(customerName, age, location, state, country, email);
    account.deposit(500);
    return account;
}
function createCurrentAccount(customerName, age, location, state, country, email) {
    var account = new bankservice_1.CurrentAccount(customerName, age, location, state, country, email);
    account.deposit(800);
    return account;
}
function setupAccount(account) {
    account.generateAccountNumber(account.getAccountType().toLowerCase());
    console.log("Account created successfully!");
    console.log("Account Number is: " + account.getAccountNumber());
    userdetails_1.accounts[account.getAccountNumber().toLowerCase()] = account;
    console.log("Enter action (deposit/withdraw): ");
    var action = readlineSync.prompt();
    accountOptions(account, action);
}
function showBalance(accountNumber) {
    var trimmedAccountNumber = accountNumber.trim().toLowerCase();
    var account = userdetails_1.accounts[trimmedAccountNumber];
    if (account) {
        console.log("Customer Name: " + account.getCustomerName());
        console.log("Email ID: " + account.getEmail());
        console.log("Type of Account: " + account.getAccountType());
        console.log("Account Number: " + account.getAccountNumber());
        console.log("Total Balance: " + account.getBalance());
    }
    else {
        console.log("Account not found for account number: " + trimmedAccountNumber);
    }
}
exports.showBalance = showBalance;
function displayAccountDetails(accountNumber) {
    var trimmedAccountNumber = accountNumber.trim().toLowerCase();
    var account = userdetails_1.accounts[trimmedAccountNumber];
    if (account) {
        console.log("Customer Name: " + account.getCustomerName());
        console.log("Email ID: " + account.getEmail());
        console.log("Type of Account: " + account.getAccountType());
        console.log("Account Number: " + account.getAccountNumber());
        console.log("Total Balance: " + account.getBalance());
    }
    else {
        console.log("Account not found for account number: " + trimmedAccountNumber);
    }
}
exports.displayAccountDetails = displayAccountDetails;
