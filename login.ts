// Users should be able to create an account by providing a unique username and password.
// The system should check for existing usernames to ensure uniqueness.
// User Login:
// Users should be able to log in using their username and password.
// After two consecutive failed login attempts, the user's account should be locked for a duration of 2 minutes.
// During the lock period, any login attempts should result in an error message indicating the remaining lock time.
// Account Unlocking:
// After the 2-minute lock period, the user's account should automatically unlock.
// Optionally, provide a manual account unlocking mechanism if needed.

const readlineSync = require("readline-sync");
import { User } from "./Iuser";
class login {
  private users: User[] = [];

  public register(): void {
    const username: string = readlineSync.question("enter username: ");
    const password: string = readlineSync.question("enter password: ");
    if (!username || !password) {
      console.error("invalid input. both username and passowrd are required");
      return;
    }

    let userExists = this.findUser(username);
    if (!userExists) {
      this.users.push({ username, password, loginAttempts: 0 });
      console.log(`User ${username} registered successsfully`);
    } else {
      console.error(`Username ${username} is already taken`);
    }
  }

  public login(): void {
    const username: string = readlineSync.question("enter username: ");
    const password: string = readlineSync.question("enter password: ");
    if (!username || !password) {
      console.error("invalid input. Both username and password are required");
      return;
    }
    const user = this.findUser(username);
    if (user) {
      this.handleLogin(user, password);
    } else {
      console.error(`User ${username} not found`);
    }
  }

  private findUser(username: string): User | undefined {
    for (const user of this.users) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }
  private handleLogin(user: User, enteredPassword: string): void {
    if (user.lockedUntil && user.lockedUntil > Date.now()) {
      const remainingTime = Math.ceil((user.lockedUntil - Date.now()) / 1000);
      console.error(`Account locked . try again in ${remainingTime} seconds`);
      return;
    }

    if (user.password === enteredPassword) {
      user.loginAttempts = 0;
      console.log(`user ${user.username} logged in successfully`);
    } else {
      this.handleIncorrectPassword(user);
    }
  }

  private handleIncorrectPassword(user: User): void {
    user.loginAttempts += 1;
    if (user.loginAttempts >= 2) {
      user.lockedUntil = Date.now() + 120000;
      console.error(`Incorrect password. account locked for 2 minutes`);
    } else {
      console.error(
        `Incorrect password. ${2 - user.loginAttempts} attempts remaining`
      );
    }
  }
  public unlockAccount(username: string): void {
    let user: User | undefined;
    for (const u of this.users) {
      if (u.username === username) {
        user = u;
        break;
      }
    }
    if (user) {
      user.lockedUntil = undefined;
      user.loginAttempts = 0;
      console.log(`Account for user ${username} unlocked successfully`);
    } else {
      console.error(`User ${username} not found`);
    }
  }
}
const log = new login();
log.register();
log.login();
