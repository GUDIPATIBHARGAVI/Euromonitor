import { IBook } from "./IBook";
import * as readlineSync from "readline-sync";
export class Library {
  private books: IBook[] = [];

  addBook(title: string, author: string): void {
    const newBook = new IBook(title, author);
    this.books.push(newBook);
    console.log(`Book added to the library: ${title} by ${author}`);
  }

  displaySearchResults(searchResults: IBook[]): void {
    console.log("Search Results:");
    searchResults.forEach((book) => book.displayDetails());
  }
  listAllBooks(): void {
    console.log("Available books in the library:");
    this.books.forEach((book, index) => {
      console.log(
        `${index + 1}. ${book.title} by ${book.author} (${
          book.available ? "Available" : "Checked Out"
        })`
      );
    });
  }

  searchBooks(query: string): IBook[] {
    const result = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  }

  checkoutBook(): void {
    const bookIndex = this.promptBookSelection("Select a book to check out:");
    if (bookIndex !== -1 && this.books[bookIndex].borrowBook()) {
      console.log(`You have successfully checked out the following book:`);
      this.books[bookIndex].displayDetails();
    }
  }

  returnBook(): void {
    const bookIndex = this.promptBookSelection("Select a book to return:");
    if (bookIndex !== -1) {
      this.books[bookIndex].returnBook();
      console.log(`You have successfully returned the following book:`);
      this.books[bookIndex].displayDetails();
    }
  }

  removeBook(): void {
    const bookIndex = this.promptBookSelection("Select a book to remove:");
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
      console.log("Book removed successfully.");
    }
  }

  private promptBookSelection(message: string): number {
    this.listAllBooks();
    const selection =
      parseInt(
        readlineSync.question(`${message} Enter the corresponding number: `)
      ) || -1;
    if (selection >= 1 && selection <= this.books.length) {
      return selection - 1;
    } else {
      console.log("Invalid selection. Please try again.");
      return -1;
    }
  }
}
