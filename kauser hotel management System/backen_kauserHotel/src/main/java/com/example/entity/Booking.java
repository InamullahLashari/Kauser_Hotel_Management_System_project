package com.example.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * Booking entity represents a hotel room booking by a user.
 *
 * USER ENTERS:
 *  - guestName
 *  - cnic
 *  - phoneNumber
 *  - specialRequest (optional)
 *  - checkInDate
 *  - checkOutDate
 *  - room (reference)
 *
 * BACKEND CALCULATES:
 *  - nights (checkOutDate - checkInDate)
 *  - totalPrice (room price * nights)
 *  - roomCategory (from Room entity)
 */
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    // ----- USER ENTERS -----
    @Column(nullable = false)
    private String guestName;

    @Column(nullable = false)
    private String roomNumber;


    @Column(nullable = false, unique = true, length = 15)
    private String cnic;

    @Column(nullable = false, length = 15)
    private String phoneNumber;

    @Column(length = 255)
    private String specialRequest;

    @Column(nullable = false)
    private LocalDate checkInDate;

    @Column(nullable = false)
    private LocalDate checkOutDate;

    // ----- RELATIONSHIPS -----
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ----- BACKEND CALCULATES -----
    @Column(nullable = false)
    private int nights;

    @Column(nullable = false)
    private double totalPrice;

    @Column(nullable = false)
    private String roomCategory;

    // ----- CONSTRUCTORS -----
    public Booking() {}


    public Booking(Long id, String guestName, String roomNumber, String cnic, String phoneNumber, String specialRequest, LocalDate checkInDate, LocalDate checkOutDate, Room room, User user, int nights, double totalPrice, String roomCategory) {
        this.id = id;
        this.guestName = guestName;
        this.roomNumber = roomNumber;
        this.cnic = cnic;
        this.phoneNumber = phoneNumber;
        this.specialRequest = specialRequest;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.room = room;
        this.user = user;
        this.nights = nights;
        this.totalPrice = totalPrice;
        this.roomCategory = roomCategory;
    }

    // ----- GETTERS & SETTERS -----
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public String getCnic() { return cnic; }
    public void setCnic(String cnic) { this.cnic = cnic; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getSpecialRequest() { return specialRequest; }
    public void setSpecialRequest(String specialRequest) { this.specialRequest = specialRequest; }

    public LocalDate getCheckInDate() { return checkInDate; }
    public void setCheckInDate(LocalDate checkInDate) { this.checkInDate = checkInDate; }

    public LocalDate getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; }

    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public int getNights() { return nights; }
    public void setNights(int nights) { this.nights = nights; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public String getRoomCategory() { return roomCategory; }
    public void setRoomCategory(String roomCategory) { this.roomCategory = roomCategory; }
}
