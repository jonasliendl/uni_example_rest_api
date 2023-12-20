import { Router } from "express";
import BookController from "../controller/book.controller";

export const initBookRoutes = (router: Router) => {
    const bookController = new BookController();

    router.get('/book/:id', bookController.getById);

    router.get('/books', bookController.getAll);

    router.post('/books', bookController.create);

    router.put('/books/:id', bookController.update);

    router.delete('/books/:id', bookController.delete);
}
