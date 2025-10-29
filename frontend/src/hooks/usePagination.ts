import { useState } from 'react';
import {IPagination, IPaginationResponse, IUsePaginationResponse} from '../types';

export const usePagination = ():{pagination:IUsePaginationResponse} => {
  const [pagination, setPagination] = useState<IPaginationResponse>({
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 20,
  });

  const onPageChange = (page: number) => {
    if (pagination?.totalPages && page > 0 && page < pagination.totalPages+1) {
      setPagination({ ...pagination, currentPage: page });
    }
  };

  const nextPage = () => {
    onPageChange(pagination.currentPage + 1);
  };

  const prevPage = () => {
    onPageChange(pagination.currentPage - 1);
  };

  return {
    pagination: {
      ...pagination,
      onPageChange,
      nextPage,
      prevPage,
      setPagination
    },
  };
};
