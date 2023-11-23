"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
var readlineSync = require("readline-sync");
var Book = /** @class */ (function () {
    function Book(title, author, available) {
        if (available === void 0) { available = true; }
        this.title = title;
        this.author = author;
        this.available = available;
        this.isbn = Book.generateISBN();
    }
    Book.prototype.createBookFromUserInput = function () {
        throw new Error("Method not implemented.");
    };
    Book.generateISBN = function () {
        return Math.floor(Math.random() * 9) + 10;
    };
    Book.createBookFromUserInput = function () {
        console.log("Enter book details:");
        var containsNumbers = function (input) { return /\d/.test(input); };
        var title;
        do {
            title =
                readlineSync.question("Title (should not contain numbers): ") || "";
            if (containsNumbers(title)) {
                console.log("Invalid input. Title should not contain numbers. Please try again.");
            }
        } while (containsNumbers(title));
        var author;
        do {
            author =
                readlineSync.question("Author (should not contain numbers): ") || "";
            if (containsNumbers(author)) {
                console.log("Invalid input. Author should not contain numbers. Please try again.");
            }
        } while (containsNumbers(author));
        return new Book(title, author);
    };
    Book.prototype.displaybookDetails = function () {
        console.log("Title: ".concat(this.title));
        console.log("Author: ".concat(this.author));
        console.log("ISBN: ".concat(this.isbn));
        console.log("Status: ".concat(this.available ? "Available" : "Checked Out"));
    };
    Book.prototype.borrowedBooksCount = function (library) {
        return library.books.filter(function (book) { return !book.available; }).length;
    };
    Book.prototype.borrowBook = function () {
        var maxBooksAllowed = 3;
        if (this.available) {
            if (Book.borrowedBooks.length < maxBooksAllowed) {
                this.available = false;
                Book.borrowedBooks.push(this);
                console.log("You have successfully checked out the following book:");
                this.displaybookDetails();
                return true;
            }
            else {
                console.log("You have already borrowed the maximum number of books. Please return a book before borrowing a new one.");
            }
        }
        else {
            console.log("This book is currently checked out");
        }
        return false;
    };
    Book.prototype.returnBook = function () {
        this.available = true;
        var index = Book.borrowedBooks.indexOf(this);
        if (index !== -1) {
            Book.borrowedBooks.splice(index, 1);
        }
    };
    Book.borrowedBooks = [];
    return Book;
}());
exports.Book = Book;
