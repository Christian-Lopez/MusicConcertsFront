import {
  Component,
  inject,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { MatSelectModule } from '@angular/material/select';
import { ConcertCard } from './concert-card/concert-card';
import { HomeService } from './home-service';
import { Concert } from '../shared/models/concert-model';
import { Genre } from '../shared/models/genre-model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Highlightable } from '../shared/directives/highlightable';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Footer,
    MatSelectModule,
    ConcertCard,
    MatFormFieldModule,
    ReactiveFormsModule,
    Highlightable,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  homeService = inject(HomeService);

  // State Signals
  sourceConcerts = signal<Concert[]>([]);
  genres = signal<Genre[]>([]);
  
  // Filter Signals
  searchQuery = signal('');
  selectedGenreId = signal(0);
  
  // Computed State
  concerts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const genreId = this.selectedGenreId();
    
    return this.sourceConcerts().filter(concert => {
      const matchesGenre = genreId === 0 || concert.genreId === genreId;
      const matchesSearch = !query || 
                            concert.description.toLowerCase().includes(query) || 
                            concert.title.toLowerCase().includes(query);
      return matchesGenre && matchesSearch;
    });
  });

  currentGenre = new FormControl(0);

  ngOnInit() {
    console.log('Home component initialized');
    
    this.homeService.getHome().subscribe((response) => {
      this.sourceConcerts.set(response.concerts);
      this.genres.set(response.genres);
      console.log('Initial concerts loaded:', response.concerts);
    });

    this.currentGenre.valueChanges.subscribe((value) => {
      this.selectedGenreId.set(value || 0);
    });
  }

  onSearchBarValueChange(value: string) {
    this.searchQuery.set(value);
  }
}
