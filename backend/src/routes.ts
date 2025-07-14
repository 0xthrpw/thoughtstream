import { Router, Request, Response } from 'express';
import { NoteService } from './noteService.js';
import { validateNoteCreation, validateNoteUpdate } from './middleware.js';

const router = Router();
const noteService = new NoteService();

router.get('/notes', async (req: Request, res: Response) => {
  try {
    const notes = await noteService.getAllNotes();
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

router.get('/notes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await noteService.getNote(id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

router.post('/notes', validateNoteCreation, async (req: Request, res: Response) => {
  try {
    const note = await noteService.createNote(req.body);
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

router.put('/notes/:id', validateNoteUpdate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await noteService.updateNote(id, req.body);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

router.delete('/notes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await noteService.deleteNote(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;