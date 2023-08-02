import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class LoginComponent implements OnInit  {

  public loginRequest: LoginRequest= <LoginRequest>{};
  

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private messageService: MessageService
  ) {}

  async login() {
    let status = await this.authService.login(this.loginRequest);
    
    if (status == ResponseStatus.Ok)  {
      await this.router.navigate(['/todo']);
    } else if (status == ResponseStatus.Invalid)
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email veya Şifre Hatalı'});
    this.loginRequest.password = '';
    
  }

  ngOnInit()  {
    const switchers: Element[] = Array.from(document.querySelectorAll('.switcher'));

    switchers.forEach((item: Element) => {
      item.addEventListener('click', function() {
        const parentElement = (item.parentElement as HTMLElement);
        switchers.forEach((el: Element) => el.parentElement!.classList.remove('is-active'));
        parentElement.classList.add('is-active');
      });
    });
  }
}
