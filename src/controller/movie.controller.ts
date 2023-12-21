import { Request, Response } from "express";
import { $Enums, Movie } from "@prisma/client";
import { Controller } from "./controller";
import MovieService from "../service/movie.service";
import { MovieWithRelations } from "../resources/movie.resource";
import { handleError } from "../utils/error";

type MovieCreation = {
    movie: Movie;
    actors: number[];
    directors: number[];
};

class MovieController implements Controller {
    private readonly _movieService = new MovieService();

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.addActor = this.addActor.bind(this);
        this.removeActor = this.removeActor.bind(this);
        this.addDirector = this.addDirector.bind(this);
        this.removeDirector = this.removeDirector.bind(this);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const isEagerLoading = req.query.eager === "true";
        let movies: Movie[] | MovieWithRelations[] = [];
        try {
            if (isEagerLoading) movies = await this._movieService.findWithRelations();
            else movies = await this._movieService.find();
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).json(movies);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const isEagerLoading = req.query.eager === "true";
        const id = Number(req.params.id);
        let movie: Movie | MovieWithRelations;
        try {
            if (isEagerLoading) movie = await this._movieService.findOneWithRelations(id);
            else movie = await this._movieService.findOne(id);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).json(movie);
    }

    async create(req: Request, res: Response): Promise<void> {
        const body = req.body as MovieCreation;
        if (body.directors.length === 0) {
            res.status(400).send("Directors cannot be empty");
            return;
        }
        let newMovie: Movie;
        try {
            newMovie = await this._movieService.create(body.movie);
            for (const actorId of body.actors) {
                await this._movieService.addRelation(newMovie.id, actorId, $Enums.UserToMovieType.Actor);
            }
            for (const directorId of body.directors) {
                await this._movieService.addRelation(newMovie.id, directorId, $Enums.UserToMovieType.Director);
            }
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(201).json(newMovie);
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const movie = req.body as Movie;
        let updatedMovie: Movie;
        try {
            updatedMovie = await this._movieService.update(id, movie);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).json(updatedMovie);
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        try {
            await this._movieService.delete(id);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(204).end();
    }

    async addActor(req: Request, res: Response): Promise<void> {
        const movieId = Number(req.params.id);
        const actorId = Number(req.params.actorId);
        try {
            await this._movieService.addRelation(movieId, actorId, $Enums.UserToMovieType.Actor);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).end();
    }

    async removeActor(req: Request, res: Response): Promise<void> {
        const movieId = Number(req.params.id);
        const actorId = Number(req.params.actorId);
        try {
            await this._movieService.removeRelation(movieId, actorId, $Enums.UserToMovieType.Actor);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).end();
    }

    async addDirector(req: Request, res: Response): Promise<void> {
        const movieId = Number(req.params.id);
        const directorId = Number(req.params.directorId);
        try {
            await this._movieService.addRelation(movieId, directorId, $Enums.UserToMovieType.Director);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).end();
    }

    async removeDirector(req: Request, res: Response): Promise<void> {
        const movieId = Number(req.params.id);
        const directorId = Number(req.params.directorId);
        try {
            await this._movieService.removeRelation(movieId, directorId, $Enums.UserToMovieType.Director);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).end();
    }
}

export default MovieController;
