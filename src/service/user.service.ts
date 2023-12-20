import { User } from "@prisma/client";
import { Service } from "./service";
import UserRepository from "../repository/user.repository";

class UserService implements Service<User> {
    private readonly _repository = new UserRepository();

    private validate(item: User): void {
        if (item.firstName.length > 100) throw new Error("First name is too long");
        if (item.lastName.length > 100) throw new Error("Last name is too long");
        if (item.biography && item.biography.length > 1000) throw new Error("Biography is too long");
        if (item.dateOfBirth && item.dateOfBirth > new Date()) throw new Error("Date of birth is in the future");
    }

    async create(item: User): Promise<User> {
        this.validate(item);
        return await this._repository.create(item);
    }

    async update(id: number, item: User): Promise<User> {
        this.validate(item);
        return await this._repository.update(id, item);
    }

    async delete(id: number): Promise<boolean> {
        return await this._repository.delete(id);
    }

    async find(): Promise<User[]> {
        return await this._repository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this._repository.findOne(id);
    }
}

export default UserService;
