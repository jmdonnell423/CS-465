import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Default route
  { path: 'list-trips', component: TripListingComponent }, // Route for listing trips
  { path: 'add-trip', component: AddTripComponent }, // Route for adding trips
  { path: 'edit-trip', component: EditTripComponent }, // Route for editing trips
  { path: 'login', component: LoginComponent }, // Route for login page
  { path: '**', redirectTo: '' }, // Catch-all route redirects to home
];
