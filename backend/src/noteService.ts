import { v4 as uuidv4 } from 'uuid';
import { redisClient } from './redis.js';
import { Note, CreateNoteRequest, UpdateNoteRequest } from './types.js';

const NOTES_KEY = 'notes';
const NOTE_PREFIX = 'note:';

export class NoteService {
  private generateNoteId(): string {
    return uuidv4();
  }

  private generateTitle(): string {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `Note ${date} ${time}`;
  }

  private getNoteKey(id: string): string {
    return `${NOTE_PREFIX}${id}`;
  }

  async createNote(request: CreateNoteRequest, userId?: string): Promise<Note> {
    const id = this.generateNoteId();
    const title = request.title || this.generateTitle();
    const timestamp = new Date().toISOString();

    const note: Note = {
      id,
      title,
      content: request.content,
      timestamp,
      userId
    };

    const noteData: Record<string, string> = {
      id: note.id,
      title: note.title,
      content: note.content,
      timestamp: note.timestamp,
      ...(note.userId && { userId: note.userId })
    };

    await redisClient.hSet(this.getNoteKey(id), noteData);
    await redisClient.sAdd(NOTES_KEY, id);

    return note;
  }

  async getNote(id: string): Promise<Note | null> {
    const noteData = await redisClient.hGetAll(this.getNoteKey(id));
    
    if (!noteData || Object.keys(noteData).length === 0) {
      return null;
    }

    return {
      id: noteData.id,
      title: noteData.title,
      content: noteData.content,
      timestamp: noteData.timestamp,
      userId: noteData.userId
    };
  }

  async getAllNotes(): Promise<Note[]> {
    const noteIds = await redisClient.sMembers(NOTES_KEY);
    const notes: Note[] = [];

    for (const id of noteIds) {
      const note = await this.getNote(id);
      if (note) {
        notes.push(note);
      }
    }

    return notes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async updateNote(id: string, request: UpdateNoteRequest): Promise<Note | null> {
    const existingNote = await this.getNote(id);
    if (!existingNote) {
      return null;
    }

    const updatedNote: Note = {
      ...existingNote,
      ...(request.title && { title: request.title }),
      ...(request.content !== undefined && { content: request.content })
    };

    const noteData: Record<string, string> = {
      id: updatedNote.id,
      title: updatedNote.title,
      content: updatedNote.content,
      timestamp: updatedNote.timestamp,
      ...(updatedNote.userId && { userId: updatedNote.userId })
    };

    await redisClient.hSet(this.getNoteKey(id), noteData);
    return updatedNote;
  }

  async deleteNote(id: string): Promise<boolean> {
    const exists = await redisClient.exists(this.getNoteKey(id));
    if (!exists) {
      return false;
    }

    await redisClient.del(this.getNoteKey(id));
    await redisClient.sRem(NOTES_KEY, id);
    return true;
  }
}