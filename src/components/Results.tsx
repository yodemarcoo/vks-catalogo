import { For, Show } from 'solid-js';
import type { Song } from '../types/song';
import { SongCard } from './SongCard';

interface ResultsProps {
  songs: Song[];
  total: number;
  visible: number;
  onLoadMore: () => void;
  onClear: () => void;
}

export function Results(props: ResultsProps) {
  return (
    <section class="results-section" aria-live="polite" aria-labelledby="results-title">
      <div class="results-heading">
        <div>
          <p class="eyebrow">Catálogo VKS</p>
          <h2 id="results-title">
            {props.total.toLocaleString('pt-BR')} {props.total === 1 ? 'música encontrada' : 'músicas encontradas'}
          </h2>
        </div>
        <span class="results-count">{props.visible.toLocaleString('pt-BR')} exibidas</span>
      </div>

      <Show
        when={props.songs.length > 0}
        fallback={
          <div class="empty-state">
            <div class="empty-icon" aria-hidden="true">♫</div>
            <h3>Nenhuma música encontrada.</h3>
            <p>Experimente buscar por outro cantor ou música.</p>
            <button type="button" class="secondary-button" onClick={props.onClear}>Limpar filtros</button>
          </div>
        }
      >
        <div class="song-grid">
          <For each={props.songs}>{(song) => <SongCard song={song} />}</For>
        </div>

        <Show when={props.visible < props.total}>
          <div class="load-more-wrap">
            <button class="load-more" type="button" onClick={props.onLoadMore}>
              Mostrar mais músicas
            </button>
          </div>
        </Show>
      </Show>
    </section>
  );
}
