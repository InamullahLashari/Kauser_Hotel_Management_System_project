import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule , FormsModule], // Import FormsModule for ngModel
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  // Footer navigation links
  footerLinks = [
    { path: '/about', text: 'About Us' },
    { path: '/rooms', text: 'Rooms & Suites' },
    { path: '/dining', text: 'Dining' },
    { path: '/facilities', text: 'Facilities' },
    { path: '/contact', text: 'Contact Us' },
    { path: '/privacy', text: 'Privacy Policy' }
  ];

  // Contact information
  contactInfo = {
    address: '123 Luxury Street, City, Country',
    phone: '+1 (555) 123-4567',
    email: 'info@kauserhotel.com'
  };

  // Social media links
  socialMedia = [
    { icon: 'assets/icons/facebook.svg', url: 'https://facebook.com/kauserhotel' },
    { icon: 'assets/icons/instagram.svg', url: 'https://instagram.com/kauserhotel' },
    { icon: 'assets/icons/twitter.svg', url: 'https://twitter.com/kauserhotel' },
    { icon: 'assets/icons/linkedin.svg', url: 'https://linkedin.com/company/kauserhotel' }
  ];

  // Newsletter subscription
  newsletterEmail = '';

  subscribeNewsletter() {
    // Implement newsletter subscription logic
    console.log('Subscribed with:', this.newsletterEmail);
    this.newsletterEmail = '';
  }
}