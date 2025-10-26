import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from 'graphql-request';
import {
  FIND_ALL_CATEGORIES,
  FIND_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
} from '../queries';
import {ICategory} from "../types";

const endpoint = 'http://localhost:3096/graphql';

export const useFindAllCategories = () =>
  useQuery({
    queryKey: ['findAllCategories'],
    queryFn: async ():Promise<ICategory[]> => {
      const { findAllCategories } = await request(
        endpoint,
        FIND_ALL_CATEGORIES
      );
      return findAllCategories;
    },
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createCategory'],
    mutationFn: async (input: { name: string }):Promise<ICategory> => {
      const { createCategory } = await request(endpoint, CREATE_CATEGORY, {
        input,
      });
      return createCategory;
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateCategory'],
    mutationFn: async (input: { _id: string; name: string }):Promise<ICategory> => {
      const { updateCategory } = await request(endpoint, UPDATE_CATEGORY, {
        input,
      });
      return updateCategory;
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useRemoveCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string):Promise<ICategory> => {
      const { removeCategory } = await request(endpoint, REMOVE_CATEGORY, {
        id,
      });
      return removeCategory;
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
