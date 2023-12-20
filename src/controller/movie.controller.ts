import { Request, Response } from "express";
import { Movie } from "@prisma/client";
import { Controller } from "./controller";
import MovieService from "../service/movie.service";

class MovieController implements Controller {
    private readonly _movieService = new MovieService();

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    getAll(req: Request, res: Response): void {
        const movies = this._movieService.find();
        res.status(200).json(movies);
    }

    getById(req: Request, res: Response): void {
        const id = Number(req.params.id);
        const movie = this._movieService.findOne(id);
        res.status(200).json(movie);
    }

    create(req: Request, res: Response): void {
        const movie = req.body as Movie;
        const newMovie = this._movieService.create(movie);
        res.status(201).json(newMovie);
    }

    update(req: Request, res: Response): void {
        const id = Number(req.params.id);
        const movie = req.body as Movie;
        const updatedMovie = this._movieService.update(id, movie);
        res.status(200).json(updatedMovie);
    }

    delete(req: Request, res: Response): void {
        const id = Number(req.params.id);
        this._movieService.delete(id);
        res.status(204).end();
    }
}

export default MovieController;
