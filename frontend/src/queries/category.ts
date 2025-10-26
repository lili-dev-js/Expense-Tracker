import { gql } from 'graphql-request';

export const FIND_ALL_CATEGORIES = gql`
  query FindAllCategories {
    findAllCategories {
      _id
      name
      createdAt
      updatedAt
    }
  }
`;

export const FIND_CATEGORY = gql`
  query FindCategory($id: ID!) {
    findCategory(id: $id) {
      _id
      name
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(createCategoryInput: $input) {
      _id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $input) {
      _id
      name
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($id: ID!) {
    removeCategory(id: $id) {
      _id
      name
    }
  }
`;
