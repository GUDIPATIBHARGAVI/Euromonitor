import { BankAccount } from "./bankservice";

import {
  deposit,
  withdraw,
  accountOptions,
  createAccount,
  showBalance,
  displayAccountDetails,
  readlineSync,
} from "./interface";

const accounts: Record<string, BankAccount> = {};

export {
  deposit,
  withdraw,
  accountOptions,
  createAccount,
  showBalance,
  displayAccountDetails,
  accounts,
  readlineSync,
};
