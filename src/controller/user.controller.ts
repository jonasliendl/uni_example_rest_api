import { Request, Response } from "express";
import { User } from "@prisma/client";
import { Controller } from "./controller";
import UserService from "../service/user.service";
import { handleError } from "../utils/error";

class UserController implements Controller {
    private readonly _userService = new UserService();

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        let users: User[] = [];
        try {
            users = await this._userService.find();
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).json(users);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        let user: User;
        try {
            user = await this._userService.findOne(id);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).json(user);
    }

    async create(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        let newUser: User;
        try {
            newUser = await this._userService.create(user);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(201).json(newUser);
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const user = req.body as User;
        let updatedUser: User;
        try {
            updatedUser = await this._userService.update(id, user);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(200).json(updatedUser);
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        try {
            await this._userService.delete(id);
        } catch (error) {
            handleError(error, res);
            return;
        }
        res.status(204).end();
    }
}

export default UserController;
