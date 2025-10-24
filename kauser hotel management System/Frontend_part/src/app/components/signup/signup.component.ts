import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    cnic: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Log user data to BROWSER console (Angular terminal during dev)
    console.log('User Data (JSON):', JSON.stringify(this.user, null, 2));
    console.log('Sending to backend...');

    // Send data to backend and treat response as plain text
    this.http.post('http://localhost:8080/user/signup', this.user, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          console.log('Signup SUCCESS:', res);
          this.successMessage = 'Signup successful! 🎉';
          this.errorMessage = '';
          // Reset form
          this.user = { name: '', email: '', password: '', address: '', phone: '', cnic: '' };
        },
        error: (err) => {
          console.error('Signup FAILED:', err);
          this.errorMessage = 'Signup failed. Check backend terminal for received data.';
          this.successMessage = '';
        },
        complete: () => console.log('HTTP request completed')
      });
  }
}
