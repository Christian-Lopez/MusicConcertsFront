import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { Concert } from '../shared/models/concert-model';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth-service';
import { ConcertCard } from '../home/concert-card/concert-card';
import { ConcertService } from '../shared/services/concert-service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-event-detail',
  imports: [Header, Footer, ConcertCard, MatButtonModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  concert!: Concert;
  authService = inject(AuthService);
  router = inject(Router);
  matDialog = inject(MatDialog);
  eventId = '';
  activatedRouter = inject(ActivatedRoute);
  concertsService = inject(ConcertService);
  cdr = inject(ChangeDetectorRef);
  ngOnInit() {
    this.eventId = this.activatedRouter.snapshot.params['id'];
    this.concertsService.getConcertById(this.eventId).subscribe((res) => {
      this.concert = res.data;
      console.log(this.concert)
      this.cdr.detectChanges();
    });
  }

  openBuyDialog() {}
}
