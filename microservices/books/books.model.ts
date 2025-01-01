import { Schema, Document } from 'mongoose';

export interface Books extends Document {
  readonly id: number;
  readonly name: string;
  readonly description: string;
}

export const BooksSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
