package com.example.service;

import com.example.entity.Booking;
import com.example.entity.Room;
import com.example.repository.BookingRepository;
import com.example.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public BookingService(BookingRepository bookingRepository, RoomRepository roomRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    /**
     * Create a booking and mark room as reserved
     */
    @Transactional
    public Booking createBooking(Booking booking) {
        Room room = booking.getRoom();
        room.setAvailable(false); // mark room as reserved
        roomRepository.save(room);
        return bookingRepository.save(booking);
    }

    /**
     * Release rooms automatically whose checkout date has passed
     */
    @Transactional
    public void releaseExpiredRooms() {
        LocalDate today = LocalDate.now();
        List<Booking> expiredBookings = bookingRepository.findByCheckOutDateBefore(today);

        for (Booking booking : expiredBookings) {
            Room room = booking.getRoom();
            if (!room.isAvailable()) {
                room.setAvailable(true); // mark room free
                roomRepository.save(room);
            }
        }
    }
}
