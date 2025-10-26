import {Outlet} from 'react-router-dom';
import { Flex, Box, Center, Heading } from '@chakra-ui/react';
import {NavLink} from "./navLink";

export const Header = () => {
  return (
    <Box w="100%">
      <Flex as="nav" bg="green.600" color="white" >
        <Heading as="h1" p={4}>ExpenseTracker</Heading>
          <Flex as="nav"  color="white">
              {[
                  { to: '/expenses', label: 'Expense' },
                  { to: '/categories', label: 'Categories' },
                  { to: '/analytics', label: 'Analytics' },
              ].map(({ to, label }) => (
                  <NavLink
                      h='100%'
                      key={to}
                      w="150px"
                      to={to}
                      px={5}
                      py={4}
                      m={0}
                      color="white"
                      position="relative"
                      _hover={{ textDecoration: 'none', bg: 'green.500' }}
                      isActiveStyles={{
                          fontWeight: 'bold',
                          bg: 'green.700',
                      }}
                  >
                      {label}
                  </NavLink>
              ))}
          </Flex>
      </Flex>

      <Center>
        <Outlet />
      </Center>
    </Box>
  );
};
