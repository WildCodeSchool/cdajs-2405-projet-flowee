import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { TrackerStats } from "../entities/TrackerStats";
import type { MyContext } from "../types/MyContext";
import { Project } from "../entities/Project";
import { dataSource } from "../dataSource/dataSource";

@Resolver(TrackerStats)
export class TrackerStatsQueries {
  @Authorized("ADMIN", "CLIENT")
  @Query(() => TrackerStats)
  async getTrackerStats(@Ctx() context: MyContext): Promise<TrackerStats> {
    const user = context.user;

    if (!user) {
      throw new Error("Not connected");
    }

    const projects = await dataSource.manager.find(Project, {
      where: {
        ...(user.role === "ADMIN"
          ? { companyUser: { account: { id: user.id } } }
          : { client: { account: { id: user.id } } }),
      },
      relations: ["deliverables", "deliverables.tasks"],
    });

    const now = new Date();
    let lateProjects = 0;
    let needReview = 0;
    let approvedDeliverables = 0;

    for (const project of projects) {
      if (
        project.endDate &&
        new Date(project.endDate) < now &&
        project.status !== "COMPLETED"
      ) {
        lateProjects++;
      }

      for (const deliverable of project.deliverables ?? []) {
        if (deliverable.status === "IN_REVIEW") needReview++;
        if (deliverable.status === "APPROVED") approvedDeliverables++;
      }
    }
    return { lateProjects, needReview, approvedDeliverables };
  }
}
