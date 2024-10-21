package com.freakcap.bookExchange.BookExchangeApp.controller;

import com.freakcap.bookExchange.BookExchangeApp.config.JwtTokenService;
import com.freakcap.bookExchange.BookExchangeApp.model.LoginRequest;
import com.freakcap.bookExchange.BookExchangeApp.model.User;
import com.freakcap.bookExchange.BookExchangeApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        if (userService.findUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
            // Email already exists then respond with a conflict
        }
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> optionalUser = userService.findUserByEmail(loginRequest.getEmail());
        if (optionalUser.isPresent() && userService.checkPassword(optionalUser.get(), loginRequest.getPassword())) {
            String token = jwtTokenService.generateToken(optionalUser.get());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
