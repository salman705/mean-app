import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  books: any[] = [];
  newBook: any = {};
  editBookData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.http.get<any[]>('http://localhost:8000/api/books').subscribe((response) => {
      this.books = response;
    });
  }

  addBook() {
    if (!this.newBook.title || !this.newBook.author || !this.newBook.pages) {
      alert('Please fill all the fields.');
      return;
    }

    this.http.post<any>('http://localhost:8000/api/books', this.newBook).subscribe((response) => {
      this.books.push(response);
      this.newBook = {};
    });
  }

  editBook(book: any) {
    this.editBookData = { ...book };
  }

  updateBook() {
    if (!this.editBookData.title || !this.editBookData.author || !this.editBookData.pages) {
      alert('Please fill all the fields.');
      return;
    }

    this.http.put<any>(`http://localhost:8000/api/books/${this.editBookData._id}`, this.editBookData).subscribe((response) => {
      const index = this.books.findIndex((book) => book._id === this.editBookData._id);
      if (index !== -1) {
        this.books[index] = response;
      }
      this.editBookData = {};
    });
  }

  deleteBook(book: any) {
    this.http.delete<any>(`http://localhost:8000/api/books/${book._id}`).subscribe(() => this.getBooks());
  }
}
