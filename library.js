"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
var IBook_1 = require("./IBook");
var readlineSync = require("readline-sync");
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
    }
    Library.prototype.addBook = function (title, author) {
        var newBook = new IBook_1.IBook(title, author);
        this.books.push(newBook);
        console.log("Book added to the library: ".concat(title, " by ").concat(author));
    };
    Library.prototype.displaySearchResults = function (searchResults) {
        console.log("Search Results:");
        searchResults.forEach(function (book) { return book.displayDetails(); });
    };
    Library.prototype.listAllBooks = function () {
        console.log("Available books in the library:");
        this.books.forEach(function (book, index) {
            console.log("".concat(index + 1, ". ").concat(book.title, " by ").concat(book.author, " (").concat(book.available ? "Available" : "Checked Out", ")"));
        });
    };
    Library.prototype.searchBooks = function (query) {
        var result = this.books.filter(function (book) {
            return book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase());
        });
        return result;
    };
    Library.prototype.checkoutBook = function () {
        var bookIndex = this.promptBookSelection("Select a book to check out:");
        if (bookIndex !== -1 && this.books[bookIndex].borrowBook()) {
            console.log("You have successfully checked out the following book:");
            this.books[bookIndex].displayDetails();
        }
    };
    Library.prototype.returnBook = function () {
        var bookIndex = this.promptBookSelection("Select a book to return:");
        if (bookIndex !== -1) {
            this.books[bookIndex].returnBook();
            console.log("You have successfully returned the following book:");
            this.books[bookIndex].displayDetails();
        }
    };
    Library.prototype.removeBook = function () {
        var bookIndex = this.promptBookSelection("Select a book to remove:");
        if (bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
            console.log("Book removed successfully.");
        }
    };
    Library.prototype.promptBookSelection = function (message) {
        this.listAllBooks();
        var selection = parseInt(readlineSync.question("".concat(message, " Enter the corresponding number: "))) || -1;
        if (selection >= 1 && selection <= this.books.length) {
            return selection - 1;
        }
        else {
            console.log("Invalid selection. Please try again.");
            return -1;
        }
    };
    return Library;
}());
exports.Library = Library;
