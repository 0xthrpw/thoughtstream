import React from 'react';
import { useNotesStore } from '../store';
import { Note } from '../types';
import ThemeToggle from './ThemeToggle';

const Sidebar: React.FC = () => {
  const { 
    notes, 
    activeNoteId, 
    loading, 
    createNote, 
    setActiveNote, 
    deleteNote 
  } = useNotesStore();

  const handleCreateNote = async () => {
    try {
      await createNote('');
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleDeleteNote = async (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(noteId);
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  };

  const formatPreview = (content: string): string => {
    return content.replace(/\n/g, ' ').trim().substring(0, 50) || 'Empty note';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <h1>Thoughtstream</h1>
          <ThemeToggle />
        </div>
        <button 
          className="new-note-btn" 
          onClick={handleCreateNote}
          disabled={loading}
        >
          + New Note
        </button>
      </div>
      
      <div className="notes-list">
        {notes.map((note: Note) => (
          <div
            key={note.id}
            className={`note-tab ${activeNoteId === note.id ? 'active' : ''}`}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="note-tab-content">
              <div className="note-tab-title">{note.title}</div>
              <div className="note-tab-preview">
                {formatPreview(note.content)}
              </div>
            </div>
            <button
              className="note-tab-close"
              onClick={(e) => handleDeleteNote(note.id, e)}
              title="Delete note"
            >
              ×
            </button>
          </div>
        ))}
        
        {notes.length === 0 && !loading && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
            No notes yet. Create your first note!
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;