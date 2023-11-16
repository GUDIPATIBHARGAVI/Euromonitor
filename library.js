"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.library = void 0;
var book_1 = require("./book");
var main_1 = require("./main");
var library = /** @class */ (function () {
    function library() {
        this.books = [];
        this.users = [];
    }
    library.prototype.FaddBook = function (bookTitle, bookAuthor) {
        this.books.push(new book_1.book(bookTitle, bookAuthor, true));
        console.log("Book Added Successfully!!");
    };
    library.prototype.FaddUser = function (userName) {
        this.users.push(new main_1.user(userName));
        console.log("User Added Successfully!!");
    };
    library.prototype.FlistBooks = function () {
        this.books.forEach(function (bookAv) {
            if (bookAv.bookAvailable) {
                console.log("Book Title : ".concat(bookAv.bookTitle, ", Book Author: ").concat(bookAv.bookAuthor));
            }
        });
    };
    library.prototype.FsearchBook = function (query) {
        var flag = false;
        this.books.forEach(function (item) {
            if (item.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
                item.bookAuthor.toLowerCase().includes(query.toLowerCase())) {
                console.log("Title : ".concat(item.bookTitle, ", Author : ").concat(item.bookAuthor));
                console.log("Book searched successfully!!");
                flag = true;
            }
        });
        if (flag === false) {
            console.log("Sorry, Book not found in Library");
        }
    };
    library.prototype.FissueBook = function (userName, bookTitle) {
        var book = this.books.find(function (item) { return item.bookTitle.toLowerCase() === bookTitle.toLowerCase(); });
        var user = this.users.find(function (item) { return item.userName.toLowerCase() === userName.toLowerCase(); });
        if (!book || !user) {
            console.log("Book or User Not found");
            return;
        }
        if (!book.bookAvailable) {
            console.log("Sorry the book is not available");
            return;
        }
        if (user.userCheckOutBooks.length >= 3) {
            console.log("You cannot check out more books until you return some");
            return;
        }
        book.bookAvailable = false;
        user.userCheckOutBooks.push(book);
        console.log("Book issued successfully");
    };
    library.prototype.FretunBook = function (bookTitle, userName) {
        var book = this.books.find(function (item) { return item.bookTitle.toLowerCase() === bookTitle.toLowerCase(); });
        var user = this.users.find(function (item) { return item.userName.toLowerCase() === userName.toLowerCase(); });
        if (!book || !user) {
            console.log("Book or User Not found");
            return;
        }
        var index = user.userCheckOutBooks.findIndex(function (book) { return book.bookTitle.toLowerCase() === bookTitle.toLowerCase(); });
        if (index === -1) {
            console.log("User did not check out this book");
            return;
        }
        book.bookAvailable = true;
        user.userCheckOutBooks.splice(index, 1);
        console.log("Book returned successfully");
    };
    library.prototype.FremoveBook = function (bookTitle) {
        var index = this.books.findIndex(function (book) { return book.bookTitle.toLowerCase() === bookTitle.toLowerCase(); });
        if (index === -1) {
            console.log("Book Not found");
            return;
        }
        this.books.splice(index, 1);
        console.log("Book removed successfully!!");
    };
    return library;
}());
exports.library = library;
