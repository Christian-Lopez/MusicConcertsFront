import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { LoginForm } from './login-form/login-form';

@Component({
  selector: 'app-login',
  imports: [Header, Footer,LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
