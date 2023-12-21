import { PrismaClient, User } from "@prisma/client";
import { Repository } from "./repository";

class UserRepository implements Repository<User> {
    private readonly _prisma: PrismaClient = new PrismaClient();

    async create(item: User): Promise<User> {
        const user = await this._prisma.user.create({
            data: {
                firstName: item.firstName,
                lastName: item.lastName,
                biography: item.biography,
                dateOfBirth: item.dateOfBirth,
            },
        });
        if (!user) throw new Error("User not created");
        return user;
    }
    async update(id: number, item: User): Promise<User> {
        const updatedUser = await this._prisma.user.update({
            where: { id },
            data: {
                firstName: item.firstName,
                lastName: item.lastName,
                biography: item.biography,
                dateOfBirth: item.dateOfBirth,
            },
        });
        if (!updatedUser) throw new Error("User not updated");
        return updatedUser;
    }
    async delete(id: number): Promise<boolean> {
        const user = await this._prisma.user.delete({ where: { id } });
        if (!user) return false;
        return true;
    }
    async find(): Promise<User[]> {
        return await this._prisma.user.findMany();
    }
    async findOne(id: number): Promise<User> {
        const user = await this._prisma.user.findUnique({ where: { id } });
        if (!user) throw new Error("User not found");
        return user;
    }
}

export default UserRepository;
