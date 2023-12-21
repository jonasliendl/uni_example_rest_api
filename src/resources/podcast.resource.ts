import { Prisma } from "@prisma/client";

export type PodcastWithRelations = Prisma.PodcastGetPayload<{ include: { podcastHosts: true } }>;