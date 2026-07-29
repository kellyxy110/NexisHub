import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import type { AdminRole } from "@/lib/workflows";

export async function getCurrentAdminPrincipal() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.user.email) return null;
  try {
    const user = await getPrisma().user.findUnique({ where: { id: session.user.id }, include: { userRoles: { include: { role: true } } } });
    const role = user?.userRoles.find((assignment) => assignment.role.name === "SUPER_ADMIN")?.role.name as AdminRole | undefined;
    if (!user || !role || !user.emailVerified) return null;
    return { id: user.id, email: user.email, role, verified: true as const };
  } catch {
    return null;
  }
}
