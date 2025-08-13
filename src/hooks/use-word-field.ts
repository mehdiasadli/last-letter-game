import { useField } from '@mantine/form';

export function useWordField() {
  return useField({
    initialValue: '',
    validateOnBlur: true,
  });
}
