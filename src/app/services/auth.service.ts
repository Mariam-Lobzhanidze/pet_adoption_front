import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from '../shared/models/user.model';
import { environment } from '../../environments/environment';
import { Observable, take, tap, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.apiUrl;

  private accessTokenKey = 'accessToken';
  private userKey = 'user';

  public isLoggedIn = signal<boolean>(
    !!localStorage.getItem(this.accessTokenKey)
  );
  public user = signal<Partial<User> | null>(this.getUserFromStorage());

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  // https
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

  public loginUser(user: { email: string; password: string }): Observable<{
    user: Partial<User>;
    auth: { token: string; expiresIn: number };
  }> {
    return this.http
      .post<{
        user: Partial<User>;
        auth: { token: string; expiresIn: number };
      }>(`${this.API_URL}/login`, user)
      .pipe(
        tap((response) => {
          this.saveAuthData(response.auth.token, response.user);
          this.manageNavigation();

          this.autoLogout(response.auth.expiresIn);
        })
      );
  }

  private manageNavigation() {
    const routeAfterGuard =
      this.route.snapshot.queryParams['redirect'] ||
      this.navigationService.previousUrl() ||
      '/home';
    if (routeAfterGuard) {
      this.router.navigate([routeAfterGuard]);
    }
  }

  private autoLogout(expiresInMilliseconds: number): void {
    timer(expiresInMilliseconds)
      .pipe(take(1))
      .subscribe(() => {
        this.logout();
      });
  }

  private saveAuthData(accessToken: string, user: Partial<User>): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.userKey, JSON.stringify(user));

    this.isLoggedIn.set(true);
    this.user.set(user);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  public logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.userKey);

    this.isLoggedIn.set(false);
    this.user.set(null);
    this.router.navigate(['/home']);
  }

  private getUserFromStorage(): Partial<User> | null {
    const userString = localStorage.getItem(this.userKey);
    return userString ? JSON.parse(userString) : null;
  }
}
