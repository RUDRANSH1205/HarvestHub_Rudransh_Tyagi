/*
  Browser-saved store used only while USE_MOCK_DATA is true, so accounts and
  their data survive page reloads. With the Spring Boot backend enabled,
  MongoDB stores everything instead and this file is not used.
*/
const STORE_PREFIX = 'harvesthub_mock_'

export function loadMock(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const saved = localStorage.getItem(STORE_PREFIX + key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export function saveMock(key, value) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORE_PREFIX + key, JSON.stringify(value))
}
