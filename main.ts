// Main.ts
import { Library } from "./library";

const library = new Library();

library.addBook("Book1", "Author1");
library.addBook("Book2", "Author2");
library.addBook("Book3", "Author3");

library.listAllBooks();

// Example: Search for books
const searchResults = library.searchBooks("Author1");
console.log("Search Results:");
searchResults.forEach((book) => book.displayDetails());

// Example: Checkout a book
const checkedOutBook = library.checkoutBook(2);

// Example: Return a book
if (checkedOutBook) {
  library.returnBook();
}

// Display updated book list
library.listAllBooks();
