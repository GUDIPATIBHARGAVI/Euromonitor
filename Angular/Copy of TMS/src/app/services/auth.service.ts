import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    const payload = { username, password };

    return this.http.post<any>(`${this.apiUrl}/signUpusers`, payload).pipe(
      tap((response) => {
        if (response.success) {
          // Store user details in sessionStorage
          sessionStorage.setItem('currentUser', JSON.stringify(response.user));
        }
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  public logout(): Observable<any> {
    // Clear the token from sessionStorage
    sessionStorage.removeItem('authToken');
    return this.http
      .post(`${this.apiUrl}/logout`, {})
      .pipe(catchError(this.handleError<any>('logout')));
  }

  public isLoggedIn(): boolean {
    // Check if the token exists in sessionStorage
    return !!sessionStorage.getItem('authToken');
  }

  public getUsername(): string | null {
    const token = this.getAuthToken();
    if (token) {
      // Extract and return the username from the token (replace this logic with your actual token parsing)
      return 'exampleUsername';
    }
    return null;
  }

  private setAuthToken(token: string): void {
    // Save the token to sessionStorage
    sessionStorage.setItem('authToken', token);
  }

  private getAuthToken(): string | null {
    // Retrieve the token from sessionStorage
    return sessionStorage.getItem('authToken');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
