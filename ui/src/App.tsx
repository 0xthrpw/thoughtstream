import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import ErrorMessage from './components/ErrorMessage';
import { useNotesStore } from './store';
import { useTheme } from './hooks/useTheme';
import './App.css';

const App: React.FC = () => {
  const { loadNotes, loading } = useNotesStore();
  useTheme(); // Initialize theme

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <ErrorMessage />
        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : (
          <NoteEditor />
        )}
      </div>
    </div>
  );
};

export default App;