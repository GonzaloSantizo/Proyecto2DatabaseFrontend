import { Flex, Button, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import styles from './Main.module.css';

export default function Main() {
  return (
    <Flex className={styles.container}>
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="center"
        gap="md"
      >
        <Button component={Link} to="/retail" className="link" fullWidth>
          Retail
        </Button>
        <Button component={Link} to="/warehouse" className="link" fullWidth>
          Warehouse
        </Button>
        <Button component={Link} to="/manufacturer" className="link" fullWidth>
          Manufacturer
        </Button>
      </Stack>
    </Flex>
  );
}
