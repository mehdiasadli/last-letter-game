import { Card, Select, Stack, Text, Title } from '@mantine/core';
import { Packs } from '../data/service';
import { useEffect, useMemo } from 'react';
import { languages } from '../data/languages';
import { useGamePackStore } from '../stores/game-pack.store';
import type { Pack } from '../data/types';

export function SelectPack() {
  const { packName, packLanguage, pack, setPackName, setPackLanguage, setPack } = useGamePackStore();

  const packs = useMemo(() => {
    return Packs.getPacks();
  }, []);

  useEffect(() => {
    if (!packName) {
      setPack(null);
      setPackLanguage('');
    } else {
      const pack = packs.find((p) => p.name === packName);

      if (!pack) {
        setPack(null);
      } else {
        setPack(pack);
        setPackLanguage(Object.keys(pack.words)[0]);
      }
    }
  }, [packName]);

  const packsData = useMemo(() => {
    // group packs by category
    const groupedPacks: Record<string, Pack[]> = {};

    packs.forEach((p) => {
      const cat = p.category[0] || 'Other';
      if (!groupedPacks[cat]) {
        groupedPacks[cat] = [];
      }
      groupedPacks[cat].push(p);
    });

    // Convert to Mantine Select format
    return Object.entries(groupedPacks).map(([group, groupPacks]) => ({
      group,
      items: groupPacks.map((p) => ({
        value: p.name,
        label: p.name,
      })),
    }));
  }, [packs]);

  return (
    <Card withBorder>
      <Stack gap='lg'>
        <Title order={3} ta='center'>
          📚 Word Pack
        </Title>

        <Stack gap='md'>
          <Select
            label='Select the pack'
            allowDeselect={false}
            searchable
            placeholder='Pick the pack you want to play'
            description={pack ? pack.description || undefined : 'Choose a word pack to play with'}
            data={packsData}
            value={packName}
            onChange={(value) => setPackName(value as string)}
            size='md'
          />

          {/* Select language */}
          {pack && (
            <Select
              label='Select the language'
              allowDeselect={false}
              placeholder='Pick the language you want to play'
              description={
                pack && packLanguage
                  ? `📖 ${pack.words[packLanguage as keyof typeof pack.words]!.length} words available in this pack`
                  : undefined
              }
              data={Object.keys(pack.words).map((k) => ({
                value: k,
                label: languages.find((l) => l.code === k)?.name ?? k,
              }))}
              value={packLanguage}
              onChange={(value) => setPackLanguage(value as string)}
              size='md'
            />
          )}
        </Stack>

        {pack && (
          <Text size='sm' c='dimmed' ta='center'>
            🎯 Ready to play with <strong>{pack.name}</strong>
            {packLanguage && ` in ${languages.find((l) => l.code === packLanguage)?.name || packLanguage}`}
          </Text>
        )}
      </Stack>
    </Card>
  );
}
