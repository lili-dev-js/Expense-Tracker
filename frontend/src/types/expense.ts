import {ICategory} from './category';
import {SORT_DEFAULT} from "../constants";

export interface IExpense {
    createdAt?: string;
    updatedAt?: string;
    name: string;
    amount: number;
    category?: ICategory;
    _id: string;
}

export interface IExpenseForm {
    name: string;
    amount: number;
    category: string;
    _id?: string;
}

export interface IExpenseRawForm {
    name: string;
    amount: string;
    category: string;
    _id?: string;
}

export type TExpenseSortAndFilters = (typeof SORT_DEFAULT) & {categoryId:string}