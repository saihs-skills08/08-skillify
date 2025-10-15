import Ide from "./ide";
import { getProjectInfo } from "./ide-actions";

export default async function IdePage({
  searchParams,
}: {
  searchParams: Promise<{ project: string }>;
}) {
  const params = await searchParams;
  const projectId = params.project;
  const hasProjectId = !!projectId;
  const initContent = await getProjectInfo(projectId);
  return (
    <>
      {hasProjectId ? (
        <Ide initContent={initContent} projectId={projectId} />
      ) : (
        <div>404</div>
      )}
    </>
  );
}
