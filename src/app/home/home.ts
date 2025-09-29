import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { MatSelectModule } from '@angular/material/select';
import { ConcertCard } from './concert-card/concert-card';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, MatSelectModule, ConcertCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
