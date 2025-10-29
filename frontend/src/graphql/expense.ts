import { gql } from 'graphql-request';

export const FIND_ALL_EXPENSES = gql`
  query FindAllExpenses($filters: FindAllExpensesInput) {
    expenses(filters: $filters) {
      data {
        _id
        name
        amount
        paymentDate
        category {
          _id
          name
        }
        createdAt
        updatedAt
      }
      pagination {
        totalRecords
        totalPages
        currentPage
        limit
      }
    }
  }
`;
export const FIND_EXPENSE = gql`
  query FindExpense($id: ID!) {
    findExpense(id: $id) {
      _id
      name
      amount
      category {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation CreateExpense($input: CreateExpenseInput!) {
    createExpense(createExpenseInput: $input) {
      _id
      name
      amount
      paymentDate
      category {
        _id
        name
      }
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($input: UpdateExpenseInput!) {
    updateExpense(updateExpenseInput: $input) {
      _id
      name
      amount
      paymentDate
      category {
        _id
        name
      }
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation RemoveExpense($id: ID!) {
    removeExpense(id: $id) {
      _id
      name
    }
  }
`;
