import { Component, OnInit } from '@angular/core';
import { CsrfService } from 'src/app/services/csrf/csrf.service';
import { UserService } from 'src/app/services/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-menu-options',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit
{
  private csrfService: CsrfService = null;
  public userService: UserService = null;

  public constructor(csrfService: CsrfService, userService: UserService)
  {
    this.csrfService = csrfService;
    this.userService = userService;
  }

  public ngOnInit(): void
  {
    this.csrfService.getCsrfToken();
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

  public onSubmitRegisterForm(signInForm: NgForm): void
  {
    const username: string = signInForm.form.controls.username.value;
    const password: string = signInForm.form.controls.password.value;
    const cPassword: string = signInForm.form.controls.cpassword.value;
    const name: string = signInForm.form.controls.name.value;
    const surname: string = signInForm.form.controls.surname.value;
    const email: string = signInForm.form.controls.email.value;

    if(username === null
      || username === undefined
      || username.length === 0
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
      this.userService.register(
        username,
        password,
        cPassword,
        name === undefined ? null: name,
        surname === undefined ? null: surname,
        email === undefined ? null: email)
    }
    else
    {
      alert("Password and confirmation password doesn't match");
    }
  }

  public onLogoutClick(): void
  {
    this.userService.logout();
  }

  public onDeleteAccountClick(): void
  {
    this.userService.deleteAccount();
  }
}