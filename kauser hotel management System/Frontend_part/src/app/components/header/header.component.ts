import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Output, EventEmitter } from '@angular/core';
// <-- import your AuthService
import { CommonModule } from '@angular/common'; // required for *ngIf in standalone

@Component({
  selector: 'app-header',
  standalone: true, // <-- mark as standalone if your app uses standalone components
  imports: [CommonModule], // <-- required for *ngIf and ngClass etc.
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
onContactClick() {
throw new Error('Method not implemented.');
}
onBooking() {
throw new Error('Method not implemented.');
}
onDiningClick() {
throw new Error('Method not implemented.');
}
onExploreRoom() {
throw new Error('Method not implemented.');
}
  @Output() homeClicked = new EventEmitter<void>();

  constructor(public auth: AuthService) {}

  onHomeClick() {
    this.homeClicked.emit();  // emit event when Home clicked
  }
onLogout() {
    sessionStorage.clear();  // remove username, role, etc.
    this.logoutClicked.emit(); // tell AppComponent to reset views
  }

  @Output() logoutClicked = new EventEmitter<void>();
  @Output() loginClicked =new EventEmitter<void>();
onloginClick(){

  this.loginClicked.emit();
}
@Output() signupClicked =new EventEmitter<void>();
onsignupClick(){

  this.signupClicked.emit();
} 
}

  

