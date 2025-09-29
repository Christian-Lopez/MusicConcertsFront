import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { MatSelectModule } from '@angular/material/select';
import { ConcertCard } from './concert-card/concert-card';
import { HomeService } from './home-service';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, MatSelectModule, ConcertCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  homeService  = inject(HomeService);
  ngOnInit() :void {
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
    this.homeService.getHome().subscribe((res)=>{
      console.log(res);
    });
  }
}
