import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Books } from './books.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private readonly booksModel: Model<Books>, 
  ) {}

  async create(book: Books): Promise<Books> {
    const newBook = new this.booksModel(book);
    return newBook.save();
  }

  async findAll(): Promise<Books[]> {
    return this.booksModel.find().exec();
  }

  async findById(id: number): Promise<Books> {
    return this.booksModel.findOne({ id }).exec();
  }

  async update(id: number, updateData: Partial<Books>): Promise<Books> {
    return this.booksModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
  }

  async delete(id: number): Promise<{ deletedCount?: number }> {
    return this.booksModel.deleteOne({ id }).exec();
  }
}
