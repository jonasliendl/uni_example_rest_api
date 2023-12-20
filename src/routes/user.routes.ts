import { Router } from "express";
import UserController from "../controller/user.controller";

export const initUserRoutes = (router: Router) => {
    const userController = new UserController();

    router.get('/user/:id', userController.getById);

    router.get('/users', userController.getAll);

    router.post('/user', userController.create);

    router.put('/user/:id', userController.update);

    router.delete('/user/:id', userController.delete);
}
