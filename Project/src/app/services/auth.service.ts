import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  lastValueFrom,
  map,
  of,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: any;
  constructor(private http: HttpClient) {
    lastValueFrom(this.http.get<any[]>(`${this.apiurl}`)).then(
      (user) => {
        this.users = user;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  apiurl = 'http://localhost:3000/users';

  RegisterUser(inputdata: any) {
    const mobileNumber = inputdata.number || 'DefaultNumber';

    const requestData = { ...inputdata, number: mobileNumber };

    return this.http.post(this.apiurl, inputdata);
  }
  GetUserbyCode(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }
  Getall() {
    return this.http.get(this.apiurl);
  }
  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }
  getuserrole() {
    return sessionStorage.getItem('userrole') != null
      ? sessionStorage.getItem('userrole')?.toString()
      : '';
  }
  isloggedin() {
    return sessionStorage.getItem('username') != null;
  }
  getrole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }

  Getaccessbyrole(role: any, menu: any) {
    return this.http.get(
      'http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu
    );
  }
  GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  logout(): Observable<any> {
    this.clearCurrentUser();
    return of(null);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getUserId(): number | null {
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
