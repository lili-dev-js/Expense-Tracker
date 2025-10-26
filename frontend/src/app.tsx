import React from 'react';
import './App.css';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from './components';
import { Toaster } from './components/ui/toaster';
import {CategoriesView, ExpensesView} from './views';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {AnalyticsView} from "./views/analytics";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { path: 'categories', element: <CategoriesView /> },
      { path: 'expenses', element: <ExpensesView /> },
      { index: true, path: 'analytics', element: <AnalyticsView /> },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider value={defaultSystem}>
      <Toaster />
      <RouterProvider router={router} />
    </ChakraProvider>
  </QueryClientProvider>
);

export default App;
