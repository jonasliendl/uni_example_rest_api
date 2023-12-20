import { Podcast, PrismaClient } from "@prisma/client";
import { Repository } from "./repository";

class PodcastRepository implements Repository<Podcast> {
    private readonly _prisma: PrismaClient = new PrismaClient();

    async create(item: Podcast): Promise<Podcast> {
        const podcast = await this._prisma.podcast.create({
            data: {
                title: item.title,
                description: item.description,
                duration: item.duration,
                podcastHosts: item.podcastHosts,
            },
        });
        if (!podcast) throw new Error("Podcast not created");
        return podcast;
    }

    async update(id: number, item: Podcast): Promise<Podcast> {
        const updatedPodcast = await this._prisma.podcast.update({
            where: { id },
            data: {
                title: item.title,
                description: item.description,
                duration: item.duration,
                podcastHosts: item.podcastHosts,
            },
        });
        if (!updatedPodcast) throw new Error("Podcast not updated");
        return updatedPodcast;
    }

    async delete(id: number): Promise<boolean> {
        const podcast = await this._prisma.podcast.delete({ where: { id } });
        if (!podcast) return false;
        return true;
    }

    async find(): Promise<Podcast[]> {
        return await this._prisma.podcast.findMany();
    }

    async findOne(id: number): Promise<Podcast> {
        const podcast = await this._prisma.podcast.findUnique({ where: { id } });
        if (!podcast) throw new Error("Podcast not found");
        return podcast;
    }
}

export default PodcastRepository;
