import type { Project } from "@generated/graphql-types";
import { slugify } from "@utils/project";
import type { useNavigate } from "react-router-dom";

export const handleClickLateProjects = (
  lateList: Project[],
  navigate: ReturnType<typeof useNavigate>,
) => {
  if (lateList.length === 1) {
    const project = lateList[0];
    navigate(`/projects/${slugify(project.projectName)}-${project.id}`);
  } else {
    navigate("/projects?filter=late");
  }
};
