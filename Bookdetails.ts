import { IBook } from "./iBook";
import * as readlineSync from "readline-sync";
import { Library } from "./library";

export class Book implements IBook {
  private isbn: number;
  constructor(
    public title: string,
    public author: string,
    public available: boolean = true
  ) {
    this.isbn = Book.generateISBN();
  }

  public createBookFromUserInput(): IBook {
    throw new Error("Method not implemented.");
  }

  public static generateISBN(): number {
    return Math.floor(Math.random() * 9) + 10;
  }

  public static createBookFromUserInput(): IBook {
    console.log("Enter book details:");
    const containsNumbers = (input: string): boolean => /\d/.test(input);

    let title: string;
    do {
      title =
        readlineSync.question("Title (should not contain numbers): ") || "";
      if (containsNumbers(title)) {
        console.log(
          "Invalid input. Title should not contain numbers. Please try again."
        );
      }
    } while (containsNumbers(title));

    let author: string;
    do {
      author =
        readlineSync.question("Author (should not contain numbers): ") || "";
      if (containsNumbers(author)) {
        console.log(
          "Invalid input. Author should not contain numbers. Please try again."
        );
      }
    } while (containsNumbers(author));
    return new Book(title, author);
  }

  public displaybookDetails(): void {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`ISBN: ${this.isbn}`);
    console.log(`Status: ${this.available ? "Available" : "Checked Out"}`);
  }

  public borrowedBooksCount(library: Library): number {
    return library.books.filter((book) => !book.available).length;
  }
  public static borrowedBooks: Book[] = [];

  public borrowBook(): boolean {
    const maxBooksAllowed = 3;

    if (this.available) {
      if (Book.borrowedBooks.length < maxBooksAllowed) {
        this.available = false;
        Book.borrowedBooks.push(this);
        console.log(`You have successfully checked out the following book:`);
        this.displaybookDetails();
        return true;
      } else {
        console.log(
          "You have already borrowed the maximum number of books. Please return a book before borrowing a new one."
        );
      }
    } else {
      console.log("This book is currently checked out.");
    }

    return false;
  }

  public returnBook(): void {
    this.available = true;
    const index = Book.borrowedBooks.indexOf(this);
    if (index !== -1) {
      Book.borrowedBooks.splice(index, 1);
    }
  }
}
