import { gql } from "@apollo/client";

export const GET_TRACKER_STATS = gql`
  query GetTrackerStats {
    getTrackerStats {
      approvedDeliverables
      lateProjects
      needReview
    }
  }
`;
