import { Library } from "./Library";
import { IBook } from "./IBook";
import * as readlineSync from "readline-sync";

const library = new Library();

function displayMenu(): void {
  console.log("\nLibrary Management System Menu:");
  console.log("1. Add books to library");
  console.log("2. List all available books in library");
  console.log("3. Search books by title or author");
  console.log("4. Issue a book");
  console.log("5. Return a book");
  console.log("6. Remove book from library");
  console.log("7. Exit");
}

function getUserChoice(): number {
  return parseInt(
    readlineSync.question("Enter your choice (1-7): ") || "0",
    10
  );
}

function executeUserChoice(choice: number): void {
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

function addBookToLibrary(): void {
  const newBook = IBook.createBookFromUserInput();
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
