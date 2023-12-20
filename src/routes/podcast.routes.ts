import { Router } from "express";
import PodcastController from "../controller/podcast.controller";

export const initPodcastRoutes = (router: Router) => {
    const podcastController = new PodcastController();

    router.get('/podcast/:id', podcastController.getById);

    router.get('/podcasts', podcastController.getAll);

    router.post('/podcast', podcastController.create);

    router.put('/podcast/:id', podcastController.update);

    router.delete('/podcast/:id', podcastController.delete);
}
