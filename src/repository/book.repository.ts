import { Book, PrismaClient } from "@prisma/client";
import { Repository } from "./repository";

class BookRepository implements Repository<Book> {
    private readonly _prisma: PrismaClient = new PrismaClient();

    async create(item: Book): Promise<Book> {
        const user = await this._prisma.book.create({
            data: {
                title: item.title,
                description: item.description,
                pageCount: item.pageCount,
                publishDate: item.publishDate,
                authors: item.authors,
            },
        });
        if (!user) throw new Error("Error creating book");
        return user;
    }

    async update(id: number, item: Book): Promise<Book> {
        const updatedBook = await this._prisma.book.update({
            where: { id },
            data: item,
        });
        if (!updatedBook) throw new Error("Error updating book");
        return updatedBook;
    }

    async delete(id: number): Promise<boolean> {
        const book = await this._prisma.book.delete({ where: { id } });
        if (!book) return false;
        return true;
    }

    async find(): Promise<Book[]> {
        return await this._prisma.book.findMany();
    }

    async findOne(id: number): Promise<Book> {
        const book = await this._prisma.book.findUnique({ where: { id } });
        if (!book) throw new Error("Book not found");
        return book;
    }
}

export default BookRepository;
