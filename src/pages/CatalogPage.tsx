import { createMemo, createResource, createSignal, Show } from 'solid-js';
import { Header } from '../components/Header';
import { Results } from '../components/Results';
import { SearchFilters } from '../components/SearchFilters';
import { staticSongRepository } from '../data/songRepository';
import type { SongFilters } from '../types/song';
import { matchesSongs } from '../utils/search';

export function CatalogPage() {
  const [songsResource] = createResource(staticSongRepository.getAll);
  const [query, setQuery] = createSignal('');
  const [artist, setArtist] = createSignal('');
  const [title, setTitle] = createSignal('');
  const [visibleLimit, setVisibleLimit] = createSignal(80);

  const filters = createMemo<SongFilters>(() => ({ query: query(), artist: artist(), title: title() }));
  const filteredSongs = createMemo(() => matchesSongs(songsResource() ?? [], filters()));
  const visibleSongs = createMemo(() => filteredSongs().slice(0, visibleLimit()));
  const hasFilters = createMemo(() => Boolean(query() || artist() || title()));

  const clearFilters = () => {
    setQuery('');
    setArtist('');
    setTitle('');
    setVisibleLimit(80);
  };

  const handleFilterChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setVisibleLimit(80);
  };

  return (
    <div class="app-shell">
      <Header />

      <main>
        <section class="hero">
          <div class="hero-glow hero-glow-one" aria-hidden="true"></div>
          <div class="hero-glow hero-glow-two" aria-hidden="true"></div>
          <div class="container hero-inner">
            <div class="hero-copy">
              <span class="hero-kicker"><span aria-hidden="true">●</span> VemCantar Karaokê Show</span>
              <h1 id="search-title">Qual vai ser a <em>próxima?</em></h1>
              <p>Encontre sua próxima música para cantar no VKS. Pesquise pelo nome da música ou pelo cantor.</p>
            </div>
            <div class="stage-lines" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <Show when={!songsResource.loading} fallback={<div class="loading-note">Carregando catálogo de músicas…</div>}>
              <SearchFilters
                songs={songsResource() ?? []}
                filters={filters()}
                onQueryChange={handleFilterChange(setQuery)}
                onArtistChange={handleFilterChange(setArtist)}
                onTitleChange={handleFilterChange(setTitle)}
                onClear={clearFilters}
              />
            </Show>
          </div>
        </section>

        <div class="container content-wrap">
          <Show when={songsResource.error}>
            <div class="data-note">Não foi possível carregar o catálogo principal. O modo de demonstração está ativo.</div>
          </Show>

          <Results
            songs={visibleSongs()}
            total={filteredSongs().length}
            visible={visibleSongs().length}
            onLoadMore={() => setVisibleLimit((value) => value + 80)}
            onClear={clearFilters}
          />

          <Show when={!hasFilters() && filteredSongs().length > 0}>
            <p class="catalog-note">Dica: digite apenas parte do nome. A busca ignora acentos e maiúsculas.</p>
          </Show>
        </div>
      </main>

      <footer class="site-footer">
        <div class="container footer-inner">
          <span>VKS — VemCantar Karaokê Show</span>
          <span>Catálogo de músicas</span>
        </div>
      </footer>
    </div>
  );
}
