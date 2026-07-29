import "dotenv/config";
import { defineConfig } from "prisma/config";

const migrationUrl = process.env.MIGRATION_DATABASE_URL ?? process.env.DATABASE_URL ?? "postgresql://placeholder:placeholder@localhost:5432/nexishub";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: migrationUrl },
});