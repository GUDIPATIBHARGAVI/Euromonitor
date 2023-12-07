class BankAccount {
  private accountNumber: string = "";
  private customerName: string;
  private age: number;
  private location: string;
  private state: string;
  private country: string;
  private email: string;
  private balance: number = 0;

  constructor(
    customerName: string,
    age: number,
    location: string,
    state: string,
    country: string,
    email: string
  ) {
    this.customerName = customerName;
    this.age = age;
    this.location = location;
    this.state = state;
    this.country = country;
    this.email = email;
  }

  setAccountNumber(accountNumber: string): void {
    this.accountNumber = accountNumber;
  }

  generateAccountNumber(accountTypePrefix: string): void {
    const uniqueId = Math.floor(Math.random() * 10000);
    this.setAccountNumber(`${accountTypePrefix}${uniqueId}`);
  }

  getAccountNumber(): string {
    return this.accountNumber;
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
    this.balance += amount;
    console.log(`Balance: ${amount}`);
  }

  withdraw(amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrawn: ${amount}`);
      return true;
    } else {
      console.log("Insufficient balance");
      return false;
    }
  }

  getAccountType(): string {
    return "Base Account";
  }
}

class SavingsAccount extends BankAccount {
  generateAccountNumber(): void {
    const accountTypePrefix = "sav";
    super.generateAccountNumber(accountTypePrefix);
  }

  getAccountType(): string {
    return "Savings Account";
  }
}

class CurrentAccount extends BankAccount {
  generateAccountNumber(): void {
    const accountTypePrefix = "curr";
    super.generateAccountNumber(accountTypePrefix);
  }

  getAccountType(): string {
    return "Current Account";
  }
}

export { BankAccount, SavingsAccount, CurrentAccount };
