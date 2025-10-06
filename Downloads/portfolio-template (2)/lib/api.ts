// API client for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.aenfinite.com"
const API_URL = `${API_BASE_URL}/api`

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken")
  }
  return null
}

// Helper function to make authenticated requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }))
    throw new Error(error.error || "Request failed")
  }

  return response.json()
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchWithAuth("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },
  register: async (username: string, email: string, password: string) => {
    return fetchWithAuth("/admin/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    })
  },
}

// Projects API
export const projectsAPI = {
  getAll: async (category?: string) => {
    const url = category ? `/projects?category=${category}` : "/projects"
    return fetchWithAuth(url)
  },
  getById: async (id: string) => {
    return fetchWithAuth(`/projects/${id}`)
  },
  // Admin endpoints
  getAllAdmin: async () => {
    return fetchWithAuth("/admin/projects")
  },
  create: async (projectData: any) => {
    return fetchWithAuth("/admin/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    })
  },
  update: async (id: string, projectData: any) => {
    return fetchWithAuth(`/admin/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    })
  },
  delete: async (id: string) => {
    return fetchWithAuth(`/admin/projects/${id}`, {
      method: "DELETE",
    })
  },
}

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/categories`)
    if (!response.ok) throw new Error("Failed to fetch categories")
    return response.json()
  },

  getAllAdmin: async () => {
    return fetchWithAuth("/admin/categories")
  },

  getBySlug: async (slug: string) => {
    const response = await fetch(`${API_URL}/categories/${slug}`)
    if (!response.ok) throw new Error("Failed to fetch category")
    return response.json()
  },

  create: async (data: any) => {
    const token = localStorage.getItem("adminToken")
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to create category")
    }
    return response.json()
  },

  update: async (id: string, data: any) => {
    const token = localStorage.getItem("adminToken")
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to update category")
    }
    return response.json()
  },

  delete: async (id: string) => {
    const token = localStorage.getItem("adminToken")
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to delete category")
    }
    return response.json()
  },
}
