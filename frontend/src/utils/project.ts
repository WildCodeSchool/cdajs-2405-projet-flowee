import type { ProjectOption } from "@interfaces/Options";

export const parseIdFromSlug = (slug: string | undefined): number | null => {
  const rawId = slug?.split("-").pop();
  const parsed = Number(rawId);
  return rawId && !Number.isNaN(parsed) ? parsed : null;
};

export function getProjectOptions(
  project?: { id: string | number; projectName: string } | null,
): ProjectOption[] {
  if (!project) return [];
  return [{ id: String(project.id), name: project.projectName }];
}
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}
