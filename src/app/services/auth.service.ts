import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.apiUrl;
  public constructor(private http: HttpClient) {}

  public registerUser(user: Partial<User>): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.API_URL}/register`,
      user
    );
  }

  public verifyEmail(token: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(
      `${this.API_URL}/verify-email?token=${token}`
    );
  }
}
