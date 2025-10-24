package com.example.controller;

import com.example.service.BookingServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

/**
 * Admin controller for managing room-related operations such as
 * releasing expired rooms.
 */
@RestController
@RequestMapping("/admin")
public class RoomAdminController {

    private final BookingServiceImpl bookingService;

    public RoomAdminController(BookingServiceImpl bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * Release rooms whose checkout date has passed (default today)
     * Can be used with scheduler as well.
     */
    @PostMapping("/release-rooms")
    public ResponseEntity<String> releaseExpiredRoomsDefault() {
        bookingService.releaseExpiredRooms(); // uses LocalDate.now()
        return ResponseEntity.ok("Expired rooms released for today");
    }

    /**
     * Release rooms for a specific date (custom)
     * Example Postman request: POST /admin/release-rooms/date?date=2025-08-14
     */
    @PostMapping("/release-rooms/date")
    public ResponseEntity<String> releaseExpiredRoomsByDate(@RequestParam String date) {
        LocalDate checkDate = LocalDate.parse(date); // format: YYYY-MM-DD
        bookingService.releaseExpiredRooms(checkDate);
        return ResponseEntity.ok("Expired rooms released before " + date);
    }
}
