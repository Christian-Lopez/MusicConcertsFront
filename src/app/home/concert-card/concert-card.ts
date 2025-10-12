import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Concert } from '../../shared/models/concert-model';

@Component({
  selector: 'app-concert-card',
  imports: [],
  templateUrl: './concert-card.html',
  styleUrl: './concert-card.css',
})
export class ConcertCard {
  @Input({ required: true }) data!: Concert;

  onImageError() {
    this.data.imageURl = 'https://i.pinimg.com/1200x/d1/a5/f5/d1a5f5cf0d9bd77fff46849c1cc1da1c.jpg';
  }
}
