import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseIntPipe,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { Books } from './books.model';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @Post()
    async create(@Body() createBooksDto: Books): Promise<Books> {
      return this.booksService.create(createBooksDto);
    }
  
    @Get()
    async findAll(): Promise<Books[]> {
      return this.booksService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Books> {
      const book = await this.booksService.findById(id);
      if (!book) {
        throw new HttpException(`Book with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return book;
    }
  
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: Partial<Books>): Promise<Books> {
      const updatedBook = await this.booksService.update(id, updateBookDto);
      if (!updatedBook) {
        throw new HttpException(`Book with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return updatedBook;
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
      const result = await this.booksService.delete(id);
      if (result.deletedCount === 0) {
        throw new HttpException(`Book with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return { message: `Book with ID ${id} successfully deleted` };
    }
  }
  