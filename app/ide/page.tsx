import { auth } from "@/auth";
import Ide from "./ide";
import { getProjectInfo } from "./ide-actions";
import NotAuthed from "@/components/page/not-authed";
import NotFound from "../not-found";

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
  if (userId !== initContent.owner.$id) {
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
