package com.example.repository;

import com.example.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Find bookings where checkout date has passed
    List<Booking> findByCheckOutDateBefore(LocalDate date);

    // Find active bookings (checkout in future)
    List<Booking> findByCheckOutDateAfter(LocalDate date);
}
