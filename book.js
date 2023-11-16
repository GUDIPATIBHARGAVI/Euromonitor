"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
// Book.ts
var Book = /** @class */ (function () {
    function Book(title, author, available) {
        if (available === void 0) { available = true; }
        this.title = title;
        this.author = author;
        this.available = available;
        this.isbn = Book.nextISBN++;
    }
    Book.prototype.displayDetails = function () {
        console.log("Title: ".concat(this.title));
        console.log("Author: ".concat(this.author));
        console.log("ISBN: ".concat(this.isbn));
        console.log("Status: ".concat(this.available ? "Available" : "Checked Out"));
    };
    Book.prototype.borrowBook = function () {
        if (this.available) {
            this.available = false;
            return true;
        }
        return false;
    };
    Book.prototype.returnBook = function () {
        this.available = true;
    };
    Book.nextISBN = 1;
    return Book;
}());
exports.Book = Book;
