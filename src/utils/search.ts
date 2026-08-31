import type { Song, SongFilters } from '../types/song';

export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

export function matchesSongs(songs: Song[], filters: SongFilters): Song[] {
  const query = normalize(filters.query);
  const artist = normalize(filters.artist);
  const title = normalize(filters.title);

  if (!query && !artist && !title) return songs;

  return songs.filter((song) => {
    const songArtist = normalize(song.artist);
    const songTitle = normalize(song.title);

    const matchesQuery = !query || songArtist.includes(query) || songTitle.includes(query);
    const matchesArtist = !artist || songArtist === artist;
    const matchesTitle = !title || songTitle.includes(title);

    return matchesQuery && matchesArtist && matchesTitle;
  });
}

export function uniqueArtists(songs: Song[]): string[] {
  return [...new Set(songs.map((song) => song.artist.trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }),
  );
}
