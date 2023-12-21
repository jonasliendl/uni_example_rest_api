import { Book, Prisma, PrismaClient, User } from "@prisma/client";
import { Repository, RepositoryRelations } from "./repository";
import { BookWithAuthors } from "../resources/book.resource";

class BookRepository implements Repository<Book>, RepositoryRelations<BookWithAuthors> {
    private readonly _prisma: PrismaClient = new PrismaClient();

    async create(item: Book): Promise<Book> {
        const book = await this._prisma.book.create({
            data: {
                title: item.title,
                description: item.description,
                pageCount: item.pageCount,
                publishDate: item.publishDate
            },
        });
        if (!book) throw new Error("Error creating book");
        return book;
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
        const book = await this._prisma.book.findUnique({ 
            where: { id },
        });
        if (!book) throw new Error("Book not found");
        return book;
    }

    async addAuthor(bookId: number, authorId: number): Promise<void> {
        const book = await this._prisma.book.update({
            where: { id: bookId },
            data: { 
                authors: {
                    connect: { id: authorId }
                }
            },
        });
        if (!book) throw new Error("Error adding author");
    }

    async removeAuthor(bookId: number, authorId: number): Promise<void> {
        const book = await this._prisma.book.update({
            where: { id: bookId },
            data: { authors: { disconnect: { id: authorId } } },
        });
        if (!book) throw new Error("Error removing author");
    }

    async findWithRelations(): Promise<BookWithAuthors[]> {
        return await this._prisma.book.findMany({
            include: { authors: true },
        });
    }

    async findOneWithRelations(id: number): Promise<BookWithAuthors> {
        const book = await this._prisma.book.findUnique({
            where: { id },
            include: { authors: true },
        });
        if (!book) throw new Error("Book not found");
        return book;
    }
}

export default BookRepository;
