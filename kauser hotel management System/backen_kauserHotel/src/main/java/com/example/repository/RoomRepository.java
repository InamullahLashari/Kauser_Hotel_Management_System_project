package com.example.repository;

import com.example.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    // Find room by room number and return Room object
    Optional<Room> findByRoomNumber(String roomNumber);

    // If you also need a boolean for availability check:
    boolean existsByRoomNumberAndAvailableTrue(String roomNumber);
}
