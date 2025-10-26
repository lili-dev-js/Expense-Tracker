import { gql } from 'graphql-request';

export const CATEGORY_ANALYTICS = gql`
  query CategoryAnalytics($input: AnalyticsInput!) {
    categoryAnalytics(input: $input) {
      categoryAnalytics {
        categoryId
        categoryName
        segments {
          totalAmount
          index
        }
      }
      segmentDates
    }
  }
`;
