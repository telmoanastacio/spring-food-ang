import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CsrfService } from '../services/csrf/csrf.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{
  private csrfService: CsrfService = null;
  private userService: UserService = null;

  public isLoginVisible: boolean = false;
  public isRegisterVisible: boolean = false;
  
  constructor(csrfService: CsrfService, userService: UserService)
  {
    this.csrfService = csrfService;
    this.userService = userService;
  }

  public ngOnInit()
  {
    this.init();

    this.csrfService.getCsrfToken();
  }

  private init() : void
  {
    this.isLoginVisible = false;
    this.isRegisterVisible = false;
  }

  public onSubmitSignIn(signInForm: NgForm): void
  {
    const username: string = signInForm.form.controls.username.value;
    const password: string = signInForm.form.controls.password.value;

    if(username === null
      || username === undefined
      || username.length === 0
      || password === null
      || password === undefined
      || password.length === 0)
    {
      alert("Invalid data");
      return;
    }

    this.userService.login(username, password);
  }

  public onLoginClick(): void
  {
    this.isLoginVisible = !this.isLoginVisible;
  }

  public onSubmitRegisterForm(signInForm: NgForm): void
  {
    const email: string = signInForm.form.controls.email.value;
    const password: string = signInForm.form.controls.password.value;
    const cPassword: string = signInForm.form.controls.cpassword.value;
    const name: string = signInForm.form.controls.name.value;
    const surname: string = signInForm.form.controls.surname.value;

    if(email === null
      || email === undefined
      || email.length === 0
      || password === null
      || password === undefined
      || password.length === 0
      || cPassword === null
      || cPassword === undefined
      || cPassword.length === 0)
    {
      alert("Invalid data");
      return;
    }

    if(cPassword === password)
    {
    }
    else
    {
      alert("Password and confirmation password doesn't match");
    }
  }

  public onRegisterClick(): void
  {
    this.isRegisterVisible = !this.isRegisterVisible;
  }
}