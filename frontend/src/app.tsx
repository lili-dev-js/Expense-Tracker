import React from 'react';
import './App.css';
import { Box, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from './components';
import { Toaster } from './components/ui/toaster';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <Box /> },
      { path: 'skills', element: <Box /> },
    ],
  },
]);

const App = () => (
  <ChakraProvider value={defaultSystem}>
    <Toaster />
    <RouterProvider router={router} />
  </ChakraProvider>
);

export default App;
