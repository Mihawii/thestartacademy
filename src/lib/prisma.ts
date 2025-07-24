import { PrismaClient } from "../generated/prisma";

// Avoid instantiating multiple PrismaClients in development with Next.js hot reload.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
