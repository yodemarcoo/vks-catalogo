import { Field } from '@ark-ui/solid/field';
import { ArtistCombobox } from './ArtistCombobox';
import type { Song, SongFilters } from '../types/song';

interface SearchFiltersProps {
  songs: Song[];
  filters: SongFilters;
  onQueryChange: (value: string) => void;
  onArtistChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onClear: () => void;
}

export function SearchFilters(props: SearchFiltersProps) {
  return (
    <section class="search-panel" aria-labelledby="search-title">
      <div class="search-main">
        <Field.Root>
          <Field.Label class="sr-only">Pesquisar música ou cantor</Field.Label>
          <div class="search-input-wrap">
            <span class="search-icon" aria-hidden="true">⌕</span>
            <Field.Input
              id="global-search"
              class="search-input"
              type="search"
              value={props.filters.query}
              onInput={(event) => props.onQueryChange(event.currentTarget.value)}
              placeholder="Pesquise por música ou cantor..."
              autocomplete="off"
            />
            {props.filters.query && (
              <button class="input-clear" type="button" onClick={() => props.onQueryChange('')} aria-label="Limpar pesquisa">
                ×
              </button>
            )}
          </div>
        </Field.Root>
      </div>

      <div class="filter-grid">
        <ArtistCombobox songs={props.songs} value={props.filters.artist} onChange={props.onArtistChange} />

        <Field.Root>
          <Field.Label class="field-label" for="title-filter">Música</Field.Label>
          <Field.Input
            id="title-filter"
            class="field-control"
            type="search"
            value={props.filters.title}
            onInput={(event) => props.onTitleChange(event.currentTarget.value)}
            placeholder="Ex.: Evidências"
            autocomplete="off"
          />
        </Field.Root>

        <button class="clear-button" type="button" onClick={props.onClear}>
          Limpar filtros
        </button>
      </div>
    </section>
  );
}
