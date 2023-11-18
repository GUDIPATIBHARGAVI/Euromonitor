"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IBook = void 0;
var readlineSync = require("readline-sync");
var IBook = /** @class */ (function () {
    function IBook(title, author, available) {
        if (available === void 0) { available = true; }
        this.title = title;
        this.author = author;
        this.available = available;
        this.isbn = IBook.nextISBN++;
    }
    IBook.createBookFromUserInput = function () {
        console.log("Enter book details:");
        var title = readlineSync.question("Title: ") || "";
        var author = readlineSync.question("Author: ") || "";
        return new IBook(title, author);
    };
    IBook.prototype.displayDetails = function () {
        console.log("Title: ".concat(this.title));
        console.log("Author: ".concat(this.author));
        console.log("ISBN: ".concat(this.isbn));
        console.log("Status: ".concat(this.available ? "Available" : "Checked Out"));
    };
    IBook.prototype.borrowBook = function () {
        if (this.available) {
            this.available = false;
            return true;
        }
        else {
            return false;
        }
    };
    IBook.prototype.returnBook = function () {
        this.available = true;
    };
    IBook.nextISBN = 1;
    return IBook;
}());
exports.IBook = IBook;
