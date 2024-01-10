import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private signUpUsers: any[] = [];

  constructor(private http: HttpClient) {
    lastValueFrom(this.http.get<any[]>(`${this.apiUrl}/signUpusers`)).then(
      (users) => {
        this.signUpUsers = users;
      },
      (error) => {
        console.error('Error fetching signUpUsers:', error);
      }
    );
  }

  public login(email: string, password: string): Observable<any> {
    const user = this.signUpUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.setCurrentUser(user);
      console.log('User found:', user);
      return of({ success: true, user });
    } else {
      console.log('User not found');
      return of({ success: false, message: 'Authentication failed' });
    }
  }

  public logout(): Observable<any> {
    this.clearCurrentUser();
    return of(null);
  }

  public isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  public getUsername(): string | null {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.email : null;
  }

  private setCurrentUser(user: any): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }
  public getUserId(): number | null {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.id : null;
  }

  private getCurrentUser(): any | null {
    const userString = sessionStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  private clearCurrentUser(): void {
    sessionStorage.removeItem('currentUser');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
