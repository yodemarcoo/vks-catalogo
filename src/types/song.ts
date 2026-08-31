export interface Song {
  id: number;
  title: string;
  artist: string;
  language?: string;
  genre?: string;
  tone?: string;
  notes?: string;
  difficulty?: 'facil' | 'medio' | 'dificil';
  link?: string;
  status?: 'available' | 'suggested' | 'inactive';
}

export interface SongFilters {
  query: string;
  artist: string;
  title: string;
}
