import type { Song } from '../types/song';

export function SongCard(props: { song: Song }) {
  return (
    <article class="song-card">
      <div class="song-mark" aria-hidden="true">♪</div>
      <div class="song-content">
        <h3>{props.song.title}</h3>
        <p>{props.song.artist}</p>
      </div>
      {props.song.genre && <span class="song-genre">{props.song.genre}</span>}
    </article>
  );
}
