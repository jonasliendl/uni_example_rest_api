import { Application } from "express";
import { initMovieRoutes } from "./movie.routes";
import { initPodcastRoutes } from "./podcast.routes";
import { initBookRoutes } from "./book.routes";
import { initUserRoutes } from "./user.routes";

export const initRoutes = (app: Application) => {
    initMovieRoutes(app);
    initPodcastRoutes(app);
    initBookRoutes(app);
    initUserRoutes(app);
}
