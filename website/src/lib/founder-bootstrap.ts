import { getPrisma } from "@/lib/prisma";

const founderEmail = () => process.env.FOUNDER_EMAIL?.trim().toLowerCase();

export async function bootstrapFounder(userId: string) {
  const prisma = getPrisma();
  const configuredEmail = founderEmail();
  if (!configuredEmail) throw new Error("FOUNDER_EMAIL is not configured.");
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.email || user.email.toLowerCase() !== configuredEmail || !user.emailVerified) throw new Error("Only the verified configured founder email may bootstrap SUPER_ADMIN.");
  return prisma.$transaction(async (transaction) => {
    const role = await transaction.role.upsert({ where: { name: "SUPER_ADMIN" }, update: {}, create: { name: "SUPER_ADMIN", description: "Founder-level administration role." } });
    const existing = await transaction.userRole.findMany({ where: { roleId: role.id } });
    if (existing.some((assignment) => assignment.userId !== user.id)) throw new Error("A different SUPER_ADMIN already exists.");
    await transaction.userRole.upsert({ where: { userId_roleId: { userId: user.id, roleId: role.id } }, update: { assignedBy: user.id }, create: { userId: user.id, roleId: role.id, assignedBy: user.id } });
    await transaction.auditLog.create({ data: { actorId: user.id, action: "founder.bootstrap", entityType: "UserRole", entityId: user.id, metadata: { role: "SUPER_ADMIN" } } });
    return user.id;
  });
}
