import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../interfaces/user';
import { ApiService } from '../../http/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User | null = null;
 // public roles: any[] = []; //falta interface para roles
  private baseUrl = 'auth';
  constructor(
    private http: ApiService,
    public router: Router
  ) {  }

  /**
   * send the post to the login.
   *
   * @returns Observable for solicitud
   */
  public login(credentials: any): Observable<any> {
    const body: any = {
      email: credentials.email,
      password: credentials.pass
    }
    return this.http.post(`${this.baseUrl}/login`, body).pipe(
      map((response: any) => {
        //this.setUser(response);
        return new Observable()//response;
      })
    );
  }
  /**
   * Stores logged-in user data.
   * @param user User data info.
   * @param token Access token string.
   * @param refreshToken Refresh token string.
   * @param tokenExpiration Expiration time for the access token.
   *
   */
  public setUser(data: any): void {
    this.user = data.user;
   // this.roles = data.roles;
    localStorage.setItem('user', JSON.stringify(data.user));
   // localStorage.setItem('roles', JSON.stringify(data.roles));
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('tokenExpiration', new Date(data.tokenExpiration).toString());
    localStorage.setItem('refreshExpiration', new Date(data.refreshTokenExpiration).toString());
    // Set Authorization Header for all requests.
    this.http.setHeader('Authorization', `Bearer ${data.token}`);
  }
  /*Get user*/
  get getUser(): User {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : null;
  }
  public setUserOnly(userData: any): void {
    this.user = userData;
    localStorage.setItem('user', userData);
  }
  /**
   * Attempts to read user data from local Storage.
   */
  public loadUser(): void {
    const userStorage = localStorage.getItem('user');
    const tokenStorage = localStorage.getItem('token');
    const permissionsStorage = localStorage.getItem('permissions');
    const rolesStorage = localStorage.getItem('roles');
    const refreshTokenStorage = localStorage.getItem('refreshToken');
    if (
      userStorage !== null &&
      tokenStorage !== null &&
      refreshTokenStorage !== null &&
      permissionsStorage !== null &&
      rolesStorage !== null
    ) {
      const user = JSON.parse(userStorage);
      const token = tokenStorage;
      const refreshToken = refreshTokenStorage;
      if (user.length !== 0 && token !== '' && refreshToken !== '') {
        try {
          this.user = user;
        //  this.roles = roles;
        } catch (err) {
          this.logOut();
          return;
        }
        this.http.setHeader('Authorization', `Bearer ${token}`);
      }
    }
  }
  /**
   * Check if the user is loaded
   */
  public isLoggedIn(): boolean {
    return !!this.user;
  }

  /**
   * Get refresh token from local Storage.
   */
  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
  /**
   * Request new tokens from the API.
   */
  public refreshToken(): Observable<any> {
    let refreshStorage = this.getRefreshToken();
    let userStorage = localStorage.getItem('user');
    const parsedUser: User = JSON.parse(userStorage as string);
    const body = {
      refreshToken: refreshStorage,
      userId: parsedUser.id,
    }
    return this.http.post('auth/refresh', body);
  }

  /**
   * update the header token
   * @param token
   */
  // public updateTokens(token: string, tokenExpiration: Date): void {
  public updateTokens(refreshed: any): void {
    this.user = refreshed.user;
    //this.roles = refreshed.roles;
    localStorage.setItem('user', JSON.stringify(refreshed.user));
    //localStorage.setItem('roles', JSON.stringify(refreshed.roles));
    localStorage.setItem('token', refreshed.token);
    localStorage.setItem('tokenExpiration', new Date(refreshed.tokenExpiration).toString());
    localStorage.setItem('refreshToken', refreshed.refreshToken);
    localStorage.setItem('refreshExpiration', new Date(refreshed.refreshTokenExpiration).toString());
    // Set Authorization Header for all requests.
    this.http.setHeader('Authorization', `Bearer ${refreshed.token}`);
  }

  /**
   * Close the user session and delete the data in local storage.
   * If the user is explicitly logging out, redirects to plain /login route,
   * else the 'returnUrl' queryParam is added to redirect after login.
   */
  public logOut(isExplicitLogout: boolean = false) {
    const lastUrl = isExplicitLogout ? {} : { returnUrl: this.router.url };

    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    localStorage.removeItem('roles');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('refreshExpiration');

    this.router.navigate(['/login'], {
      queryParams: lastUrl,
    });
  }
}

