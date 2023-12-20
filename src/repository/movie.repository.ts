import { Movie, PrismaClient } from "@prisma/client";
import { Repository } from "./repository";

class MovieRepository implements Repository<Movie> {
    private readonly _prisma: PrismaClient = new PrismaClient();

    async create(item: Movie): Promise<Movie> {
        const movie = await this._prisma.movie.create({
            data: {
                title: item.title,
                description: item.description,
                yearOfRelease: item.yearOfRelease,
                duration: item.duration,
                rating: item.rating,
                actors: item.actors,
            },
        });
        if (!movie) throw new Error("Movie not created");
        return movie;
    }

    async update(id: number, item: Movie): Promise<Movie> {
        const updatedMovie = await this._prisma.movie.update({
            where: { id },
            data: {
                title: item.title,
                description: item.description,
                yearOfRelease: item.yearOfRelease,
                duration: item.duration,
                rating: item.rating,
                actors: item.actors,
            },
        });
        if (!updatedMovie) throw new Error("Movie not updated");
        return updatedMovie;
    }

    async delete(id: number): Promise<boolean> {
        const movie = await this._prisma.movie.delete({ where: { id } });
        if (!movie) return false;
        return true;
    }

    async find(): Promise<Movie[]> {
        return await this._prisma.movie.findMany();
    }

    async findOne(id: number): Promise<Movie> {
        const movie = await this._prisma.movie.findUnique({ where: { id } });
        if (!movie) throw new Error("Movie not found");
        return movie;
    }
}

export default MovieRepository;
