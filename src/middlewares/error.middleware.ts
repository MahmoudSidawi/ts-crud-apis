import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate key error',
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val: any) => val.message).join(', ');
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found or invalid ID',
    });
  }

  // Default server error
  console.error('Server error:', err);
  return res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
