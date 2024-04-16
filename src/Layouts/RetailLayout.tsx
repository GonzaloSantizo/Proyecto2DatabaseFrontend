import { Outlet, NavLink } from 'react-router-dom';
import { Box, Text } from '@mantine/core';

export function RetailLayout() {
  return (
    <Box>
      <Box width={{ base: 300 }} p="xs" bg="gray.1">
        <Text size="xl" weight={500} mb="md">
          Retail Navigation
        </Text>
        <NavLink
          to="/retail/products"
          className={({ isActive }) =>
            isActive ? 'active-link' : 'inactive-link'
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/retail/orders"
          className={({ isActive }) =>
            isActive ? 'active-link' : 'inactive-link'
          }
        >
          Orders
        </NavLink>
      </Box>
      <Box p="md">
        <Outlet />
      </Box>
    </Box>
  );
}
