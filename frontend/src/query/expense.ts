import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from 'graphql-request';
import {
    FIND_ALL_EXPENSES,
    CREATE_EXPENSE,
    UPDATE_EXPENSE,
    REMOVE_EXPENSE,
} from '../graphql';
import { IExpense } from '../types';

const endpoint = 'http://localhost:3096/graphql';

export const useFindAllExpenses = () =>
    useQuery({
        queryKey: ['findAllExpenses'],
        queryFn: async (): Promise<IExpense[]> => {
            const { findAllExpenses } = await request(endpoint, FIND_ALL_EXPENSES);
            return findAllExpenses;
        },
    });


export const useCreateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createExpense'],
        mutationFn: async (input: {
            name: string;
            amount?: number;
            category?: string;
        }): Promise<IExpense> => {
            const { createExpense } = await request(endpoint, CREATE_EXPENSE, {
                input,
            });
            return createExpense;
        },
        onSuccess: () => queryClient.invalidateQueries(),
    });
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateExpense'],
        mutationFn: async (input: {
            _id: string;
            name: string;
            amount: number;
            category: string;
        }): Promise<IExpense> => {
            const { updateExpense } = await request(endpoint, UPDATE_EXPENSE, {
                input,
            });
            return updateExpense;
        },
        onSuccess: () => queryClient.invalidateQueries(),
    });
};

export const useRemoveExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string): Promise<IExpense> => {
            const { removeExpense } = await request(endpoint, REMOVE_EXPENSE, { id });
            return removeExpense;
        },
        onSuccess: () => queryClient.invalidateQueries(),
    });
};
