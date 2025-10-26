import {ICategory} from "./category";

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
