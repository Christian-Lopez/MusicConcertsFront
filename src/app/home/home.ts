import { ChangeDetectorRef, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
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

@Component({
  selector: 'app-home',
  imports: [Header, Footer, MatSelectModule, ConcertCard,MatFormFieldModule,ReactiveFormsModule,Highlightable],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
    

 concerts: WritableSignal<Concert[]> = signal([]);
  genres: WritableSignal<Genre[]> = signal([]);

  initialConcerts: Concert[] = [];

  currentGenre = new FormControl(0);
  searchBarValue = '';
  searchGenreValue = 0;

  homeService  = inject(HomeService);
  cdr = inject(ChangeDetectorRef)
  ngOnInit()  {
    console.log('Home component initialized');
    // Example of fetching data from an API
    // fetch('https://jsonplaceholder.typicode.com/todos')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Concerts data:', data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching concerts data:', error);
    //   });
    //Using httpClient
    // this.homeService.getHome().subscribe((res)=>{
    //   console.log(res);
    // });
    this.homeService.getHome().subscribe((response) => {
      this.initialConcerts = response.concerts;
      this.genres.set (response.genres);
      this.concerts.set(this.initialConcerts);
      console.log('conciertos iniciales: ', this.initialConcerts);      
      this.cdr.detectChanges();
    });

    this.currentGenre.valueChanges.subscribe((value: number | null) => {      
      this.searchGenreValue = value || 0;
      this.filterConcerts();
    });    
  }
  filterConcerts() {
    this.filterByGenre();
    this.filterByDescription();
  }

  filterByGenre() {
    if (this.searchGenreValue === 0) {
      this.concerts.set(this.initialConcerts);
    } else {
      this.concerts.set( this.initialConcerts.filter(
        (concert) => concert.genreId === this.searchGenreValue
      )
    )
    }

    console.log('conciertos: ', this.concerts);
  }

  filterByDescription() {
    if (!this.searchBarValue) return;

    this.concerts.set(
      this.concerts().filter((concert) =>
      concert.description
        .toLowerCase()
        .includes(this.searchBarValue.toLowerCase())
    )
  )
  }

  onSearchBarValueChange(value: string) {        
    this.searchBarValue = value;     
    this.filterConcerts();
  }
}
