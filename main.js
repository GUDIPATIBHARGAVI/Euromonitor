"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Library_1 = require("./Library");
var IBook_1 = require("./IBook");
var readlineSync = require("readline-sync");
var library = new Library_1.Library();
function displayMenu() {
    console.log("\nLibrary Management System Menu:");
    console.log("1. Add books to library");
    console.log("2. List all available books in library");
    console.log("3. Search books by title or author");
    console.log("4. Issue a book");
    console.log("5. Return a book");
    console.log("6. Remove book from library");
    console.log("7. Exit");
}
function getUserChoice() {
    return parseInt(readlineSync.question("Enter your choice (1-7): ") || "0", 10);
}
function executeUserChoice(choice) {
    switch (choice) {
        case 1:
            addBookToLibrary();
            break;
        case 2:
            library.listAllBooks();
            break;
        case 3:
            searchBooks();
            break;
        case 4:
            library.checkoutBook();
            break;
        case 5:
            library.returnBook();
            break;
        case 6:
            library.removeBook();
            break;
        case 7:
            console.log("Exiting the Library Management System. Goodbye!");
            process.exit(0);
        default:
            console.log("Invalid choice. Please enter a number between 1 and 7.");
    }
}
function addBookToLibrary() {
    var newBook = IBook_1.IBook.createBookFromUserInput();
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
