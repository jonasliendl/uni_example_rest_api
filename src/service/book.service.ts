import { Book } from "@prisma/client";
import { Service, ServiceRelations } from "./service";
import BookRepository from "../repository/book.repository";
import { BookWithAuthors } from "../resources/book.resource";

class BookService implements Service<Book>, ServiceRelations<BookWithAuthors> {
    private readonly _repository = new BookRepository();

    private validate(item: Book): void {
        if (item.title.length > 100) throw new Error("Title is too long");
        if (item.description.length > 1000) throw new Error("Description is too long");
        if (item.pageCount < 1) throw new Error("Page count is too small");
    }

    async create(item: Book): Promise<Book> {
        this.validate(item);
        return await this._repository.create(item);
    }

    async update(id: number, item: Book): Promise<Book> {
        this.validate(item);
        return await this._repository.update(id, item);
    }

    async delete(id: number): Promise<boolean> {
        return await this._repository.delete(id);
    }

    async find(): Promise<Book[]> {
        return await this._repository.find();
    }

    async findOne(id: number): Promise<Book> {
        return await this._repository.findOne(id);
    }

    async addAuthor(bookId: number, authorId: number): Promise<void> {
        await this._repository.addAuthor(bookId, authorId);
    }

    async removeAuthor(bookId: number, authorId: number): Promise<void> {
        await this._repository.removeAuthor(bookId, authorId);
    }

    async findWithRelations(): Promise<BookWithAuthors[]> {
        return await this._repository.findWithRelations();
    }

    async findOneWithRelations(id: number): Promise<BookWithAuthors> {
        return await this._repository.findOneWithRelations(id);
    }
}

export default BookService;
