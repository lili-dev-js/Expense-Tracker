import React from 'react';
import {
  NavLink as RouterNavLink,
  NavLinkProps as RouterNavLinkProps,
} from 'react-router-dom';
import { Link, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

type Props = ChakraLinkProps &
  RouterNavLinkProps & {
    isActiveStyles?: ChakraLinkProps;
  };

export const NavLink = ({ children, isActiveStyles = {}, ...props }: Props) => {
  return (
    <RouterNavLink {...props} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Link {...props} {...(isActive ? isActiveStyles : {})}>
          {children}
        </Link>
      )}
    </RouterNavLink>
  );
};
