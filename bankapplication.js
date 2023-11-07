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
function isValidEmail(email) {
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}
var BankAccount = /** @class */ (function () {
    function BankAccount(customerName, age, location, state, country, email, accountType) {
        this.customerName = customerName;
        this.age = age;
        this.location = location;
        this.state = state;
        this.country = country;
        this.balance = 0; // Initialize balance to zero
        if (!isValidEmail(email)) {
            throw new Error("Invalid email address format.");
        }
        this.email = email;
        this.accountType = accountType;
    }
    BankAccount.prototype.generateAccountNumber = function () {
        var prefix = this.accountType === "Savings" ? "Sav" : "Curr";
        var random = Math.floor(Math.random() * 1000000);
        this.accountNumber = "".concat(prefix).concat(String(random).padStart(6, "0"));
    };
    BankAccount.prototype.getAccountNumber = function () {
        return this.accountNumber;
    };
    BankAccount.prototype.getAccountType = function () {
        return this.accountType;
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
        if (amount > 0) {
            this.balance += amount;
            console.log("Deposit successful. New balance: ".concat(this.balance));
        }
        else {
            console.log("Invalid deposit amount.");
        }
    };
    BankAccount.prototype.withdraw = function (amount) {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            console.log("Withdrawal successful. New balance: ".concat(this.balance));
            return true;
        }
        else if (this.balance + this.getOverdraftLimit() >= amount) {
            this.balance -= amount;
            console.log("Withdrawal successful using overdraft. New balance: ".concat(this.balance));
            return true;
        }
        else {
            console.log("Withdrawal failed. Insufficient balance.");
            return false;
        }
    };
    BankAccount.prototype.getOverdraftLimit = function () {
        return 0; // Default overdraft limit is 0
    };
    return BankAccount;
}());
var SavingsAccount = /** @class */ (function (_super) {
    __extends(SavingsAccount, _super);
    function SavingsAccount(customerName, age, location, state, country, email) {
        var _this = _super.call(this, customerName, age, location, state, country, email, "Savings") || this;
        _this.generateAccountNumber();
        _this.balance = 500; // Set the initial balance for Savings accounts to $500
        return _this;
    }
    return SavingsAccount;
}(BankAccount));
var CurrentAccount = /** @class */ (function (_super) {
    __extends(CurrentAccount, _super);
    function CurrentAccount(customerName, age, location, state, country, email) {
        var _this = _super.call(this, customerName, age, location, state, country, email, "Current") || this;
        _this.generateAccountNumber();
        _this.balance = 800; // Set the initial balance for Current accounts to $800
        return _this;
    }
    CurrentAccount.prototype.getOverdraftLimit = function () {
        return 1000; // Example overdraft limit for Current accounts
    };
    return CurrentAccount;
}(BankAccount));
var accounts = {};
function depositOrWithdraw(account) {
    var readlineSync = require("readline-sync");
    console.log("Select an action:");
    console.log("1. Deposit");
    console.log("2. Withdraw");
    var actionChoice = parseInt(readlineSync.prompt(), 10);
    switch (actionChoice) {
        case 1:
            console.log("Enter the amount to deposit: ");
            var depositAmount = parseFloat(readlineSync.prompt());
            if (!isNaN(depositAmount)) {
                account.deposit(depositAmount);
            }
            else {
                console.log("Invalid deposit amount.");
            }
            break;
        case 2:
            console.log("Enter the amount to withdraw: ");
            var withdrawAmount = parseFloat(readlineSync.prompt());
            if (!isNaN(withdrawAmount)) {
                var withdrawalResult = account.withdraw(withdrawAmount);
                if (!withdrawalResult) {
                    console.log("Withdrawal failed.");
                }
            }
            else {
                console.log("Invalid withdraw amount.");
            }
            break;
        default:
            console.log("Invalid action. Please choose a valid action.");
    }
}
function accountOptions(account) {
    var readlineSync = require("readline-sync");
    console.log("Select an option:");
    console.log("1. Deposit or Withdraw");
    console.log("2. Check Balance");
    var optionChoice = parseInt(readlineSync.prompt(), 10);
    switch (optionChoice) {
        case 1:
            depositOrWithdraw(account);
            break;
        case 2:
            console.log("Account Number: " + account.getAccountNumber());
            console.log("Customer Name: " + account.getCustomerName());
            console.log("Email ID: " + account.getEmail());
            console.log("Type of Account: " + account.getAccountType());
            console.log("Total Balance: " + account.getBalance());
            break;
        default:
            console.log("Invalid option. Please choose a valid option.");
    }
}
function createAccount() {
    var readlineSync = require("readline-sync");
    console.log("Select Account Type (Savings or Current): ");
    var accountType = readlineSync.prompt();
    console.log("Customer Name: ");
    var customerName = readlineSync.prompt();
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
            return;
        }
    } while (isNaN(age));
    console.log("Location: ");
    var location = readlineSync.prompt();
    console.log("State: ");
    var state = readlineSync.prompt();
    console.log("Country: ");
    var country = readlineSync.prompt();
    console.log("Email ID: ");
    var email = readlineSync.prompt();
    if (!isValidEmail(email)) {
        console.log("Invalid email address format. Please enter a valid email address.");
        return;
    }
    var account = null;
    if (accountType.toLowerCase() === "savings") {
        account = new SavingsAccount(customerName, age, location, state, country, email);
    }
    else if (accountType.toLowerCase() === "current") {
        account = new CurrentAccount(customerName, age, location, state, country, email);
    }
    if (account) {
        account.generateAccountNumber();
        console.log("Account created successfully!");
        console.log("Account Number is : " + account.getAccountNumber());
        accountOptions(account);
        accounts[account.getAccountNumber()] = account;
    }
}
function showBalance() {
    var readlineSync = require("readline-sync");
    console.log("Enter the name to check Balance: ");
    var nameToCheck = readlineSync.prompt();
    for (var accountNumber in accounts) {
        var account = accounts[accountNumber];
        if (account.getCustomerName().toLowerCase() === nameToCheck.toLowerCase()) {
            console.log("Customer Name: " + account.getCustomerName());
            console.log("Email ID: " + account.getEmail());
            console.log("Type of Account: " + account.getAccountType());
            console.log("Account Number: " + account.getAccountNumber());
            console.log("Total Balance: " + account.getBalance());
            return;
        }
    }
    console.log("Account not found for " + nameToCheck);
}
function displayAccountDetails() {
    var readlineSync = require("readline-sync");
    console.log("Enter the account number to display details: ");
    var accountNumber = readlineSync.prompt();
    // Trim any leading or trailing spaces from the input
    var trimmedAccountNumber = accountNumber.trim();
    var account = accounts[trimmedAccountNumber];
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
var readlineSync = require("readline-sync");
while (true) {
    console.log("Options:");
    console.log("1. Create New Account");
    console.log("2. Show Balance");
    console.log("3. Display Account Details");
    console.log("4. Exit");
    var choice = parseInt(readlineSync.prompt(), 10);
    switch (choice) {
        case 1:
            createAccount();
            break;
        case 2:
            showBalance();
            break;
        case 3:
            displayAccountDetails();
            break;
        case 4:
            console.log("Goodbye!");
            process.exit(0);
        default:
            console.log("Invalid option. Please choose a valid option.");
    }
}
