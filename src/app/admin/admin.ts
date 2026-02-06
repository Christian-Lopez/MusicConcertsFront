import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [Header, Footer, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {}
