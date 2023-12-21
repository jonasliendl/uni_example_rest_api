import { Controller } from "./controller";
import { Request, Response } from "express";
import { Book } from "@prisma/client";
import BookService from "../service/book.service";
import { BookWithAuthors } from "../resources/book.resource";
import { handleError } from "../utils/error";

type CreationBody = {
    book: Book;
    authors: number[];
};

class BookController implements Controller {
    private readonly _bookService = new BookService();

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.addAuthor = this.addAuthor.bind(this);
        this.removeAuthor = this.removeAuthor.bind(this);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const isEagerLoading = req.query.eager === "true";
        let books: Book[] | BookWithAuthors[] = [];
        try {
            if (isEagerLoading) books = await this._bookService.findWithRelations();
            else books = await this._bookService.find();
        } catch (err) {
            handleError(err, res);
            return;
        }
        res.status(200).json(books);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const isEagerLoading = req.query.eager === "true";
        const id = Number(req.params.id);
        let book: Book | null = null;
        try {
            if (isEagerLoading) book = await this._bookService.findOneWithRelations(id);
            else book = await this._bookService.findOne(id);
        } catch (err) {
            handleError(err, res);
            return;
        }
        res.status(200).json(book);
    }

    async create(req: Request, res: Response): Promise<void> {
        const body: CreationBody = req.body;
        let newBook: Book | null = null;
        if (body.authors.length === 0) {
            res.status(400).send("Authors cannot be empty");
            return;
        }
        try {
            newBook = await this._bookService.create(body.book);
            if (!newBook) {
                res.status(400).send("Error creating book");
                return;
            }
            for (const authorId of body.authors) {
                await this._bookService.addAuthor(newBook.id, authorId);
            }
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(201).json(newBook);
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const book = req.body as Book;
        let updatedBook: Book | null = null;
        try {
            updatedBook = await this._bookService.update(id, book);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).json(updatedBook);
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        try {
            const isDeleted = await this._bookService.delete(id);
            if (!isDeleted) {
                res.status(404).send("Book not found");
                return;
            }
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(204).send('Book deleted');
    }

    async addAuthor(req: Request, res: Response): Promise<void> {
        const bookId = Number(req.params.id);
        const authorId = Number(req.params.authorId);
        try {
            await this._bookService.addAuthor(bookId, authorId);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(201).json();
    }

    async removeAuthor(req: Request, res: Response): Promise<void> {
        const bookId = Number(req.params.id);
        const authorId = Number(req.params.authorId);
        try {
            await this._bookService.removeAuthor(bookId, authorId);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(204).end();
    }
}

export default BookController;
