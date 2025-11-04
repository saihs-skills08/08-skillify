import { auth } from "@/auth";
import { getUserInfo } from "@/components/utils/getUserInfo";
import PageNotFound from "@/components/page/404";
import ExpertDashboard from "./dashboard";
import { getUsersWithTaskStats } from "./actions";

export default async function ExpertDashboardPage() {
  const session = await auth();
  const user = await getUserInfo(session?.user?.id || "");
  
  if (user.role !== "expert") {
    return PageNotFound();
  }

  const userStats = await getUsersWithTaskStats();

  return <ExpertDashboard userStats={userStats} />;
}
