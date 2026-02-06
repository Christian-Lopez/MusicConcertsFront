import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { Concert } from '../shared/models/concert-model';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth-service';
import { ConcertCard } from '../home/concert-card/concert-card';
import { ConcertService } from '../shared/services/concert-service';
import { MatButtonModule } from '@angular/material/button';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BuyTicket } from '../shared/components/buy-ticket/buy-ticket';
import { VoucherDialog } from '../shared/components/voucher-dialog/voucher-dialog';
import confetti from 'canvas-confetti';



@Component({
  selector: 'app-event-detail',
  imports: [Header, Footer, ConcertCard, MatButtonModule,CommonModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  concert!: Concert;  
  isDetail = signal<boolean>(false);
  authService = inject(AuthService);
  router = inject(Router);
  matDialog = inject(MatDialog);
  eventId = '';
  activatedRouter = inject(ActivatedRoute);
  concertsService = inject(ConcertService);  
  ngOnInit() {
    this.eventId = this.activatedRouter.snapshot.params['id'];
    // this.concertsService.getConcertById(this.eventId).subscribe((res) => {
    //   this.concert = res.data;
    //   console.log(this.concert)
    //   // this.cdr.detectChanges();
    // });
     this.concertsService
      .getConcertById(this.eventId)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('error: ', err);
          alert(err.error.errorMessage);
          return of();
        })
      )
      .subscribe((res) => {
        this.isDetail.set(true);        
        this.concert=res.data                
      });
      
  }

  openBuyDialog() {
    const buyDialogRef = this.matDialog.open(BuyTicket, {
      data: this.concert,
    });

    buyDialogRef.afterClosed().subscribe((res) => {
      if (!res) return;

      confetti({
        zIndex: 1001,
      });

      const voucherDialogRef = this.matDialog.open(VoucherDialog, {
        data: res,
      });

      voucherDialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }
}
