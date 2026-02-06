import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from '../../models/concert-model';
import { ConcertService } from '../../services/concert-service';

@Component({
  selector: 'app-voucher-dialog',
  imports: [],
  templateUrl: './voucher-dialog.html',
  styleUrl: './voucher-dialog.css',
})
export class VoucherDialog implements OnInit {
  saleId = inject(MAT_DIALOG_DATA) as number;
  sale: Sale | null = null;
  concertsService = inject(ConcertService);

  ngOnInit(): void {
    this.concertsService.getSaleById(this.saleId).subscribe((res) => {
      this.sale = res.data;
    });
  }
}
