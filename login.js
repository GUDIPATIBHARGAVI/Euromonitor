"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Users should be able to create an account by providing a unique username and password.
// The system should check for existing usernames to ensure uniqueness.
// User Login:
// Users should be able to log in using their username and password.
// After two consecutive failed login attempts, the user's account should be locked for a duration of 2 minutes.
// During the lock period, any login attempts should result in an error message indicating the remaining lock time.
// Account Unlocking:
// After the 2-minute lock period, the user's account should automatically unlock.
// Optionally, provide a manual account unlocking mechanism if needed.
// import * as readlineSync from 'readline-sync';
var readlineSync = require("readline-sync");
var login = /** @class */ (function () {
    function login() {
        this.users = [];
    }
    login.prototype.register = function () {
        var username = readlineSync.question("enter username: ");
        var password = readlineSync.question("enter password: ");
        if (!username || !password) {
            console.error("invalid input. both username and passowrd are required");
            return;
        }
        // let userExists = false;
        // for (const user of this.users) {
        //   if (user.username === username) {
        //     userExists = true;
        //     break;
        //   }
        // }
        var userExists = this.findUser(username);
        if (!userExists) {
            this.users.push({ username: username, password: password, loginAttempts: 0 });
            console.log("User ".concat(username, " registered successsfully"));
        }
        else {
            console.error("Username ".concat(username, " is already taken"));
        }
    };
    //   public login(username: string, password: string): void {
    //     let user: User | undefined;
    //     for (const u of this.users) {
    //       if (u.username === username) {
    //         user = u;
    //         break;
    //       }
    //     }
    //     if (user) {
    //       if (user.lockedUntil && user.lockedUntil > Date.now()) {
    //         const remainingTime = Math.ceil((user.lockedUntil - Date.now()) / 1000);
    //         console.error(
    //           `Account locked. please try again in ${remainingTime} seconds`
    //         );
    //         return;
    //       }
    //       if (user.password === password) {
    //         user.loginAttempts = 0;
    //         console.log(`User ${username} logged in successfully`);
    //       } else {
    //         user.loginAttempts += 1;
    //         if (user.loginAttempts >= 2) {
    //           user.lockedUntil = Date.now() + 120000;
    //           console.error(
    //             `Incorrect password. account will be locked for 2 minutes`
    //           );
    //         } else {
    //           console.error(
    //             `Incorrect password. ${2 - user.loginAttempts} attempts remaining`
    //           );
    //         }
    //       }
    //     } else {
    //       console.error(`User ${username} not found`);
    //     }
    //   }
    login.prototype.login = function () {
        var username = readlineSync.question("enter username: ");
        var password = readlineSync.question("enter password: ");
        if (!username || !password) {
            console.error("invalid input. Both username and password are required");
            return;
        }
        var user = this.findUser(username);
        if (user) {
            this.handleLogin(user, password);
        }
        else {
            console.error("User ".concat(username, " not found"));
        }
    };
    login.prototype.findUser = function (username) {
        // return this.users.find((user) => user.username === username);
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.username === username) {
                return user;
            }
        }
        return undefined;
    };
    login.prototype.handleLogin = function (user, enteredPassword) {
        if (user.lockedUntil && user.lockedUntil > Date.now()) {
            var remainingTime = Math.ceil((user.lockedUntil - Date.now()) / 1000);
            console.error("Account locked . try again in ".concat(remainingTime, " seconds"));
            return;
        }
        if (user.password === enteredPassword) {
            user.loginAttempts = 0;
            console.log("user ".concat(user.username, " logged in successfully"));
        }
        else {
            this.handleIncorrectPassword(user);
        }
    };
    login.prototype.handleIncorrectPassword = function (user) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= 2) {
            user.lockedUntil = Date.now() + 120000;
            console.error("Incorrect password. account locked for 2 minutes");
        }
        else {
            console.error("Incorrect password. ".concat(2 - user.loginAttempts, " attempts remaining"));
        }
    };
    login.prototype.unlockAccount = function (username) {
        var user;
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var u = _a[_i];
            if (u.username === username) {
                user = u;
                break;
            }
        }
        if (user) {
            user.lockedUntil = undefined;
            user.loginAttempts = 0;
            console.log("Account for user ".concat(username, " unlocked successfully"));
        }
        else {
            console.error("User ".concat(username, " not found"));
        }
    };
    return login;
}());
var log = new login();
log.register();
log.login();
