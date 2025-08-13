import { Center, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <Container size='sm'>
      <Center py='md'>
        <Outlet />
      </Center>
    </Container>
  );
}
