import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardPage } from "@/features/dashboard/page";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("auth_session_token")?.value;

  // Defesa em profundidade: Redireciona mesmo se o Middleware for contornado
  if (!sessionToken || sessionToken.trim().length === 0) {
    redirect("/login?redirectTo=/174464Fe");
  }

  return <DashboardPage />;
}