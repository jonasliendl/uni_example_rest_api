import { Podcast } from "@prisma/client";
import { Service, ServiceRelations } from "./service";
import PodcastRepository from "../repository/podcast.repository";
import { PodcastWithRelations } from "../resources/podcast.resource";

class PodcastService implements Service<Podcast>, ServiceRelations<PodcastWithRelations> {
    private readonly _repository = new PodcastRepository();

    private validate(item: Podcast): void {
        if (item.title.length > 100) throw new Error("Title is too long");
        if (item.description.length > 1000) throw new Error("Description is too long");
        if (item.duration < 1) throw new Error("Duration is too small");
    }

    async create(item: Podcast): Promise<Podcast> {
        this.validate(item);
        return await this._repository.create(item);
    }

    async update(id: number, item: Podcast): Promise<Podcast> {
        this.validate(item);
        return await this._repository.update(id, item);
    }

    async delete(id: number): Promise<boolean> {
        return await this._repository.delete(id);
    }

    async find(): Promise<Podcast[]> {
        return await this._repository.find();
    }

    async findOne(id: number): Promise<Podcast> {
        return await this._repository.findOne(id);
    }

    async findWithRelations(): Promise<PodcastWithRelations[]> {
        return await this._repository.findWithRelations();
    }

    async findOneWithRelations(id: number): Promise<PodcastWithRelations> {
        return await this._repository.findOneWithRelations(id);
    }

    async addHost(podcastId: number, hostId: number): Promise<void> {
        await this._repository.addPodcastHost(podcastId, hostId);
    }

    async removeHost(podcastId: number, hostId: number): Promise<void> {
        await this._repository.removePodcastHost(podcastId, hostId);
    }
}

export default PodcastService;
