import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

async function main() {
  const connectionString = process.env.MIGRATION_DATABASE_URL;
  if (!connectionString) throw new Error("MIGRATION_DATABASE_URL is required.");
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  try {
    const [userCount, superAdmin, disabledFlags, smokeAudit] = await Promise.all([
      prisma.user.count(),
      prisma.role.findUnique({ where: { name: "SUPER_ADMIN" } }),
      prisma.featureFlag.count({ where: { enabled: false } }),
      prisma.auditLog.findUnique({ where: { id: "audit-smoke-test-20260729" } }),
    ]);
    if (!superAdmin || !smokeAudit || disabledFlags < 1) throw new Error("Required administration records were not verified.");
    console.log(JSON.stringify({ userCount, superAdminRole: Boolean(superAdmin), disabledFlags, auditSmokeTest: Boolean(smokeAudit) }));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });