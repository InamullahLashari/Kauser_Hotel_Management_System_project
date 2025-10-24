package com.example.scheduler;

import com.example.service.BookingService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class RoomScheduler {
    private final BookingService bookingService;

    public RoomScheduler(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Scheduled(fixedRate = 3600000) // Runs every hour
    public void autoReleaseRooms() {
        bookingService.releaseExpiredRooms();
    }
}