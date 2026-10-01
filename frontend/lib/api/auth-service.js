import { apiRequest, mockDelay, USE_MOCK_DATA } from './config'
import { loadMock, saveMock } from './mock-store'
import { mockUsers } from '../mock-data'

/*
  Placeholder Spring Boot auth endpoints:

    POST /api/auth/register          body: { fullName, email, phone, password }
    POST /api/auth/login             body: { email, password }  -> { token, user }
    PUT  /api/auth/profile           body: { fullName, phone }   -> user
*/

function getUsers() {
  return loadMock('users', mockUsers)
}

function saveUsers(users) {
  saveMock('users', users)
}

function withoutPassword(user) {
  const { password, ...safeUser } = user
  return safeUser
}

export const authService = {
  async register(data) {
    if (!USE_MOCK_DATA) return apiRequest('/api/auth/register', { method: 'POST', body: data })
    await mockDelay(500)
    const users = getUsers()
    const exists = users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())
    if (exists) throw new Error('An account with this email already exists.')
    const newUser = { ...data, id: `u-${Date.now()}` }
    saveUsers([...users, newUser])
    return withoutPassword(newUser)
  },

  async login(identifier, password) {
    if (!USE_MOCK_DATA) return apiRequest('/api/auth/login', { method: 'POST', body: { identifier, password } })
    await mockDelay(500)
    const normalized = identifier.trim().toLowerCase()
    const user = getUsers().find((u) => (u.email.toLowerCase() === normalized || u.phone === identifier.trim()) && u.password === password)
    if (!user) throw new Error('Invalid email or password.')
    return { token: `mock-token-${user.id}`, user: withoutPassword(user) }
  },

  async updateProfile(userId, data) {
    if (!USE_MOCK_DATA) return apiRequest('/api/auth/profile', { method: 'PUT', body: data })
    await mockDelay(400)
    const users = getUsers().map((u) => (u.id === userId ? { ...u, ...data } : u))
    saveUsers(users)
    const updated = users.find((u) => u.id === userId)
    return updated ? withoutPassword(updated) : { id: userId, ...data }
  },
}
