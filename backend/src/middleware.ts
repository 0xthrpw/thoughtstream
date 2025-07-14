import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err);
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
}

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
}

export function validateNoteCreation(req: Request, res: Response, next: NextFunction) {
  const { content } = req.body;
  
  if (content === undefined || content === null) {
    return res.status(400).json({
      error: 'Validation error',
      message: 'Content is required'
    });
  }
  
  next();
}

export function validateNoteUpdate(req: Request, res: Response, next: NextFunction) {
  const { content, title } = req.body;
  
  if (content === undefined && title === undefined) {
    return res.status(400).json({
      error: 'Validation error',
      message: 'At least one field (content or title) must be provided'
    });
  }
  
  next();
}