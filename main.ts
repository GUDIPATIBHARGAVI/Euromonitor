import { Library } from "./library";
import * as readlineSync from "readline-sync";
import { Book } from "./Bookdetails";
const library = new Library();

function displayMenu(): void {
  console.log("Library Management System Menu:");
  console.log("1. Add books to library");
  console.log("2. List all available books in library");
  console.log("3. Search books by title or author");
  console.log("4. Issue a book");
  console.log("5. Return a book");
  console.log("6. Remove book from library");
  console.log("7. Exit");
}

function getUserChoice(): number {
  return parseInt(readlineSync.question("Enter your choice (1-7): "));
}

function executeUserChoice(choice: number): void {
  if (choice === 1) {
    addBookToLibrary();
  } else if (choice === 2) {
    library.listAllBooks();
  } else if (choice === 3) {
    searchBooks();
  } else if (choice === 4) {
    library.checkoutBook();
  } else if (choice === 5) {
    library.returnBook();
  } else if (choice === 6) {
    library.removeBook();
  } else if (choice === 7) {
    console.log("Exiting the Library Management System. Thank you");
    process.exit(0);
  } else {
    console.log("Invalid choice. Please enter a number between 1 and 7.");
  }
}

function addBookToLibrary(): void {
  const newBook = Book.createBookFromUserInput();
  library.addBook(newBook.title, newBook.author);
}

function searchBooks(): void {
  const query =
    readlineSync.question("Enter title or author to search: ") || "";
  const searchResults = library.searchBooks(query);
  library.displaySearchResults(searchResults);
}

function runLibraryManagementSystem(): void {
  while (true) {
    displayMenu();
    const choice = getUserChoice();
    executeUserChoice(choice);
  }
}

runLibraryManagementSystem();
