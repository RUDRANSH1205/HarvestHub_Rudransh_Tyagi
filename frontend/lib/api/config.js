/*
  ===================================================================
  API CONFIGURATION  (Spring Boot backend)
  ===================================================================
  1. Start your Spring Boot app (default: http://localhost:8080)
  2. Set NEXT_PUBLIC_API_BASE_URL in your env, or edit the fallback below
  3. Change USE_MOCK_DATA to false

  Every page will then call your REST API instead of the sample data.
  Remember to enable CORS in Spring Boot for this frontend's origin.
  ===================================================================
*/

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

// Set NEXT_PUBLIC_USE_MOCK_DATA=false once the Spring Boot backend (see /backend) is running
export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false'

export const TOKEN_KEY = 'harvesthub_token'
export const USER_KEY = 'harvesthub_user'

export function getCurrentUserId() {
  if (typeof window === 'undefined') return null
  const saved = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY)
  return saved ? JSON.parse(saved).id : null
}

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
}

/**
 * Small wrapper around fetch() for calling the Spring Boot REST API.
 * Automatically sends JSON and the JWT token (if logged in).
 */
export async function apiRequest(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  // DELETE requests usually return 204 No Content
  if (response.status === 204) return null
  return response.json()
}

// Fake network delay so loading states are visible while using mock data
export function mockDelay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
