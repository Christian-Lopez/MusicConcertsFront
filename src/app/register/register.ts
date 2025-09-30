import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { RegisterForm } from './register-form/register-form';

@Component({
  selector: 'app-register',
  imports: [Header,Footer,RegisterForm],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

}
