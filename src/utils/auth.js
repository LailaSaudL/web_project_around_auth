// src/utils/auth.js
// API functions for user registration and authentication

export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// Helper function to check response with detailed error messages
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // Return error with status code for better error handling
  return res.json().then((err) => {
    return Promise.reject({ status: res.status, message: err.message || err.error });
  }).catch(() => {
    return Promise.reject({ status: res.status, message: `Error: ${res.status}` });
  });
}

// Register a new user
// Response: { data: { email, _id } }
// Error 400: one of the fields was filled incorrectly
export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

// Login user and get token
// Response: { token }
// Error 400: one or more fields not provided
// Error 401: user not found with specified email
export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

// Check if token is valid and get user data
// Response: { data: { email, _id } }
// Error 400: token not provided or wrong format
// Error 401: token is invalid
export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
