import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Room {
  number: string;
  floor: number;
  status: 'Available' | 'Reserved' | 'Occupied' | 'Maintenance';
  type: 'Standard' | 'Deluxe' | 'Suite';
  price: number;
}

@Component({
  selector: 'app-explore-room',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './explore-room.component.html',
  styleUrls: ['./explore-room.component.css']
})
export class ExploreRoomComponent {
  rooms: Room[] = [];
  selectedFloor: number = 1;
  floors: number[] = [1, 2, 3];
  selectedRoom: Room | null = null;
  showBookingModal: boolean = false;

  bookingData = {
    guestName: '',
    cnicNumber: '',
    phoneNumber: '',
    roomNumber: '',
    roomType: '',
    roomCategory: '',
    totalPrice: 0,
    checkIn: '',
    checkOut: '',
    totalNights: 0,
    specialRequests: '',
    pricePerNight: 0
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {
    this.generateRooms();
  }

  // Submit booking to backend
  onSubmit() {
    const formattedBookingData = {
      guestName: this.bookingData.guestName,
      cnicNumber: this.bookingData.cnicNumber,
      phoneNumber: this.bookingData.phoneNumber,
      roomNumber: this.bookingData.roomNumber,
      roomType: this.bookingData.roomType,
      pricePerNight: this.bookingData.pricePerNight,  // <-- Added
      checkIn: this.formatDateForBackend(this.bookingData.checkIn),
      checkOut: this.formatDateForBackend(this.bookingData.checkOut),
      specialRequests: this.bookingData.specialRequests
    };

    console.log('Booking Payload (JSON):', JSON.stringify(formattedBookingData, null, 2));

    this.http.post('http://localhost:8080/user/bookings', formattedBookingData, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          console.log('Booking SUCCESS:', res);
          this.successMessage = 'Booking successful! 🎉';
          this.errorMessage = '';

          if (this.selectedRoom) {
            this.selectedRoom.status = 'Reserved';
          }

          this.resetBookingForm();
          this.showBookingModal = false;

          // Auto-hide success popup
          setTimeout(() => { this.successMessage = ''; }, 4000);
        },
        error: (err) => {
          console.error('Booking FAILED:', err);
          this.errorMessage = 'Booking failed. Please try again.';
          this.successMessage = '';

          // Auto-hide error popup
          setTimeout(() => { this.errorMessage = ''; }, 4000);
        },
        complete: () => console.log('HTTP request completed')
      });
  }

  private formatDateForBackend(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  resetBookingForm() {
    this.bookingData = {
      guestName: '',
      cnicNumber: '',
      phoneNumber: '',
      roomNumber: '',
      roomType: '',
      roomCategory: '',
      totalPrice: 0,
      checkIn: '',
      checkOut: '',
      totalNights: 0,
      specialRequests: '',
      pricePerNight: 0
    };
  }

  generateRooms() {
    this.floors.forEach(floor => {
      const roomsCount = floor === 1 ? 20 : 25;
      for (let i = 1; i <= roomsCount; i++) {
        let type: 'Standard' | 'Deluxe' | 'Suite';
        let price: number;

        if (i <= roomsCount * 0.6) {
          type = 'Standard';
          price = floor === 1 ? 100 : floor === 2 ? 120 : 140;
        } else if (i <= roomsCount * 0.9) {
          type = 'Deluxe';
          price = floor === 1 ? 180 : floor === 2 ? 200 : 220;
        } else {
          type = 'Suite';
          price = floor === 1 ? 300 : floor === 2 ? 350 : 400;
        }

        const roomNumber = `${floor}${i.toString().padStart(2, '0')}`;
        this.rooms.push({ number: roomNumber, floor, status: 'Available', type, price });
      }
    });
  }

  getRoomsByFloor(floor: number): Room[] {
    return this.rooms.filter(room => room.floor === floor);
  }

  openBookingModal(room: Room) {
    if (room.status !== 'Available') return;

    this.selectedRoom = room;
    this.bookingData = {
      guestName: '',
      cnicNumber: '',
      phoneNumber: '',
      roomNumber: room.number,
      roomType: room.type,
      roomCategory: 'Luxury', 
      totalPrice: 0,
      checkIn: '',
      checkOut: '',
      totalNights: 0,
      specialRequests: '',
      pricePerNight: room.price
    };
    this.showBookingModal = true;
  }

  calculateNights() {
    if (this.bookingData.checkIn && this.bookingData.checkOut) {
      const checkInDate = new Date(this.bookingData.checkIn);
      const checkOutDate = new Date(this.bookingData.checkOut);

      if (checkOutDate <= checkInDate) {
        this.bookingData.totalNights = 0;
        this.bookingData.totalPrice = 0;
        return;
      }

      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      this.bookingData.totalNights = diffDays > 0 ? diffDays : 0;
      this.bookingData.totalPrice = this.bookingData.totalNights * this.bookingData.pricePerNight;
    }
  }

  getRoomImage(type: string): string {
    switch (type) {
      case 'Suite': return 'assets/suite-room.jpg';
      case 'Deluxe': return 'assets/deluxe-room.jpg';
      default: return 'assets/standard-room.jpg';
    }
  }
}
