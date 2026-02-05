import { Component, Inject, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Concert } from '../../models/concert-model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConcertService } from '../../services/concert-service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-buy-ticket',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './buy-ticket.html',
  styleUrl: './buy-ticket.css',
  standalone: true
})
export class BuyTicket {
  concertService = inject(ConcertService);
  dialogRef = inject(MatDialogRef<BuyTicket>);
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Concert) {}

  quantity: number = 1;
  totalPrice = signal(0);

  updateTotal() {
    this.totalPrice.set(this.data.unitPrice * this.quantity);
  }

  ngOnInit() {
    this.updateTotal();
  }

  buy() {
    this.concertService.buyTickets(this.data.id.toString(), this.quantity)
      .pipe(
        catchError(err => {
          alert('Error processing purchase');
          console.error(err);
          return of(null);
        })
      )
      .subscribe(res => {
        if (res && res.success) {
          alert('Tickets purchased successfully!');
          this.dialogRef.close(true); // Close with success
        } else if (res) {
            alert(res.errorMessage || 'Purchase failed');
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
