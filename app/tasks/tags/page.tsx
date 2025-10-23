import { auth } from "@/auth";
import { getTags } from "./actions";
import ManageTags from "./manage-tags";
import { getUserInfo } from "@/components/utils/getUserInfo";
import PageNotFound from "@/components/page/404";

export default async function TagsPage() {
  const tags = await getTags();
  const session = await auth();
  const user = await getUserInfo(session?.user?.id || "");
  if (user.role !== "expert") {
    return PageNotFound();
  }
  return <ManageTags originalTags={tags} />;
}
