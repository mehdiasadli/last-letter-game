import {
  Card,
  Stack,
  Title,
  Text,
  Select,
  Group,
  Badge,
  ColorSwatch,
  SimpleGrid,
  Button,
  useMantineColorScheme,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useAppPreferencesStore } from '../stores/app-preferences.store';
import { motion } from 'framer-motion';
import { useAnimations } from '../hooks/use-animations';
import { useNavigate } from 'react-router-dom';

const colorOptions = [
  { value: 'dark', label: 'Dark', color: '#1A1B1E' },
  { value: 'gray', label: 'Gray', color: '#868E96' },
  { value: 'red', label: 'Red', color: '#FA5252' },
  { value: 'pink', label: 'Pink', color: '#E64980' },
  { value: 'grape', label: 'Grape', color: '#BE4BDB' },
  { value: 'violet', label: 'Violet', color: '#7950F2' },
  { value: 'indigo', label: 'Indigo', color: '#4C6EF5' },
  { value: 'blue', label: 'Blue', color: '#228BE6' },
  { value: 'cyan', label: 'Cyan', color: '#15AABF' },
  { value: 'green', label: 'Green', color: '#40C057' },
  { value: 'lime', label: 'Lime', color: '#82C91E' },
  { value: 'yellow', label: 'Yellow', color: '#FAB005' },
  { value: 'orange', label: 'Orange', color: '#FD7E14' },
  { value: 'teal', label: 'Teal', color: '#12B886' },
];

const radiusOptions = [
  { value: 'xs', label: 'Extra Small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
];

const spacingOptions = [
  { value: 'xs', label: 'Compact' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
];

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro' },
  { value: 'Nunito', label: 'Nunito' },
  { value: 'Ubuntu', label: 'Ubuntu' },
  { value: 'Playfair Display', label: 'Playfair Display' },
];

const fontSizeOptions = [
  { value: 'xs', label: 'Extra Small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
];

export default function SettingsPage() {
  const {
    primaryColor,
    radius,
    spacing,
    headingFont,
    bodyFont,
    headingFontSize,
    bodyFontSize,
    setPrimaryColor,
    setRadius,
    setSpacing,
    setHeadingFont,
    setBodyFont,
    setHeadingFontSize,
    setBodyFontSize,
  } = useAppPreferencesStore();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();

  const { fadeIn, slideUp } = useAnimations();

  return (
    <Stack w='100%' gap='lg'>
      <motion.div variants={fadeIn} initial='hidden' animate='visible'>
        <Card withBorder>
          <Stack gap='lg'>
            <Group justify='space-between' align='center'>
              <Button variant='light' leftSection={<IconArrowLeft size={16} />} onClick={() => navigate('/')} size='sm'>
                Back
              </Button>
              <Title order={2} ta='center'>
                ⚙️ App Settings
              </Title>
              <div style={{ width: 80 }}></div> {/* Spacer for centering */}
            </Group>
            <Text c='dimmed' ta='center' size='sm'>
              Customize your game experience with these settings
            </Text>
          </Stack>
        </Card>
      </motion.div>

      <motion.div variants={slideUp} initial='hidden' animate='visible' transition={{ delay: 0.1 }}>
        <Card withBorder>
          <Stack gap='lg'>
            <Title order={3}>🎨 Appearance</Title>

            {/* Theme Selection */}
            <Stack gap='xs'>
              <Text fw={500} size='sm'>
                Theme Mode
              </Text>
              <Select
                allowDeselect={false}
                data={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'auto', label: 'Auto (System)' },
                ]}
                value={colorScheme}
                onChange={(value) => setColorScheme(value as 'light' | 'dark' | 'auto')}
                description='Choose your preferred theme mode'
              />
            </Stack>

            {/* Primary Color */}
            <Stack gap='xs'>
              <Text fw={500} size='sm'>
                Primary Color
              </Text>
              <SimpleGrid cols={{ base: 2, sm: 4, md: 7 }} spacing='xs'>
                {colorOptions.map((color) => (
                  <motion.div key={color.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Card
                      withBorder
                      p='xs'
                      style={{
                        cursor: 'pointer',
                        borderColor: primaryColor === color.value ? 'var(--mantine-color-blue-6)' : undefined,
                        borderWidth: primaryColor === color.value ? '2px' : undefined,
                      }}
                      onClick={() => setPrimaryColor(color.value as any)}
                    >
                      <Stack gap='xs' align='center'>
                        <ColorSwatch color={color.color} size={24} />
                        <Text size='xs' ta='center' fw={500}>
                          {color.label}
                        </Text>
                      </Stack>
                    </Card>
                  </motion.div>
                ))}
              </SimpleGrid>
            </Stack>

            {/* Border Radius */}
            <Stack gap='xs'>
              <Text fw={500} size='sm'>
                Border Radius
              </Text>
              <Select
                allowDeselect={false}
                data={radiusOptions}
                value={radius}
                onChange={(value) => setRadius(value as any)}
                description='Choose the roundness of UI elements'
              />
            </Stack>

            {/* Spacing */}
            <Stack gap='xs'>
              <Text fw={500} size='sm'>
                Spacing
              </Text>
              <Select
                allowDeselect={false}
                data={spacingOptions}
                value={spacing}
                onChange={(value) => setSpacing(value as any)}
                description='Choose the spacing between UI elements'
              />
            </Stack>

            {/* Heading Font */}
            <Stack gap='xs'>
              <Text fw={500} size='sm'>
                Heading Font
              </Text>
              <Select
                allowDeselect={false}
                data={fontOptions}
                value={headingFont}
                onChange={(value) => setHeadingFont(value as any)}
                description='Choose the font for headings and titles'
              />
            </Stack>

            {/* Body Font */}
            <Stack gap='xs'>
              <Text fw={500} size='sm'>
                Body Font
              </Text>
              <Select
                allowDeselect={false}
                data={fontOptions}
                value={bodyFont}
                onChange={(value) => setBodyFont(value as any)}
                description='Choose the font for body text and content'
              />
            </Stack>

            {/* Heading Font Size */}
            <Stack gap='xs'>
              <Text fw={500} size='sm'>
                Heading Font Size
              </Text>
              <Select
                allowDeselect={false}
                data={fontSizeOptions}
                value={headingFontSize}
                onChange={(value) => setHeadingFontSize(value as any)}
                description='Choose the size for headings and titles'
              />
            </Stack>

            {/* Body Font Size */}
            <Stack gap='xs'>
              <Text fw={500} size='sm'>
                Body Font Size
              </Text>
              <Select
                allowDeselect={false}
                data={fontSizeOptions}
                value={bodyFontSize}
                onChange={(value) => setBodyFontSize(value as any)}
                description='Choose the size for body text and content'
              />
            </Stack>
          </Stack>
        </Card>
      </motion.div>

      <motion.div variants={slideUp} initial='hidden' animate='visible' transition={{ delay: 0.2 }}>
        <Card withBorder>
          <Stack gap='lg'>
            <Title order={3}>📊 Preview</Title>
            <Text c='dimmed' size='sm'>
              See how your settings look:
            </Text>
            <Group gap='md'>
              <Badge color={primaryColor} size='lg'>
                Sample Badge
              </Badge>
              <Badge color={primaryColor} variant='light' size='lg'>
                Light Badge
              </Badge>
              <Badge color={primaryColor} variant='outline' size='lg'>
                Outline Badge
              </Badge>
            </Group>
            <Text size='xs' c='dimmed'>
              Current settings: {colorScheme} theme • {primaryColor} color • {radius} radius • {spacing} spacing •{' '}
              {headingFont} headings ({headingFontSize}) • {bodyFont} body ({bodyFontSize})
            </Text>
          </Stack>
        </Card>
      </motion.div>
    </Stack>
  );
}
