export interface ICategory {
    createdAt?: string;
    updatedAt?: string;
    name: string;
    _id: string;
}

export interface ICategoryForm {
    name: string;
    _id?: string;
}