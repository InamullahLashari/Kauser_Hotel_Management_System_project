package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String roomNumber;

    @Column
    private String roomType; // Single, Double, Suite, etc.

    @Column
    private Double price;

    @Column
    private boolean available = true; // dynamically updated by service

    @Column
    private Integer totalNights; // total nights for current booking

    public Room() {}

    public Room(String roomNumber, String roomType, Double price) {
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.price = price;
        this.available = true;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public Integer getTotalNights() { return totalNights; }
    public void setTotalNights(Integer totalNights) { this.totalNights = totalNights; }

}
