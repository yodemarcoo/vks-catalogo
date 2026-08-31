import { demoSongs } from './demoSongs';
import type { Song } from '../types/song';

export interface SongRepository {
  getAll(): Promise<Song[]>;
}

export const staticSongRepository: SongRepository = {
  async getAll() {
    try {
      const response = await fetch('./data/songs.json', { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Falha ao carregar catálogo (${response.status}).`);
      const data = (await response.json()) as Song[];
      return data.length ? data : demoSongs;
    } catch (error) {
      console.warn('Catálogo principal indisponível; usando dados de demonstração.', error);
      return demoSongs;
    }
  },
};
