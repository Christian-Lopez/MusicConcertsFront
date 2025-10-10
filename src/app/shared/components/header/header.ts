import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule,MatButton,ReactiveFormsModule,],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input({ transform: booleanAttribute }) showLogoOnly: boolean = false;
  searchControl = new FormControl('');
  @Output() searchValueChange = new EventEmitter<string>();

  onInput(searchValue: Event) {
    const inputEvent = searchValue as InputEvent;
    const target = inputEvent.target as HTMLInputElement;
    this.searchValueChange.emit(target.value);
    // console.log("Header Emitted:", searchValue); // <-- CHECK THIS LOG!
  }
  
}
