import { Flex, Text } from '@mantine/core';
import { useAppPreferencesStore } from '../stores/app-preferences.store';

export function Header() {
  const { primaryColor } = useAppPreferencesStore();

  return (
    <Flex justify='space-between' align='center' bg={`${primaryColor}.8`} px='lg' py='md'>
      <Text c='white' fw='bold' fz='xl' lh='1'>
        LL
      </Text>
    </Flex>
  );
}
