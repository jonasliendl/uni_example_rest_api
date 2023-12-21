import { Prisma } from "@prisma/client";

export type MovieWithRelations = Prisma.MovieGetPayload<{ include: { users: true } }>;
