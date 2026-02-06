import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [Header, Footer, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {}
