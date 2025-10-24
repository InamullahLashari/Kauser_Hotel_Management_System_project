package com.example.controller;

import com.example.dto.BookingResponse;
import com.example.entity.User;
import com.example.service.BookingServiceInterface;
import com.example.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BookingServiceInterface BS;

    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@RequestBody BookingResponse dto, Authentication authentication) {
        try {

            boolean saved = BS.recordBooking(dto);
            if (saved) return ResponseEntity.ok("Booking saved");
            else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Booking failed");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        boolean check = userService.register(user);
        if (check) {
            return ResponseEntity.ok("User registered successfully");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
    }

    @GetMapping("/login")
    public ResponseEntity<String> loginSuccess(Authentication authentication) {
        String message = "Successfully logged in as: " + authentication.getName();
        System.out.println(message);  // Log to console
        return ResponseEntity.ok(message);
    }
}
