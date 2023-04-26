import { UpdateBookDto } from './DTO/updateBook.dto';
import { CreateBookDto } from './DTO/createBook.dto';
import { Injectable } from '@nestjs/common';
import { BookEnity } from './Entity/book.entity';
import { title } from 'process';

@Injectable()
export class BookService {
    async getBooks() {
        return await BookEnity.find();
    }

    async addBook(createBookDto:CreateBookDto) {
        const book = new BookEnity();
        book.title = createBookDto.title;
        book.details = createBookDto.details;
        book.author =createBookDto.author;
        book.stock = createBookDto.stock;
        await book.save();
        return book;
    }

    async updateBookDetails(id: number,updateBookDto:UpdateBookDto) {
        const book = await BookEnity.findOneBy({ id: id })
        if (book) {
            book.title = updateBookDto.title;
            book.details = updateBookDto.details;
            book.author = updateBookDto.author;
            book.stock = updateBookDto.stock;
            await book.save();
            return book;
        }
        else {
            return "Book not found"
        }
        
    }

    async deleteBook(id: number) {
        const book = await BookEnity.findOneBy({ id: id })
        if (book) {
            await book.remove();
            return `book deleted successfully`;
        }
        else {
            return "Book not found"
        }
        
    }
}
