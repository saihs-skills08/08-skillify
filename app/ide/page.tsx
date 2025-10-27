import { auth } from "@/auth";
import Ide from "./ide";
import { getProjectInfo } from "./ide-actions";
import NotFound from "../not-found";
import { getUserInfo } from "@/components/utils/getUserInfo";

export default async function IdePage({
  searchParams,
}: {
  searchParams: Promise<{ project: string }>;
}) {
  const params = await searchParams;
  const projectId = params.project;
  const hasProjectId = !!projectId;
  let initContent = null;
  try {
    initContent = await getProjectInfo(projectId);
  } catch (e) {
    return <NotFound />;
  }
  const session = await auth();
  const userId = session?.user?.id;
  const userInfo = await getUserInfo(userId);
  if (userId !== initContent.owner.$id && userInfo.role !== "expert") {
    return <NotFound />;
  }

  return (
    <>
      {hasProjectId ? (
        <Ide initContent={initContent} projectId={projectId} />
      ) : (
        <NotFound />
      )}
    </>
  );
}
