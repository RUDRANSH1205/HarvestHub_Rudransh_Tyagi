'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '@/lib/api/auth-service'
import { TOKEN_KEY, USER_KEY } from '@/lib/api/config'

const AuthContext = createContext(null)

/*
  Keeps track of the logged-in user.
  "Remember Me" stores the session in localStorage (survives browser restarts),
  otherwise sessionStorage is used (cleared when the tab closes).
*/
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY)
    if (saved) setUser(JSON.parse(saved))
    setIsReady(true)
  }, [])

  function saveSession(token, userData, remember) {
    const storage = remember ? localStorage : sessionStorage
    storage.setItem(TOKEN_KEY, token)
    storage.setItem(USER_KEY, JSON.stringify(userData))
  }

  async function login(email, password, remember) {
    const { token, user: loggedInUser } = await authService.login(email, password)
    saveSession(token, loggedInUser, remember)
    setUser(loggedInUser)
  }

  function logout() {
    ;[localStorage, sessionStorage].forEach((storage) => {
      storage.removeItem(TOKEN_KEY)
      storage.removeItem(USER_KEY)
    })
    setUser(null)
  }

  async function updateProfile(data) {
    const updated = await authService.updateProfile(user.id, data)
    const storage = localStorage.getItem(USER_KEY) ? localStorage : sessionStorage
    storage.setItem(USER_KEY, JSON.stringify(updated))
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, isReady, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
