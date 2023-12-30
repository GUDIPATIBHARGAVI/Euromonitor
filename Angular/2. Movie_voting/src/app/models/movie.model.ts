import { Imovie } from './Imovie';
export class movieData {
  getMovies(): Imovie[] {
    return [
      {
        title: 'Harry potter',
        poster: 'assets/images/harry-potter.jpg',
        isVoted: false,
      },
      {
        title: 'Avatar',
        poster: 'assets/images/avatar.jpeg',
        isVoted: false,
      },
      { title: 'Frozen', poster: 'assets/images/frozen.jpeg', isVoted: false },
      {
        title: 'Stolen princess',
        poster: 'assets/images/stolen-princess.jpg',
        isVoted: false,
      },
    ];
  }
}
