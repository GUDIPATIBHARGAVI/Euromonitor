"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var library_1 = require("./library");
var readlineSync = require("readline-sync");
var Bookdetails_1 = require("./Bookdetails");
var library = new library_1.Library();
function displayMenu() {
    console.log("Library Management System Menu:");
    console.log("1. Add books to library");
    console.log("2. List all available books in library");
    console.log("3. Search books by title or author");
    console.log("4. Issue a book");
    console.log("5. Return a book");
    console.log("6. Remove book from library");
    console.log("7. Exit");
}
function getUserChoice() {
    return parseInt(readlineSync.question("Enter your choice (1-7): "));
}
function executeUserChoice(choice) {
    if (choice === 1) {
        addBookToLibrary();
    }
    else if (choice === 2) {
        library.listAllBooks();
    }
    else if (choice === 3) {
        searchBooks();
    }
    else if (choice === 4) {
        library.checkoutBook();
    }
    else if (choice === 5) {
        library.returnBook();
    }
    else if (choice === 6) {
        library.removeBook();
    }
    else if (choice === 7) {
        console.log("Exiting the Library Management System. Thank you");
        process.exit(0);
    }
    else {
        console.log("Invalid choice. Please enter a number between 1 and 7.");
    }
}
function addBookToLibrary() {
    var newBook = Bookdetails_1.Book.createBookFromUserInput();
    library.addBook(newBook.title, newBook.author);
}
function searchBooks() {
    var query = readlineSync.question("Enter title or author to search: ") || "";
    var searchResults = library.searchBooks(query);
    library.displaySearchResults(searchResults);
}
function runLibraryManagementSystem() {
    while (true) {
        displayMenu();
        var choice = getUserChoice();
        executeUserChoice(choice);
    }
}
runLibraryManagementSystem();
