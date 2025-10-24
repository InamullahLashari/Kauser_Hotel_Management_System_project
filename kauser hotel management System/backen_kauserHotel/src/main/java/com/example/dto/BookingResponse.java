package com.example.dto;

import java.time.LocalDate;

public class BookingResponse {
    private String guestName;
    private String cnicNumber; // Added CNIC
    private String roomNumber;
    private String roomType;
    private double pricePerNight;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private int totalNights;
    private double totalPrice;
    private String specialRequests;
    private String phoneNumber;

    public String getPhoneNumber() { return phoneNumber; }



    // Getters and Setters
    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getCnicNumber() { return cnicNumber; }
    public void setCnicNumber(String cnicNumber) { this.cnicNumber = cnicNumber; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public double getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(double pricePerNight) { this.pricePerNight = pricePerNight; }

    public LocalDate getCheckIn() { return checkIn; }
    public void setCheckIn(LocalDate checkIn) { this.checkIn = checkIn; }

    public LocalDate getCheckOut() { return checkOut; }
    public void setCheckOut(LocalDate checkOut) { this.checkOut = checkOut; }

    public int getTotalNights() { return totalNights; }
    public void setTotalNights(int totalNights) { this.totalNights = totalNights; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }
}
