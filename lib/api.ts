export interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

class ApiClient {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
    localStorage.setItem("token", token)
  }

  clearToken() {
    this.token = null
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Simulate API call with dummy data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - accept any email/password for demo
    const user: User = {
      id: 1,
      name: email
        .split("@")[0]
        .replace(/[^a-zA-Z]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      createdAt: new Date().toISOString(),
    }

    const token = "mock-jwt-token-" + Date.now()

    return { user, token }
  }

  async register(data: { name: string; email: string; password: string }): Promise<{ user: User; token: string }> {
    // Simulate API call with dummy data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      createdAt: new Date().toISOString(),
    }

    const token = "mock-jwt-token-" + Date.now()

    return { user, token }
  }
}

export const apiClient = new ApiClient()
