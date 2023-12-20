import { Request, Response } from "express";
import { Podcast } from "@prisma/client";
import { Controller } from "./controller";
import PodcastService from "../service/podcast.service";

class PodcastController implements Controller {
    private readonly _podcastService = new PodcastService();

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    getAll(req: Request, res: Response) {
        const podcasts = this._podcastService.find();
        res.status(200).json(podcasts);
    }

    getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const podcast = this._podcastService.findOne(id);
        res.status(200).json(podcast);
    }

    create(req: Request, res: Response) {
        const podcast = req.body as Podcast;
        const newPodcast = this._podcastService.create(podcast);
        res.status(201).json(newPodcast);
    }

    update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const podcast = req.body as Podcast;
        const updatedPodcast = this._podcastService.update(id, podcast);
        res.status(200).json(updatedPodcast);
    }

    delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        this._podcastService.delete(id);
        res.status(204).end();
    }
}

export default PodcastController;
