import React from 'react';
import { useNotesStore } from '../store';

const ErrorMessage: React.FC = () => {
  const { error, clearError } = useNotesStore();

  if (!error) return null;

  return (
    <div className="error-message">
      <span>{error}</span>
      <button className="error-close" onClick={clearError}>
        ×
      </button>
    </div>
  );
};

export default ErrorMessage;