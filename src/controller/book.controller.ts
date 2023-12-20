import { Controller } from "./controller";
import { Request, Response } from "express";
import { Book } from "@prisma/client";
import BookService from "../service/book.service";

class BookController implements Controller {
    private readonly _bookService = new BookService();

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    getAll(req: Request, res: Response): void {
        const books = this._bookService.find();
        res.status(200).json(books);
    }

    getById(req: Request, res: Response): void {
        const id = Number(req.params.id);
        const book = this._bookService.findOne(id);
        res.status(200).json(book);
    }

    create(req: Request, res: Response): void {
        const book = req.body as Book;
        const newBook = this._bookService.create(book);
        res.status(201).json(newBook);
    }

    update(req: Request, res: Response): void {
        const id = Number(req.params.id);
        const book = req.body as Book;
        const updatedBook = this._bookService.update(id, book);
        res.status(200).json(updatedBook);
    }

    delete(req: Request, res: Response): void {
        const id = Number(req.params.id);
        this._bookService.delete(id);
        res.status(204).end();
    }
}

export default BookController;
