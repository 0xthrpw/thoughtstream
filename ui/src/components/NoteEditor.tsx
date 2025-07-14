import React, { useState, useEffect, useCallback } from 'react';
import { useNotesStore } from '../store';
import { Note } from '../types';

const NoteEditor: React.FC = () => {
  const { notes, activeNoteId, updateNote } = useNotesStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  const activeNote = notes.find((note: Note) => note.id === activeNoteId);

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [activeNote]);

  const debouncedSave = useCallback(
    (noteId: string, updates: { title?: string; content?: string }) => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      const timeout = setTimeout(() => {
        updateNote(noteId, updates);
      }, 500);

      setSaveTimeout(timeout);
    },
    [updateNote, saveTimeout]
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    if (activeNoteId && newTitle !== activeNote?.title) {
      debouncedSave(activeNoteId, { title: newTitle });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    if (activeNoteId && newContent !== activeNote?.content) {
      debouncedSave(activeNoteId, { content: newContent });
    }
  };

  if (!activeNote) {
    return (
      <div className="empty-state">
        <h2>Welcome to Thoughtstream</h2>
        <p>Select a note from the sidebar or create a new one to get started.</p>
      </div>
    );
  }

  return (
    <div className="note-editor">
      <div className="note-header">
        <input
          type="text"
          className="note-title-input"
          value={title}
          onChange={handleTitleChange}
          placeholder="Note title..."
        />
      </div>
      
      <textarea
        className="note-content-textarea"
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing your thoughts..."
      />
    </div>
  );
};

export default NoteEditor;