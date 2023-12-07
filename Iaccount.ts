import * as readlineSync from "readline-sync";
import { BankAccount, SavingsAccount, CurrentAccount } from "./bankservice";
import { accounts } from "./userdetails";

function deposit(account: BankAccount): any {
  console.log("Initial Balance: " + account.getBalance());
  console.log("Enter the amount to deposit: ");
  const depositAmount = parseFloat(readlineSync.prompt());
  if (!isNaN(depositAmount)) {
    account.deposit(depositAmount);
    console.log("Total Balance after deposit: " + account.getBalance());
  } else {
    console.log("Invalid deposit amount.");
  }
}

function withdraw(account: BankAccount): any {
  console.log("Enter the amount to withdraw: ");
  const withdrawAmount = parseFloat(readlineSync.prompt());
  if (!isNaN(withdrawAmount)) {
    const currentBalance = account.getBalance();

    if (withdrawAmount > currentBalance) {
      const overdraftLimit = 500;

      if (withdrawAmount - currentBalance <= overdraftLimit) {
        console.log("Using overdraft.");

        const overdraftAmount = withdrawAmount - currentBalance;
        account.deposit(-overdraftAmount);

        console.log("Total Balance after withdrawal (including overdraft): 0");
      } else {
        console.log(
          "Withdrawal amount exceeds overdraft limit. Transaction failed."
        );
      }
    } else {
      const withdrawalResult = account.withdraw(withdrawAmount);
      if (withdrawalResult) {
        console.log("Total Balance after withdrawal: " + account.getBalance());
      } else {
        console.log("Withdrawal failed.");
      }
    }
  } else {
    console.log("Invalid withdraw amount.");
  }
}

function accountOptions(account: BankAccount, action?: string): any {
  const validActions = ["deposit", "withdraw"];
  if (action && validActions.indexOf(action) !== -1) {
    if (action === "deposit") {
      deposit(account);
    } else if (action === "withdraw") {
      withdraw(account);
    }
  } else {
    console.log("Invalid action. Please choose a valid action.");
  }
}

function createAccount(): BankAccount | null {
  const accountType = getAccountType();
  const customerName = getCustomerName();
  const age = getValidAge();
  const email = getValidEmail();

  let account: BankAccount | null = null;
  if (accountType.toLowerCase() === "savings") {
    const location = getLocation();
    const state = getState();
    const country = getCountry();
    account = createSavingsAccount(
      customerName,
      age,
      location,
      state,
      country,
      email
    );
  } else if (accountType.toLowerCase() === "current") {
    const location = getLocation();
    const state = getState();
    const country = getCountry();
    account = createCurrentAccount(
      customerName,
      age,
      location,
      state,
      country,
      email
    );
  }
  if (account) {
    setupAccount(account);
    return account;
  }
  return null;
}

function getAccountType(): string {
  console.log("Select Account Type (Savings or Current): ");
  return readlineSync.prompt();
}

function getCustomerName(): string {
  console.log("Customer Name: ");
  return readlineSync.prompt();
}

function getValidAge(): number {
  let age: number;

  do {
    console.log("Age: ");
    const ageInput: string = readlineSync.prompt();
    age = parseInt(ageInput, 10);
    if (isNaN(age)) {
      console.log("Age must be a number. Please enter a valid age.");
    } else if (age > 68) {
      console.log("You are not eligible for account opening.");
      return NaN;
    }
  } while (isNaN(age));

  return age;
}
function getLocation(): string {
  console.log("Location: ");
  return readlineSync.prompt();
}

function getState(): string {
  console.log("State: ");
  return readlineSync.prompt();
}

function getCountry(): string {
  console.log("Country: ");
  return readlineSync.prompt();
}
function getValidEmail(): string {
  let email: string;

  do {
    console.log("Email ID: ");
    email = readlineSync.prompt();
    if (!isValidEmail(email)) {
      console.log(
        "Invalid email address format. Please enter a valid email address."
      );
    }
  } while (!isValidEmail(email));

  return email;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function createSavingsAccount(
  customerName: string,
  age: number,
  location: string,
  state: string,
  country: string,
  email: string
): SavingsAccount {
  const account = new SavingsAccount(
    customerName,
    age,
    location,
    state,
    country,
    email
  );
  account.deposit(500);
  return account;
}

function createCurrentAccount(
  customerName: string,
  age: number,
  location: string,
  state: string,
  country: string,
  email: string
): CurrentAccount {
  const account = new CurrentAccount(
    customerName,
    age,
    location,
    state,
    country,
    email
  );
  account.deposit(800);
  return account;
}

function setupAccount(account: BankAccount): void {
  account.generateAccountNumber(account.getAccountType().toLowerCase());
  console.log("Account created successfully!");
  console.log("Account Number is: " + account.getAccountNumber());

  accounts[account.getAccountNumber().toLowerCase()] = account;

  console.log("Enter action (deposit/withdraw): ");
  const action: string = readlineSync.prompt();
  accountOptions(account, action);
}

function showBalance(accountNumber: string): any {
  const trimmedAccountNumber = accountNumber.trim().toLowerCase();
  const account = accounts[trimmedAccountNumber];
  if (account) {
    console.log("Customer Name: " + account.getCustomerName());
    console.log("Email ID: " + account.getEmail());
    console.log("Type of Account: " + account.getAccountType());
    console.log("Account Number: " + account.getAccountNumber());
    console.log("Total Balance: " + account.getBalance());
  } else {
    console.log(
      "Account not found for account number: " + trimmedAccountNumber
    );
  }
}

function displayAccountDetails(accountNumber: string): any {
  const trimmedAccountNumber = accountNumber.trim().toLowerCase();
  const account = accounts[trimmedAccountNumber];
  if (account) {
    console.log("Customer Name: " + account.getCustomerName());
    console.log("Email ID: " + account.getEmail());
    console.log("Type of Account: " + account.getAccountType());
    console.log("Account Number: " + account.getAccountNumber());
    console.log("Total Balance: " + account.getBalance());
  } else {
    console.log(
      "Account not found for account number: " + trimmedAccountNumber
    );
  }
}

export {
  deposit,
  withdraw,
  accountOptions,
  createAccount,
  showBalance,
  displayAccountDetails,
  readlineSync,
};
