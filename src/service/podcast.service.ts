import { Podcast } from "@prisma/client";
import { Service } from "./service";
import PodcastRepository from "../repository/podcast.repository";

class PodcastService implements Service<Podcast> {
    private readonly _repository = new PodcastRepository();

    private validate(item: Podcast): void {
        if (item.title.length > 100) throw new Error("Title is too long");
        if (item.description.length > 1000) throw new Error("Description is too long");
        if (item.duration < 1) throw new Error("Duration is too small");
        if (item.podcastHosts.length < 1) throw new Error("Podcast must have at least one podcast host");
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
}

export default PodcastService;
