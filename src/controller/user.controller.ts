import { Request, Response } from "express";
import { User } from "@prisma/client";
import { Controller } from "./controller";
import UserService from "../service/user.service";

class UserController implements Controller {
    private readonly _userService = new UserService();

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    getAll(req: Request, res: Response): void {
        const users = this._userService.find();
        res.status(200).json(users);
    }

    getById(req: Request, res: Response): void {
        const id = Number(req.params.id);
        const user = this._userService.findOne(id);
        res.status(200).json(user);
    }

    create(req: Request, res: Response): void {
        const user = req.body as User;
        const newUser = this._userService.create(user);
        res.status(201).json(newUser);
    }

    update(req: Request, res: Response): void {
        const id = Number(req.params.id);
        const user = req.body as User;
        const updatedUser = this._userService.update(id, user);
        res.status(200).json(updatedUser);
    }

    delete(req: Request, res: Response): void {
        const id = Number(req.params.id);
        this._userService.delete(id);
        res.status(204).end();
    }
}

export default UserController;
