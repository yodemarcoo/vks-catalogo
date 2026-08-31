import { For, createMemo } from 'solid-js';
import { Combobox, createListCollection } from '@ark-ui/solid/combobox';
import { normalize } from '../utils/search';
import type { Song } from '../types/song';

interface ArtistComboboxProps {
  songs: Song[];
  value: string;
  onChange: (value: string) => void;
}

export function ArtistCombobox(props: ArtistComboboxProps) {
  const artists = createMemo(() => {
    const unique = [...new Set(props.songs.map((song) => song.artist.trim()).filter(Boolean))];
    return unique.sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));
  });

  const collection = createMemo(() => {
    const input = normalize(props.value);
    const items = input ? artists().filter((artist) => normalize(artist).includes(input)).slice(0, 40) : artists().slice(0, 40);
    return createListCollection({
      items,
      itemToString: (item) => item,
      itemToValue: (item) => item,
    });
  });

  return (
    <Combobox.Root
      collection={collection()}
      value={props.value ? [props.value] : []}
      onValueChange={(details) => props.onChange(details.value[0] ?? '')}
      inputValue={props.value}
      onInputValueChange={(details) => props.onChange(details.inputValue)}
      openOnClick
      closeOnSelect
      selectionBehavior="replace"
    >
      <Combobox.Label class="field-label">Cantor</Combobox.Label>
      <Combobox.Control class="combobox-control">
        <Combobox.Input class="field-control" placeholder="Todos os cantores" aria-label="Filtrar por cantor" />
        <Combobox.Trigger class="combobox-trigger" aria-label="Abrir lista de cantores">⌄</Combobox.Trigger>
        <Combobox.ClearTrigger class="combobox-clear" aria-label="Limpar cantor">×</Combobox.ClearTrigger>
      </Combobox.Control>
      <Combobox.Positioner class="combobox-positioner">
        <Combobox.Content class="combobox-content">
          <Combobox.Empty class="combobox-empty">Nenhum cantor encontrado.</Combobox.Empty>
          <For each={collection().items}>
            {(artist) => (
              <Combobox.Item item={artist} class="combobox-item">
                <Combobox.ItemText>{artist}</Combobox.ItemText>
                <Combobox.ItemIndicator class="combobox-indicator">✓</Combobox.ItemIndicator>
              </Combobox.Item>
            )}
          </For>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
}
