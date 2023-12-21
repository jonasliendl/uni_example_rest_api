import { $Enums, Movie } from "@prisma/client";
import { Service, ServiceRelations } from "./service";
import MovieRepository from "../repository/movie.repository";
import { MovieWithRelations } from "../resources/movie.resource";

class MovieService implements Service<Movie>, ServiceRelations<Movie> {
    private readonly _repository = new MovieRepository();

    private validate(item: Movie): void {
        if (item.title.length > 100) throw new Error("Title is too long");
        if (item.description.length > 1000) throw new Error("Description is too long");
        if (item.duration < 1) throw new Error("Duration is too small");
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

    async findWithRelations(): Promise<MovieWithRelations[]> {
        return await this._repository.findWithRelations();
    }

    async findOneWithRelations(id: number): Promise<MovieWithRelations> {
        return await this._repository.findOneWithRelations(id);
    }

    async addRelation(movieId: number, userId: number, type: $Enums.UserToMovieType): Promise<void> {
        await this._repository.addRelation(movieId, userId, type);
    }

    async removeRelation(movieId: number, userId: number, type: $Enums.UserToMovieType): Promise<void> {
        await this._repository.removeRelation(movieId, userId, type);
    }
}

export default MovieService;
