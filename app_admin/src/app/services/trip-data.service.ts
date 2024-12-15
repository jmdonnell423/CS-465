import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponseapp/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api/trips';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // Existing trip CRUD methods
  getTrips(): Observable<Trip[]> {
    // console.log('inside TripDataService::getTrips);
    return this.http.get<Trip[]>(this.apiBaseUrl);
  }

  addTrip(formData: Trip): Observable<Trip> {
    // console.log('inside TripDataService::addTrips);
    return this.http.post<Trip>(this.apiBaseUrl, formData);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    // console.log('inside TripDataService::getTrips');
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/${tripCode}`);
  }

  updateTrip(formData: Trip): Observable<Trip[]> {
    // console.log('inside TripDataService::addTrips);
    return this.http.put<Trip[]>(`${this.apiBaseUrl}/${formData.code}`, formData);
  }

  // Authentication methods
  login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(
    urlPath: string,
    user: User
  ): Promise<AuthResponse> {
    const url = `http://localhost:3000/api/${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred:', error); // Log for debugging
    return Promise.reject(error.message || error);
  }
}

