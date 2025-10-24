package com.example.service;



import com.example.dto.BookingResponse;
import com.example.entity.Booking;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

public interface BookingServiceInterface
 {
    boolean recordBooking(BookingResponse booking);
    void releaseExpiredRooms();


     @Transactional
     void releaseExpiredRooms(LocalDate date);
     // Other booking-related methods...
}

