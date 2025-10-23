import { Outlet } from 'react-router-dom';
import { Flex, Box, Center, Heading } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box w="100%">
      <Flex as="nav" bg="green.600" color="white" p={6}>
        <Heading as="h1">ExpenseTracker</Heading>
      </Flex>

      <Center>
        <Outlet />
      </Center>
    </Box>
  );
};
