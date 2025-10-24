import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { HostelListingComponent } from './hostel-listing/hostel-listing.component';
import { ExploreRoomComponent } from './explore-room/explore-room.component';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./components/signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HeroBannerComponent,
    HostelListingComponent,
    ExploreRoomComponent,
    LoginComponent,
    SignupComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';

  // State management
  showHeroBanner = true;
  showExploreRoom = false;
  showHostelListing = false;
  showLoginPage = false;
  showsignupPage = false;

  // Booking clicked → go to hostel listing
  onBookingClicked() {
    this.resetPages();
    this.showHostelListing = true;
  }

  // Explore room clicked
  onExploreRoom() {
    this.resetPages();
    this.showExploreRoom = true;
  }

  // Login clicked (from header or hero)
  onloginClick() {
    this.resetPages();
    this.showLoginPage = true;
  }

  // Signup clicked (from header)
  onsignupClick() {
    this.resetPages();
    this.showsignupPage = true;
  }

  // Login successful → return to home
  onLoginSuccess() {
    this.resetPages();
    this.showHeroBanner = true;
  }

  // Signup successful → return to login page (or banner, your choice)
  onSignupSuccess() {
    this.resetPages();
    this.showLoginPage = true; // ✅ after signup, go to login
  }

  // Go back to home/banner
  returnToBanner() {
    this.resetPages();
    this.showHeroBanner = true;
  }

  // Logout → reset to banner
  logout() {
    this.resetPages();
    this.showHeroBanner = true;
  }

  // Helper: reset all views
  private resetPages() {
    this.showHeroBanner = false;
    this.showExploreRoom = false;
    this.showHostelListing = false;
    this.showLoginPage = false;
    this.showsignupPage = false;
  }
}
