import { Note } from './types';

const API_BASE = '/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new ApiError(response.status, errorData.message || 'Request failed');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  async getNotes(): Promise<Note[]> {
    return fetchApi<Note[]>('/notes');
  },

  async getNote(id: string): Promise<Note> {
    return fetchApi<Note>(`/notes/${id}`);
  },

  async createNote(content: string, title?: string): Promise<Note> {
    return fetchApi<Note>('/notes', {
      method: 'POST',
      body: JSON.stringify({ content, title }),
    });
  },

  async updateNote(id: string, updates: { content?: string; title?: string }): Promise<Note> {
    return fetchApi<Note>(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteNote(id: string): Promise<void> {
    return fetchApi<void>(`/notes/${id}`, {
      method: 'DELETE',
    });
  },
};