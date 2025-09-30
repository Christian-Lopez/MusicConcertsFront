import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Input({transform: booleanAttribute}) showLogoOnly: boolean = false;
}
