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

  // RegisterUser(inputdata: any) {
  //   return this.http.post(this.apiurl, inputdata);
  // }
  RegisterUser(inputdata: any) {
    // Extract the mobile number from the user data
    const mobileNumber = inputdata.number || 'DefaultNumber';

    // Create the request payload with the 'number' property
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
  // ... (existing code)

  // login(email: string, password: string): Observable<any> {
  //   return this.http
  //     .get<any[]>(`${this.apiurl}?email=${email}&password=${password}`)
  //     .pipe(
  //       map((users) => {
  //         if (users && users.length > 0) {
  //           const user = users[0];
  //           return user;
  //         } else {
  //           throw new Error('User not found');
  //         }
  //       }),
  //       switchMap((user: { id: any }) => {
  //         return this.getContentForUser(user.id).pipe(
  //           map((userContent) => {
  //             const userWithContent = { ...user, userContent };
  //             this.setCurrentUser(userWithContent);
  //             return { success: true, user: userWithContent };
  //           }),
  //           catchError((error) => {
  //             console.error('Error fetching user content:', error);
  //             return of({ success: true, user });
  //           })
  //         );
  //       }),
  //       catchError(this.handleError<any>('login'))
  //     );
  // }

  // ... (existing code)

  logout(): Observable<any> {
    this.clearCurrentUser();
    return of(null);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  // getUsername(): string | null {
  //   const currentUser = this.getCurrentUser();
  //   return currentUser ? currentUser.email : null;
  // }
  // getContentForUser(userId: number): Observable<any> {
  //   // Assuming your backend has an endpoint to fetch content based on the user ID
  //   return this.http.get<any[]>(`${this.apiurl}/content?userId=${userId}`);
  // }
  // public setCurrentUser(user: any): void {
  //   sessionStorage.setItem('currentUser', JSON.stringify(user));
  // }
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
