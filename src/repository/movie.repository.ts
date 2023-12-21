import { $Enums, Movie, PrismaClient } from "@prisma/client";
import { Repository, RepositoryRelations } from "./repository";
import { MovieWithRelations } from "../resources/movie.resource";

class MovieRepository implements Repository<Movie>, RepositoryRelations<MovieWithRelations> {
    private readonly _prisma: PrismaClient = new PrismaClient();

    async create(item: Movie): Promise<Movie> {
        const movie = await this._prisma.movie.create({
            data: {
                title: item.title,
                description: item.description,
                yearOfRelease: item.yearOfRelease,
                duration: item.duration,
                rating: item.rating,
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

    async findWithRelations(): Promise<MovieWithRelations[]> {
        const movie = await this._prisma.movie.findMany({
            include: { users: true },
        });
        if (!movie) throw new Error("Movie not found");
        return movie;
    }
    
    async findOneWithRelations(id: number): Promise<MovieWithRelations> {
        const movie = await this._prisma.movie.findUnique({
            where: { id },
            include: { users: true },
        });
        if (!movie) throw new Error("Movie not found");
        return movie;
    }

    async addRelation(movieId: number, userId: number, type: $Enums.UserToMovieType): Promise<void> {
        const movie = await this._prisma.movie.update({
            where: { id: movieId },
            data: {
                users: {
                    create: {
                        userId,
                        type,
                    }
                }
            },
        });
        if (!movie) throw new Error("Error adding relation");
    }

    async removeRelation(movieId: number, userId: number, type: $Enums.UserToMovieType): Promise<void> {
        const relation = await this._prisma.userToMovie.deleteMany({
            where: {
                movieId,
                userId,
                type,
            },
        });
        if (!relation) throw new Error("Error removing relation");
    }
}

export default MovieRepository;
