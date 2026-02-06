import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CustomDateAdapter } from '../../shared/adapters/custom-date-adapter';
import { SalesTableDataModel } from './sales.model';
import { SalesService } from './sales-service';
import { Sale } from '../../shared/models/concert-model';

const MY_DATE_FORMATS = {
  display: {},
};
@Component({
  selector: 'app-sales',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
  ],
  templateUrl: './sales.html',
  styleUrl: './sales.css',
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS,
    },
  ],
})
export class Sales implements OnInit, AfterViewInit {
  displayedColumns = ['client', 'event', 'tickets', 'total', 'saleDate', 'eventDate'];

  initialData: SalesTableDataModel[] = [];
  dataSource = new MatTableDataSource<SalesTableDataModel>();

  salesLoaded = false;

  genres: string[] = [];
  events: string[] = [];

  filterFormGroup = new FormGroup({
    genreEnabled: new FormControl({ value: false, disabled: true }),
    genre: new FormControl({ value: '', disabled: true }),
    eventEnabled: new FormControl({ value: false, disabled: true }),
    event: new FormControl({ value: '', disabled: true }),
    datesEnabled: new FormControl({ value: true, disabled: true }),
    dateFrom: new FormControl(new Date()),
    dateTo: new FormControl(new Date()),
  });

  salesService = inject(SalesService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadSales();
    this.setupFilterListeners();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupPaginatorLabels();
  }

  loadSales() {
    this.salesLoaded = false;
    const { dateFrom, dateTo } = this.filterFormGroup.controls;

    this.salesService.listSalesByDate(dateFrom.value!, dateTo.value!).subscribe((res) => {
      this.salesLoaded = true;
      this.handleSalesResponse(res.data);
    });
  }
  handleSalesResponse(data: Sale[]) {
    if (data.length === 0) {
      this.disableFilterControls();
      this.dataSource.data = [];
      return;
    }
    this.enableFilterControls();
    this.initialData = data.map(this.formatSaleData);
    this.dataSource.data = this.initialData;
    this.genres = this.extractUniqueValues(data, 'genre');
    this.events = this.extractUniqueValues(data, 'title');
  }
  setupFilterListeners() {
    this.filterFormGroup.controls.genreEnabled.valueChanges.subscribe((value) => {
      this.toggleControl(this.filterFormGroup.controls.genre, value!);
    });
    this.filterFormGroup.controls.genre.valueChanges.subscribe(() => {
      this.reactiveFilter();
    });

    this.filterFormGroup.controls.eventEnabled.valueChanges.subscribe((value) => {
      this.toggleControl(this.filterFormGroup.controls.event, value!);
    });
    this.filterFormGroup.controls.event.valueChanges.subscribe(() => {
      this.reactiveFilter();
    });
  }
  setupPaginatorLabels() {
    this.paginator._intl.itemsPerPageLabel = 'Nro de ventas por página:';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.nextPageLabel = 'Siguiente';
  }
  toggleControl(control: FormControl, enable: boolean) {
    if (enable) {
      control.enable();
    } else {
      control.setValue('');
      control.disable();
    }
  }
  reactiveFilter() {
    const { genre, event } = this.filterFormGroup.controls;

    if (!genre.value && !event.value) {
      this.dataSource.data = this.initialData;
      return;
    }

    this.dataSource.data = this.initialData.filter((sale) => {
      return (
        (genre.value ? sale.genre === genre.value : true) &&
        (event.value ? sale.event.toLowerCase().includes(event.value.toLowerCase()) : true)
      );
    });
  }
  formatSaleData(sale: Sale): SalesTableDataModel {
    return {
      client: sale.fullName,
      event: sale.title,
      tickets: sale.quantity,
      total: sale.total,
      eventDate: sale.dateEvent,
      saleDate: sale.saleDate,
      genre: sale.genre,
    };
  }
  extractUniqueValues(data: any[], key: string): string[] {
    return Array.from(new Set(data.map((item) => item[key])));
  }
  enableFilterControls() {
    this.filterFormGroup.controls.genreEnabled.enable();
    this.filterFormGroup.controls.eventEnabled.enable();
  }
  disableFilterControls() {
    this.filterFormGroup.controls.genreEnabled.disable();
    this.filterFormGroup.controls.genre.disable();
    this.filterFormGroup.controls.eventEnabled.disable();
    this.filterFormGroup.controls.event.disable();
  }
}
