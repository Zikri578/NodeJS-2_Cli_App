import { PrismaClient } from "@prisma/client";

// membuat sebuah variabel database untuk mengkoneksikan ke prisma studio supaya datanya bisa masuk
const db = new PrismaClient();

export default db;