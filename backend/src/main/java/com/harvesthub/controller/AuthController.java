package com.harvesthub.controller;

import com.harvesthub.dto.AuthDtos.LoginRequest;
import com.harvesthub.dto.AuthDtos.LoginResponse;
import com.harvesthub.dto.AuthDtos.ProfileRequest;
import com.harvesthub.dto.AuthDtos.RegisterRequest;
import com.harvesthub.exception.ApiException;
import com.harvesthub.model.User;
import com.harvesthub.repository.UserRepository;
import com.harvesthub.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@Valid @RequestBody RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "An account with this email already exists.");
        }

        User user = new User();
        user.setFullName(request.fullName().trim());
        user.setEmail(email);
        user.setPhone(request.phone());
        user.setPassword(passwordEncoder.encode(request.password()));
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        String identifier = request.identifier().trim();
        User user = userRepository.findByEmailOrPhone(identifier.toLowerCase(), identifier)
                .filter(found -> passwordEncoder.matches(request.password(), found.getPassword()))
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password."));

        return new LoginResponse(jwtUtil.generateToken(user.getId()), user);
    }

    @GetMapping("/me")
    public User me(@AuthenticationPrincipal String userId) {
        return findUser(userId);
    }

    @PutMapping("/profile")
    public User updateProfile(@Valid @RequestBody ProfileRequest request, @AuthenticationPrincipal String userId) {
        User user = findUser(userId);
        user.setFullName(request.fullName().trim());
        user.setPhone(request.phone());
        return userRepository.save(user);
    }

    private User findUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Please log in again."));
    }
}
