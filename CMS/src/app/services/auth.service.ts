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

  public RegisterUser(inputdata: any) {
    const mobileNumber = inputdata.number || 'DefaultNumber';

    const requestData = { ...inputdata, number: mobileNumber };

    return this.http.post(this.apiurl, inputdata);
  }
  public GetUserbyCode(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }
  public Getall() {
    return this.http.get(this.apiurl);
  }
  public updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }
  public getuserrole() {
    return sessionStorage.getItem('userrole') != null
      ? sessionStorage.getItem('userrole')?.toString()
      : '';
  }
  public isloggedin() {
    return sessionStorage.getItem('username') != null;
  }
  public getrole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }

  public Getaccessbyrole(role: any, menu: any) {
    return this.http.get(
      'http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu
    );
  }
  public GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  public logout(): Observable<any> {
    this.clearCurrentUser();
    return of(null);
  }

  public isLoggedIn(): boolean {
    return !!this.getCurrentUser();
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

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
