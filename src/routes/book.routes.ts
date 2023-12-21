import { Router } from "express";
import BookController from "../controller/book.controller";

export const initBookRoutes = (router: Router) => {
    const bookController = new BookController();

    router.get('/book/:id', bookController.getById);

    router.get('/books', bookController.getAll);

    router.post('/book', bookController.create);

    router.put('/book/:id', bookController.update);

    router.delete('/book/:id', bookController.delete);

    router.post('/book/:id/author/:authorId', bookController.addAuthor);

    router.delete('/book/:id/author/:authorId', bookController.removeAuthor);
}
