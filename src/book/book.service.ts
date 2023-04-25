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

    // async updateBookDetails(id: number, title: string, details: string, author: string, stock: number) {
    //     const book = await BookEnity.findOneBy({ id: id })
    //     if (book) {
    //         book.title = title;
    //         book.details = details;
    //         book.author = author;
    //         book.stock = stock;
    //         await book.save();
    //         return book;
    //     }
    //     else {
    //         return "Book not found"
    //     }
        
    // }
}
