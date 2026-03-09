export type GenreType = 'jazz_hiphop' | 'techno';

export interface GenreTheme {
  label: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    particles: string[];
    bgBase: [number, number, number];
  };
}

export const genreThemes: Record<GenreType, GenreTheme> = {
  jazz_hiphop: {
    label: 'JAZZ / HIP-HOP',
    colors: {
      primary: '#d4a574',
      secondary: '#a0522d',
      accent: '#e8c07a',
      particles: [
        '#d4a574',
        '#e8c07a',
        '#c4956a',
        '#f0d49a',
        '#a0522d',
        '#8b6914',
      ],
      bgBase: [8, 4, 5],
    },
  },
  techno: {
    label: 'TECHNO',
    colors: {
      primary: '#c8c8c8',
      secondary: '#808080',
      accent: '#e0e0e0',
      particles: [
        '#ffffff',
        '#d0d0d0',
        '#a0a0a0',
        '#787878',
        '#e8e8e8',
        '#b0b0b0',
      ],
      bgBase: [3, 3, 3],
    },
  },
};

export const genreList: GenreType[] = ['jazz_hiphop', 'techno'];
