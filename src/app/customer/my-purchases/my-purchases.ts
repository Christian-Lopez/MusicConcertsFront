import { Component, inject, OnInit, signal } from '@angular/core';
import { ConcertService } from '../../shared/services/concert-service';
import { AuthService } from '../../shared/services/auth-service';
import { Sale } from '../../shared/models/concert-model';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-my-purchases',
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './my-purchases.html',
  styleUrl: './my-purchases.css'
})
export class MyPurchases implements OnInit {
  concertService = inject(ConcertService);
  authService = inject(AuthService);
  mySales = signal<Sale[]>([]);

  ngOnInit() {
    this.concertService.getMySales(this.authService.getEmail()).subscribe((res) => {
      if (res.success) {
        this.mySales.set(res.data);
      }
    });
  }
}


