package com.example.service;


import com.example.dto.BookingResponse;
import com.example.entity.User;

public interface UserService {



    boolean register(User user);

    boolean login(String email, String password);

    User getUserByEmail(String email);



    // Optionally add if needed:
    // User getUserByCnic(String cnic);
}
