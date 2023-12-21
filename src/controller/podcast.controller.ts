import { Request, Response } from "express";
import { Podcast } from "@prisma/client";
import { Controller } from "./controller";
import PodcastService from "../service/podcast.service";
import { PodcastWithRelations } from "../resources/podcast.resource";
import { handleError } from "../utils/error";

type PodcastCreation = {
    podcast: Podcast;
    hosts: number[];
};

class PodcastController implements Controller {
    private readonly _podcastService = new PodcastService();

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.addHost = this.addHost.bind(this);
        this.removeHost = this.removeHost.bind(this);
    }

    async getAll(req: Request, res: Response) {
        const isEagerLoading = req.query.eager === "true";
        let podcasts: Podcast[] | PodcastWithRelations[] = [];
        try {
            if (isEagerLoading) podcasts = await this._podcastService.findWithRelations();
            else podcasts = await this._podcastService.find();
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).json(podcasts);
    }

    async getById(req: Request, res: Response) {
        const isEagerLoading = req.query.eager === "true";
        const id = Number(req.params.id);
        let podcast: Podcast | PodcastWithRelations;
        try {
            if (isEagerLoading) podcast = await this._podcastService.findOneWithRelations(id);
            else podcast = await this._podcastService.findOne(id);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).json(podcast);
    }

    async create(req: Request, res: Response) {
        const body: PodcastCreation = req.body;
        if (body.hosts.length === 0) {
            res.status(400).send("Hosts cannot be empty");
            return;
        }
        let newPodcast: Podcast;
        try {
            newPodcast = await this._podcastService.create(body.podcast);
            for (const hostId of body.hosts) {
                await this._podcastService.addHost(newPodcast.id, hostId);
            }
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(201).json(newPodcast);
    }

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const podcast = req.body as Podcast;
        let updatedPodcast: Podcast;
        try {
            updatedPodcast = await this._podcastService.update(id, podcast);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).json(updatedPodcast);
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            await this._podcastService.delete(id);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(204).end();
    }

    async addHost(req: Request, res: Response) {
        const podcastId = Number(req.params.id);
        const hostId = Number(req.params.hostId);
        try {
            await this._podcastService.addHost(podcastId, hostId);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(204).end();
    }

    async removeHost(req: Request, res: Response) {
        const podcastId = Number(req.params.id);
        const hostId = Number(req.params.hostId);
        try {
            await this._podcastService.removeHost(podcastId, hostId);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(204).end();
    }
}

export default PodcastController;
