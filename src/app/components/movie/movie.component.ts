import { Component } from '@angular/core';
import { Movie } from '../models/Imovie';
import { MovieDataService } from '../models/movie.model';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [MovieDataService],
})
export class MovieComponent {
  movies: Movie[];
  selectedMovie: Movie | null = null;

  constructor(private movieDataService: MovieDataService) {
    this.movies = this.movieDataService.getMovies();
  }

  public voteformovie(movie: Movie): void {
    this.selectedMovie = this.selectedMovie === movie ? null : movie;
    if (this.selectedMovie) {
      this.selectedMovie.isVoted = !this.selectedMovie.isVoted;
    }
    if (this.selectedMovie && this.selectedMovie !== movie) {
      this.selectedMovie.isVoted = false;
    }
  }
}
