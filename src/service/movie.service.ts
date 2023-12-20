import { Movie } from "@prisma/client";
import { Service } from "./service";
import MovieRepository from "../repository/movie.repository";

class MovieService implements Service<Movie> {
    private readonly _repository = new MovieRepository();

    private validate(item: Movie): void {
        if (item.title.length > 100) throw new Error("Title is too long");
        if (item.description.length > 1000) throw new Error("Description is too long");
        if (item.duration < 1) throw new Error("Duration is too small");
        if (item.directors.length < 1) throw new Error("Movie must have at least one director");
        if (item.rating && (item.rating < 1 || item.rating > 5)) throw new Error("Rating must be between 1 and 5");
    }

    async create(item: Movie): Promise<Movie> {
        this.validate(item);
        return await this._repository.create(item);
    }

    async update(id: number, item: Movie): Promise<Movie> {
        this.validate(item);
        return await this._repository.update(id, item);
    }

    async delete(id: number): Promise<boolean> {
        return await this._repository.delete(id);
    }

    async find(): Promise<Movie[]> {
        return await this._repository.find();
    }

    async findOne(id: number): Promise<Movie> {
        return await this._repository.findOne(id);
    }
}

export default MovieService;
