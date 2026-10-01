package com.harvesthub.dto;

import com.harvesthub.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Request and response shapes for /api/auth. */
public final class AuthDtos {

    private AuthDtos() {
    }

    public record RegisterRequest(
            @NotBlank(message = "Full name is required.") String fullName,
            @NotBlank(message = "Email is required.") @Email(message = "Please enter a valid email.") String email,
            String phone,
            @NotBlank(message = "Password is required.")
            @Size(min = 6, message = "Password must be at least 6 characters.") String password) {
    }

    public record LoginRequest(
            @NotBlank(message = "Email or phone number is required.") String identifier,
            @NotBlank(message = "Password is required.") String password) {
    }

    public record ForgotPasswordRequest(
            @NotBlank(message = "Email is required.") @Email(message = "Please enter a valid email.") String email) {
    }

    public record ProfileRequest(
            @NotBlank(message = "Full name is required.") String fullName,
            String phone) {
    }

    public record LoginResponse(String token, User user) {
    }

    public record MessageResponse(String message) {
    }
}
