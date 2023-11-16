// Book.ts
export class Book {
  private static nextISBN: number = 1;
  private isbn: number;

  constructor(
    public title: string,
    public author: string,
    public available: boolean = true
  ) {
    this.isbn = Book.nextISBN++;
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
    }
    return false;
  }

  returnBook(): void {
    this.available = true;
  }
}
