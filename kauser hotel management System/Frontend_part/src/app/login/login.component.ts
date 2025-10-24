import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  @Output() loginSuccess = new EventEmitter<void>();  // event emitter

  constructor(private http: HttpClient) {}

  login() {
  const headers = new HttpHeaders({
    Authorization: 'Basic ' + btoa(`${this.email}:${this.password}`)
  });

  this.http.get<{ username: string; role: string }>('http://localhost:8080/user/login', { headers })
    .subscribe({
      next: (res) => {
        // Store data in sessionStorage
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('role', res.role);

        this.message = '✅ Login successful!';
        
        // Optionally, redirect or emit success event
        setTimeout(() => {
          this.loginSuccess.emit();
          // Example: if using routing
          // if (res.role === 'ADMIN') {
          //   this.router.navigate(['/admin-dashboard']);
          // } else {
          //   this.router.navigate(['/user-dashboard']);
          // }
        }, 1000);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.message = '❌ Login failed! Please check your credentials.';
      }
    });
}

}
