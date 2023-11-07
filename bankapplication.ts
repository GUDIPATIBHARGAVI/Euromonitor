function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

class BankAccount {
  private customerName: string;
  private age: number;
  private location: string;
  private state: string;
  private country: string;
  private email: string;
  private accountType: string;
  private accountNumber: string;
  protected balance: number;

  constructor(
    customerName: string,
    age: number,
    location: string,
    state: string,
    country: string,
    email: string,
    accountType: string
  ) {
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

  generateAccountNumber(): void {
    const prefix = this.accountType === "Savings" ? "Sav" : "Curr";
    const random = Math.floor(Math.random() * 1000000);
    this.accountNumber = `${prefix}${String(random).padStart(6, "0")}`;
  }

  getAccountNumber(): string {
    return this.accountNumber;
  }

  getAccountType(): string {
    return this.accountType;
  }

  getCustomerName(): string {
    return this.customerName;
  }

  getEmail(): string {
    return this.email;
  }

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposit successful. New balance: ${this.balance}`);
    } else {
      console.log("Invalid deposit amount.");
    }
  }

  withdraw(amount: number): boolean {
    if (amount > 0 && this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrawal successful. New balance: ${this.balance}`);
      return true;
    } else if (this.balance + this.getOverdraftLimit() >= amount) {
      this.balance -= amount;
      console.log(
        `Withdrawal successful using overdraft. New balance: ${this.balance}`
      );
      return true;
    } else {
      console.log("you cannot withdraw the amount due to insufficient balance");
      return false;
    }
  }

  getOverdraftLimit(): number {
    return 0; // Default overdraft limit is 0
  }
}

class SavingsAccount extends BankAccount {
  constructor(
    customerName: string,
    age: number,
    location: string,
    state: string,
    country: string,
    email: string
  ) {
    super(customerName, age, location, state, country, email, "Savings");
    this.generateAccountNumber();
    this.balance = 500;
  }
}

class CurrentAccount extends BankAccount {
  constructor(
    customerName: string,
    age: number,
    location: string,
    state: string,
    country: string,
    email: string
  ) {
    super(customerName, age, location, state, country, email, "Current");
    this.generateAccountNumber();
    this.balance = 800;
  }

  getOverdraftLimit(): number {
    return 1000;
  }
}

const accounts: Record<string, BankAccount> = {};

function depositOrWithdraw(account: BankAccount): void {
  const readlineSync = require("readline-sync");
  console.log("Select an action:");
  console.log("1. Deposit");
  console.log("2. Withdraw");
  const actionChoice: number = parseInt(readlineSync.prompt(), 10);

  switch (actionChoice) {
    case 1:
      console.log("Enter the amount to deposit: ");
      const depositAmount: number = parseFloat(readlineSync.prompt());
      if (!isNaN(depositAmount)) {
        account.deposit(depositAmount);
      } else {
        console.log("Invalid deposit amount.");
      }
      break;
    case 2:
      console.log("Enter the amount to withdraw: ");
      const withdrawAmount: number = parseFloat(readlineSync.prompt());
      if (!isNaN(withdrawAmount)) {
        const withdrawalResult = account.withdraw(withdrawAmount);
        if (!withdrawalResult) {
          console.log("Withdrawal failed.");
        }
      } else {
        console.log("Invalid withdraw amount.");
      }
      break;
    default:
      console.log("Invalid action. Please choose a valid action.");
  }
}

function accountOptions(account: BankAccount): void {
  const readlineSync = require("readline-sync");
  console.log("Select an option:");
  console.log("1. Deposit or Withdraw");
  console.log("2. Check Balance");
  const optionChoice: number = parseInt(readlineSync.prompt(), 10);

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

function createAccount(): void {
  const readlineSync = require("readline-sync");
  console.log("Select Account Type (Savings or Current): ");
  const accountType: string = readlineSync.prompt();
  console.log("Customer Name: ");
  const customerName: string = readlineSync.prompt();
  let age: number;

  do {
    console.log("Age: ");
    const ageInput: string = readlineSync.prompt();
    age = parseInt(ageInput, 10);
    if (isNaN(age)) {
      console.log("Age must be a number. Please enter a valid age.");
    } else if (age > 68) {
      console.log("You are not eligible for account opening.");
      return;
    }
  } while (isNaN(age));

  console.log("Location: ");
  const location: string = readlineSync.prompt();
  console.log("State: ");
  const state: string = readlineSync.prompt();
  console.log("Country: ");
  const country: string = readlineSync.prompt();
  console.log("Email ID: ");
  const email: string = readlineSync.prompt();

  if (!isValidEmail(email)) {
    console.log(
      "Invalid email address format. Please enter a valid email address."
    );
    return;
  }

  let account: BankAccount | null = null;
  if (accountType.toLowerCase() === "savings") {
    account = new SavingsAccount(
      customerName,
      age,
      location,
      state,
      country,
      email
    );
  } else if (accountType.toLowerCase() === "current") {
    account = new CurrentAccount(
      customerName,
      age,
      location,
      state,
      country,
      email
    );
  }

  if (account) {
    account.generateAccountNumber();
    console.log("Account created successfully!");
    console.log("Account Number is : " + account.getAccountNumber());

    accountOptions(account);
    accounts[account.getAccountNumber()] = account;
  }
}

function showBalance(): void {
  const readlineSync = require("readline-sync");
  console.log("Enter the name to check Balance: ");
  const nameToCheck: string = readlineSync.prompt();

  for (const accountNumber in accounts) {
    const account = accounts[accountNumber];
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

function displayAccountDetails(): void {
  const readlineSync = require("readline-sync");
  console.log("Enter the account number to display details: ");
  const accountNumber: string = readlineSync.prompt();

  const trimmedAccountNumber = accountNumber.trim();

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

const readlineSync = require("readline-sync");

while (true) {
  console.log("Enter your Options: welcome to our bank application");
  console.log("1. Create New Account");
  console.log("2. Show Balance");
  console.log("3. Display Account Details");
  console.log("4. Exit");

  const choice: number = parseInt(readlineSync.prompt(), 10);

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
