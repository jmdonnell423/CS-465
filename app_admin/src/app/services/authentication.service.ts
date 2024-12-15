import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/api/login'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  public login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
      map((response) => {
        this.saveToken(response.token);
        return response;
      })
    );
  }

  public saveToken(token: string): void {
    localStorage.setItem('travlr-token', token);
  }

  public logout(): void {
    localStorage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('travlr-token');
  }
}















