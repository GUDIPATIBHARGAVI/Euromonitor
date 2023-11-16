import * as readlineSync from "readline-sync";
import {
  deposit,
  accountOptions,
  createAccount,
  showBalance,
  displayAccountDetails,
} from "./interface";

const accounts = {};

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
function processOptions(option: number): void {
  const optionHandlers: Record<number, () => void> = {
    1: handleCreateAccount,
    2: () => handleTransaction("deposit"),
    3: () => handleTransaction("withdraw"),
    4: handleBalanceDisplay,
    5: handleDetailsDisplay,
    6: () => {
      console.log("Exiting application. Thank you !");
      process.exit(0);
    },
  };

  const handler = optionHandlers[option];
  if (handler) {
    handler();
  } else {
    console.log("Invalid option. Please choose a valid option.");
  }
}

function handleCreateAccount(): void {
  const createdAccount = createAccount();
  if (createdAccount) {
    accounts[createdAccount.getAccountNumber().toLowerCase()] = createdAccount;
  }
}

function handleTransaction(action: string): void {
  console.log(`Enter the account number to ${action}:`);
  const accountNumber: string = readlineSync.prompt();
  const account = accounts[accountNumber.trim().toLowerCase()];

  if (account) {
    accountOptions(account, action);
  } else {
    console.log(`Account not found for account number: ${accountNumber}`);
  }
}

function handleBalanceDisplay(): void {
  console.log("Enter the account number to show balance:");
  const accountNumber: string = readlineSync.prompt();
  showBalance(accountNumber);
}

function handleDetailsDisplay(): void {
  console.log("Enter the account number to display details:");
  const accountNumber: string = readlineSync.prompt();
  displayAccountDetails(accountNumber);
}

function main() {
  welcomeMessage();

  let option;

  do {
    displayOptions();
    option = parseInt(readlineSync.prompt(), 10);

    if (option < 1 || option > 6) {
      console.log("Invalid option. Please choose a valid option.");
    } else {
      processOptions(option);
    }
  } while (option !== 6);
}

main();
