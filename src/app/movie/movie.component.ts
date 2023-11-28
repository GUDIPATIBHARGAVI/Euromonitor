import { Component } from '@angular/core';
interface Movie {
  title: string;
  poster: string;
  isVoted: boolean;
}
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  movies: Movie[] = [
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
  selectedMovie: Movie | null = null;

  vote(movie: Movie) {
    if (this.selectedMovie === movie) {
      movie.isVoted = false;
      this.selectedMovie = null;
    } else {
      if (this.selectedMovie) {
        this.selectedMovie.isVoted = false;
      }
      movie.isVoted = true;
      this.selectedMovie = movie;
    }
  }
}
