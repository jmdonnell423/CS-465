import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BROWSER_STORAGE } from '../storage';
import { AuthResponse } from '../models/authresponseapp/authresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiBaseUrl = 'http://localhost:3000/api'; // Replace with your actual API base URL

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient
  ) {}

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  public login(user: { email: string; password: string }): Promise<AuthResponse> {
    const url = `${this.apiBaseUrl}/login`;
    return this.http.post<AuthResponse>(url, user).toPromise()
      .then((response: AuthResponse | undefined) => {
        if (response) {
          return response; // Ensure response is returned
        }
        throw new Error('Unexpected server response: Response is undefined.');
      });
  }

  public register(user: { email: string; password: string }): Promise<AuthResponse> {
    const url = `${this.apiBaseUrl}/register`;
    return this.http.post<AuthResponse>(url, user).toPromise()
      .then((response: AuthResponse | undefined) => {
        if (response) {
          return response; // Ensure response is returned
        }
        throw new Error('Unexpected server response: Response is undefined.');
      });
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }
    return false;
  }
}
































