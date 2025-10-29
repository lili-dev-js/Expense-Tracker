import {Dispatch, SetStateAction} from "react";

export type IPagination<TKey extends string, TData> = {
  [key in TKey]: TData;
} & {
  pagination: IPaginationResponse;
};

export interface IPaginationResponse {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface IUsePaginationResponse {
  onPageChange: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPagination: Dispatch<SetStateAction<IPaginationResponse>>;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
