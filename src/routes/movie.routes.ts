import { Router } from "express";
import MovieController from "../controller/movie.controller";

export const initMovieRoutes = (router: Router) => {
    const movieController = new MovieController();

    router.get('/movie/:id', movieController.getById);

    router.get('/movies', movieController.getAll);

    router.post('/movie', movieController.create);

    router.put('/movie/:id', movieController.update);

    router.delete('/movie/:id', movieController.delete);

    router.post('/movie/:id/actor/:actorId', movieController.addActor);

    router.delete('/movie/:id/actor/:actorId', movieController.removeActor);

    router.post('/movie/:id/director/:directorId', movieController.addDirector);

    router.delete('/movie/:id/director/:directorId', movieController.removeDirector);
}
