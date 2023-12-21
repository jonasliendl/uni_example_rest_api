import { Prisma } from "@prisma/client";

export type BookWithAuthors = Prisma.BookGetPayload<{ include: { authors: true } }>;
