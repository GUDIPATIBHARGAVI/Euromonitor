import { Component } from '@angular/core';
import { Imovie } from '../../models/Imovie';
import { movieData } from '../../models/movie.model';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  movies: Imovie[];
  selectedMovie: Imovie | null = null;

  constructor(private movieDataService: movieData) {
    this.movies = this.movieDataService.getMovies();
  }

  public voteForMovie(movie: Imovie): void {
    this.selectedMovie = this.selectedMovie === movie ? null : movie;
    if (this.selectedMovie) {
      this.selectedMovie.isVoted = !this.selectedMovie.isVoted;
    }
    if (this.selectedMovie && this.selectedMovie !== movie) {
      this.selectedMovie.isVoted = false;
    }
  }
}
