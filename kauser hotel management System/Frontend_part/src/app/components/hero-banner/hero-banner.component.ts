import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css']
})
export class HeroBannerComponent implements OnInit, OnDestroy {

 
   

  images: string[] = [
    'assets/pic1.jpg',
    'assets/pic2.jpg',
    'assets/pic3.jpg',
    'assets/pic4.jpg'
  ];

  currentIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.startSlideshow();
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
 @Output() bookingClicked = new EventEmitter<void>();
  onBooking() {
    this.bookingClicked.emit();
  }

@Output() roomsExplore = new EventEmitter<void>();

onRoomsExploreClick() {
  this.roomsExplore.emit();
}


}