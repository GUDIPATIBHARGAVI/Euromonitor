import { Injectable } from '@angular/core';
import { Movie } from './Imovie';

@Injectable({
  providedIn: 'root',
})
export class MovieDataService {
  getMovies(): Movie[] {
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
