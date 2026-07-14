const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : '')

function apiUrl(path) {
  if (!API_URL) {
    throw new Error('VITE_API_URL is not configured')
  }

  return `${API_URL}${path}`
}

async function request(path, options = {}) {
  const headers = {
    ...options.headers,
  }

  if (options.body) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(apiUrl(path), {
    headers,
    ...options,
  })

  if (response.status === 204) {
    return null
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'API request failed')
  }

  return data
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
}
