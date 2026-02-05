import { Component, Inject, inject, signal, computed } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Concert } from '../../models/concert-model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConcertService } from '../../services/concert-service';
import { catchError, finalize, of } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buy-ticket',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './buy-ticket.html',
  styleUrl: './buy-ticket.css',
  standalone: true
})
export class BuyTicket {
  concertService = inject(ConcertService);
  dialogRef = inject(MatDialogRef<BuyTicket>);
  snackBar = inject(MatSnackBar);
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Concert) {}

  quantity = signal(1);
  isBusy = signal(false);
  
  totalPrice = computed(() => {
    return this.data.unitPrice * this.quantity();
  });

  isValidConfirmation = computed(() => {
    const q = this.quantity();
    return q > 0 && q <= this.data.ticketsQuantity && !this.isBusy();
  });

  buy() {
    if (this.quantity() > this.data.ticketsQuantity) {
        this.snackBar.open(`Only ${this.data.ticketsQuantity} tickets available.`, 'Close', { duration: 3000 });
        return;
    }

    this.isBusy.set(true);
    this.concertService.buyTickets(this.data.id.toString(), this.quantity())
      .pipe(
        catchError(err => {
          console.error(err);
          this.snackBar.open(err.error?.errorMessage || 'Error processing purchase', 'Close', { duration: 3000 });
          return of(null);
        }),
        finalize(() => this.isBusy.set(false))
      )
      .subscribe(res => {
        if (res && res.success) {
          this.snackBar.open('Tickets purchased successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        } else if (res) {
          this.snackBar.open(res.errorMessage || 'Purchase failed', 'Close', { duration: 3000 });
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
