export interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  userId?: string;
}

export interface CreateNoteRequest {
  content: string;
  title?: string;
}

export interface UpdateNoteRequest {
  content?: string;
  title?: string;
}