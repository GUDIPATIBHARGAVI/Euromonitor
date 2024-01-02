import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/signUpusers';

  constructor(private http: HttpClient) {}

  public getUserByUsernameAndPassword(
    username: string,
    password: string
  ): Observable<any> {
    return this.http
      .get(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map((users: any) => {
          return users.length > 0 ? users[0] : null;
        })
      );
  }
}
