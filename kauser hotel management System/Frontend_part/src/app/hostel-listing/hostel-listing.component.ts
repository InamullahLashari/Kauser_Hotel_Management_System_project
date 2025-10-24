import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor

@Component({
  selector: 'app-hostel-listing',
  standalone: true, // Add this
  imports: [CommonModule], // Add this for *ngFor support
  templateUrl: './hostel-listing.component.html',
  styleUrls: ['./hostel-listing.component.css']
})
export class HostelListingComponent {
  rooms = [
    {
      name: 'Single Room',
      imageUrl: 'assets/images/single-room.jpg',
      shortDescription: 'Cozy single room perfect for solo travelers.',
      pricePerNight: 50,
      features: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast Included']
    },
    {
      name: 'Double Room',
      imageUrl: 'assets/images/double-room.jpg',
      shortDescription: 'Spacious double room for couples or friends.',
      pricePerNight: 80,
      features: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast Included', 'City View']
    },
    {
      name: 'Suite',
      imageUrl: 'assets/images/suite-room.jpg',
      shortDescription: 'Luxury suite with living area and premium amenities.',
      pricePerNight: 150,
      features: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast Included', 'Mini Bar', 'Balcony']
    }
  ];

  bookRoom(room: any) {
    alert(`You selected to book: ${room.name}`);
    // Here you can route to booking form or open modal, etc.
  }
}