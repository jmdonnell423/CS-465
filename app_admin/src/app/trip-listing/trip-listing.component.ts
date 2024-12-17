import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trips } from '../data/trips';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  providers: [TripDataService], 
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
  // Component code remains unchanged

  trips: Array<any> = trips;
  //trips!: Trip[];
  message: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService,
    private router:Router)
    { 
    console.log('trip-listing constructor'); 
  }

  public addTrip(): void {
    this.router.navigate(['add-trip'])
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private getStuff(): void {  
    this.tripDataService.getTrips().subscribe({  
        next: (value: any) => {  
          this.trips = value;  
          if(value.length > 0)  
          {  
            this.message = 'There are ' + value.length + ' trips available.';  
          }  
          else{  
            this.message = 'There were no trips retrieved from the database';  
          }  
          console.log(this.message);  
        },  
        error: (error: any) => {  
          console.log('Error: ' + error);  
        },  
      });  
  }
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }   
  
} 
