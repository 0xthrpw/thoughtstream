import { create } from 'zustand';
import { Note } from './types';
import { api } from './api';

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  loadNotes: () => Promise<void>;
  createNote: (content: string, title?: string) => Promise<Note>;
  updateNote: (id: string, updates: { content?: string; title?: string }) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setActiveNote: (id: string | null) => void;
  clearError: () => void;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  activeNoteId: null,
  loading: false,
  error: null,

  loadNotes: async () => {
    set({ loading: true, error: null });
    try {
      const notes = await api.getNotes();
      set({ notes, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load notes',
        loading: false 
      });
    }
  },

  createNote: async (content: string, title?: string) => {
    set({ loading: true, error: null });
    try {
      const note = await api.createNote(content, title);
      const { notes } = get();
      set({ 
        notes: [note, ...notes],
        activeNoteId: note.id,
        loading: false 
      });
      return note;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create note',
        loading: false 
      });
      throw error;
    }
  },

  updateNote: async (id: string, updates: { content?: string; title?: string }) => {
    set({ error: null });
    try {
      const updatedNote = await api.updateNote(id, updates);
      const { notes } = get();
      set({
        notes: notes.map(note => note.id === id ? updatedNote : note)
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update note'
      });
    }
  },

  deleteNote: async (id: string) => {
    set({ error: null });
    try {
      await api.deleteNote(id);
      const { notes, activeNoteId } = get();
      const updatedNotes = notes.filter(note => note.id !== id);
      const newActiveId = activeNoteId === id 
        ? (updatedNotes.length > 0 ? updatedNotes[0].id : null)
        : activeNoteId;
      
      set({
        notes: updatedNotes,
        activeNoteId: newActiveId
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete note'
      });
    }
  },

  setActiveNote: (id: string | null) => {
    set({ activeNoteId: id });
  },

  clearError: () => {
    set({ error: null });
  },
}));