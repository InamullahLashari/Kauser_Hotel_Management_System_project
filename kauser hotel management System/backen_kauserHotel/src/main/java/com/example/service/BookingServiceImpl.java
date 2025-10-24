package com.example.service;

import com.example.dto.BookingResponse;
import com.example.entity.Booking;
import com.example.entity.Room;
import com.example.entity.User;
import com.example.repository.BookingRepository;
import com.example.repository.RoomRepository;
import com.example.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingServiceInterface {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    public BookingServiceImpl(UserRepository userRepository,
                              RoomRepository roomRepository,
                              BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    // ============================
    // Booking creation
    // ============================



    @Override
    @Transactional
    public boolean recordBooking(BookingResponse booked) {
        // 1️⃣ Find user by CNIC
        User validUser = userRepository.findByCnic(booked.getCnicNumber())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with CNIC"));

        // 2️⃣ Validate check-in and check-out
        if (!booked.getCheckIn().isBefore(booked.getCheckOut())) {
            throw new RuntimeException("Check-in date must be before check-out date");
        }

        // 3️⃣ Calculate total nights
        int totalNights = (int) ChronoUnit.DAYS.between(booked.getCheckIn(), booked.getCheckOut());

        // 4️⃣ Check if room exists
        Optional<Room> existingRoom = roomRepository.findByRoomNumber(booked.getRoomNumber());
        if (existingRoom.isPresent()) {
            throw new RuntimeException("Room is already reserved");
        }

        // 5️⃣ Calculate total price
        double totalPrice = totalNights * booked.getTotalPrice();

        // 6️⃣ Create and save room
        Room room = new Room();
        room.setRoomNumber(booked.getRoomNumber());
        room.setAvailable(false);
        room.setPrice(totalPrice);
        room.setRoomType(booked.getRoomType());
        room.setTotalNights(totalNights);
        roomRepository.save(room);

        // 7️⃣ Create and save booking
        Booking booking = new Booking();
        booking.setGuestName(booked.getGuestName());
        booking.setCnic(booked.getCnicNumber());
        booking.setPhoneNumber(booked.getPhoneNumber());
        booking.setRoomCategory(room.getRoomType());
        booking.setRoomNumber(room.getRoomNumber());
        booking.setCheckInDate(booked.getCheckIn());
        booking.setCheckOutDate(booked.getCheckOut());
        booking.setNights(totalNights);
        booking.setTotalPrice(totalPrice);
        booking.setSpecialRequest(booked.getSpecialRequests());
        booking.setUser(validUser);
        booking.setRoom(room);

        bookingRepository.save(booking);

        return true;
    }

    // ============================
    // Release expired rooms (default - today)
    // ============================
    @Override
    @Transactional
    public void releaseExpiredRooms() {
        releaseExpiredRooms(LocalDate.now());
    }



    // ============================
    // Release expired rooms (custom date)
    // ============================
    @Override
    @Transactional
    public void releaseExpiredRooms(LocalDate date) {
        bookingRepository.findByCheckOutDateBefore(date)
                .forEach(booking -> {
                    Room room = booking.getRoom();
                    if (!room.isAvailable()) {
                        room.setAvailable(true);
                        roomRepository.save(room);
                    }
                });
    }




}
