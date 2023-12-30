import { Book } from "./Bookdetails";
import { IBook } from "./iBook";
import * as readlineSync from "readline-sync";

export class Library {
  public books: Book[] = [];

  public addBook(title: string, author: string): void {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    console.log(`Book added to the library: ${title} by ${author}`);
  }

  public displaySearchResults(searchResults: IBook[]): void {
    console.log("Search Results:");
    searchResults.forEach((book) => book.displaybookDetails());
  }

  public listAllBooks(): void {
    console.log("Available books in the library:");
    this.books.forEach((book, index) => {
      console.log(
        `${index + 1}. ${book.title} by ${book.author} (${
          book.available ? "Available" : "Checked Out"
        })`
      );
    });
  }

  public searchBooks(query: string): IBook[] {
    const result = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  }

  public checkoutBook(): void {
    const bookIndex = this.promptBookSelection("Select a book to check out:");
    if (bookIndex !== -1 && this.books[bookIndex].borrowBook()) {
      console.log(`You have successfully checked out the following book:`);
      this.books[bookIndex].displaybookDetails();
    }
  }

  public returnBook(): void {
    const bookIndex = this.promptBookSelection("Select a book to return:");
    if (bookIndex !== -1) {
      this.books[bookIndex].returnBook();
      console.log(`You have successfully returned the following book:`);
      this.books[bookIndex].displaybookDetails();
    }
  }

  public removeBook(): void {
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
