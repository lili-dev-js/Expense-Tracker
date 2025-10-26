import React from 'react';
import './App.css';
import { Box, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from './components';
import { Toaster } from './components/ui/toaster';
import { CategoriesView } from './views';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <Box /> },
      { path: 'categories', element: <CategoriesView /> },
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
