import * as readlineSync from "readline-sync";

export class IBook {
  private static nextISBN: number = 1;
  private isbn: number;

  constructor(
    public title: string,
    public author: string,
    public available: boolean = true
  ) {
    this.isbn = IBook.nextISBN++;
  }

  static createBookFromUserInput(): IBook {
    console.log("Enter book details:");
    const title: string = readlineSync.question("Title: ") || "";
    const author: string = readlineSync.question("Author: ") || "";
    return new IBook(title, author);
  }

  displayDetails(): void {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`ISBN: ${this.isbn}`);
    console.log(`Status: ${this.available ? "Available" : "Checked Out"}`);
  }

  borrowBook(): boolean {
    if (this.available) {
      this.available = false;
      return true;
    } else {
      return false;
    }
  }

  returnBook(): void {
    this.available = true;
  }
}
