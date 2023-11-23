export interface IBook {
  title: string;
  author: string;
  available: boolean;
  createBookFromUserInput(): IBook;
  displaybookDetails(): void;
  borrowBook(): boolean;
  returnBook(): void;
}
