"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var user = /** @class */ (function () {
    function user(userName, userCheckOutBooks) {
        if (userCheckOutBooks === void 0) { userCheckOutBooks = []; }
        this.userName = userName;
        this.userCheckOutBooks = userCheckOutBooks;
    }
    return user;
}());
exports.user = user;
