import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { ForgotPasswordForm } from './forgot-password-form/forgot-password-form';

@Component({
  selector: 'app-forgot-password',
  imports: [Header,Footer,ForgotPasswordForm],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

}
