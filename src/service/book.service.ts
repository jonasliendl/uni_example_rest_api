import { Book } from "@prisma/client";
import { Service } from "./service";
import BookRepository from "../repository/book.repository";

class BookService implements Service<Book> {
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
}

export default BookService;
