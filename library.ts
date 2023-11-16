// Library.ts
import { Book } from "./book";
import * as readlineSync from "readline-sync";

export class Library {
  private books: Book[] = [];

  addBook(title: string, author: string): void {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    console.log(`Book added to the library: ${title} by ${author}`);
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

  searchBooks(query: string): Book[] {
    const result = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  }

  checkoutBook(userCheckoutLimit: number): Book | null {
    if (userCheckoutLimit >= 3) {
      console.log(
        "You have reached the maximum allowed number of checked-out books."
      );
      console.log("Please return some books before checking out more.");
      return null;
    }

    const bookIndex = this.promptBookSelection("Select a book to check out:");
    if (bookIndex !== -1 && this.books[bookIndex].borrowBook()) {
      console.log(`You have successfully checked out the following book:`);
      this.books[bookIndex].displayDetails();
      return this.books[bookIndex];
    }

    return null;
  }

  returnBook(): void {
    const bookIndex = this.promptBookSelection("Select a book to return:");
    if (bookIndex !== -1) {
      this.books[bookIndex].returnBook();
      console.log(`You have successfully returned the following book:`);
      this.books[bookIndex].displayDetails();
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
