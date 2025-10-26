import { useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { CATEGORY_ANALYTICS } from '../graphql';
import { ICategoryAnalytics } from '../types';

const endpoint = 'http://localhost:3096/graphql';

interface IAnalyticsInput {
  startDate: string;
  endDate: string;
}

export const useAnalytics = (input: IAnalyticsInput) => {
  return useQuery({
    queryKey: ['categoryAnalytics', input],
    queryFn: async (): Promise<ICategoryAnalytics> => {
      const  {categoryAnalytics}  = await request(endpoint, CATEGORY_ANALYTICS, { input });
      return categoryAnalytics;
    },
  });
};
