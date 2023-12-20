import { Router } from "express";
import MovieController from "../controller/movie.controller";

export const initMovieRoutes = (router: Router) => {
    const movieController = new MovieController();

    router.get('/movie/:id', movieController.getById);

    router.get('/movies', movieController.getAll);

    router.post('/movies', movieController.create);

    router.put('/movies/:id', movieController.update);

    router.delete('/movies/:id', movieController.delete);
}
