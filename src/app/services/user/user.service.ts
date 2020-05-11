import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './login';
import { Observable } from 'rxjs';
import { CsrfService } from '../csrf/csrf.service';
import { HttpUtilsService } from '../utils/http-utils.service';
import { Register } from './register';
import { Logout } from './logout';
import { DeleteAccount } from './delete-account';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  private BASE_URL: string = "http://localhost:8081";

  private csrfService: CsrfService = null;
  private httpUtilsService: HttpUtilsService = null;
  private httpClient: HttpClient = null;

  private logedin: boolean = false;
  private username: string = null;
  private password: string = null;

  constructor(
    csrfService: CsrfService,
    httpUtilsService: HttpUtilsService,
    httpClient: HttpClient)
  {
    this.csrfService = csrfService;
    this.httpUtilsService = httpUtilsService;
    this.httpClient = httpClient;
  }

  private generateLoginObservable(
    username: string,
    password: string): Observable<any>
  {
    if(username === null
      || username === undefined
      || password === null
      || password === undefined)
    {
      return;
    }
    
    const login: Login =
    {
      username: username,
      password: password,
      _csrf: this.csrfService.getCsrfToken()
    };
    
    return this.httpClient.post<any>(
      this.BASE_URL + "/authenticate",
      this.httpUtilsService.getFormUrlEncoded(login),
      {
        observe: "response",
        headers: new HttpHeaders(
          {'Content-Type': 'application/x-www-form-urlencoded'})
      });
  }

  public login(username: string, password: string)
  {
    this.generateLoginObservable(username, password).subscribe(
      {
        next: (response: any) =>
        {
          // accepted
          if(response.status === 202)
          {
            const token = response.headers.get('_csrf')
            this.csrfService.setCsrfToken(token);

            this.logedin = true;
            this.username = username;
            this.password = password;

            //TODO: route to login-accepted (it was in login route)

            return;
          }
          this.httpUtilsService.redirectToExternalUrl(this.BASE_URL + "/");
          return;
        },
        error: (e: any) =>
        {
          // forbiden
          if(e.status === 401)
          {
            this.httpUtilsService.redirectToExternalUrl(
              "localhost:8081/access-denied");
            return;
          }
          this.httpUtilsService.redirectToExternalUrl(this.BASE_URL + "/");
          return;
        },
        complete: () =>
        {
          // console.log("complete");
        }
      });
  }

  private generateRegisterObservable(
    username: string,
    password: string,
    confirmPassword: string,
    name?: string,
    surname?: string,
    email?: string,
  ): Observable<any>
  {
    if(username === null
      || username === undefined
      || password === null
      || password === undefined
      || confirmPassword === null
      || confirmPassword === undefined
      || password !== confirmPassword)
    {
      return;
    }

    const register: Register =
    {
      username: username,
      password: password,
      confirmpassword: confirmPassword,
      name: name,
      surname: surname,
      email: email,
      _csrf: this.csrfService.getCsrfToken()
    };
    
    return this.httpClient.post<any>(
      this.BASE_URL + "/register",
      this.httpUtilsService.getFormUrlEncoded(register),
      {
        observe: "response",
        headers: new HttpHeaders(
          {'Content-Type': 'application/x-www-form-urlencoded'})
      });
  }

  public register(
    username: string,
    password: string,
    confirmPassword: string,
    name?: string,
    surname?: string,
    email?: string
  )
  {
    this.generateRegisterObservable(
      username,
      password,
      confirmPassword,
      name,
      surname,
      email).subscribe(
        {
          next: (response: any) =>
          {
            // accepted
            if(response.status === 202)
            {
              //TODO: route to register-successful (it was in register route)
  
              return;
            }
            this.httpUtilsService.redirectToExternalUrl(this.BASE_URL + "/");
            return;
          },
          error: (e: any) =>
          {
            // conflict - user already registered
            if(e.status === 409)
            {
              console.log("user already registered");

              //TODO: route to register-conflict (it was in register route)

              return;
            }
            this.httpUtilsService.redirectToExternalUrl(this.BASE_URL + "/");
            return;
          },
          complete: () =>
          {
            // console.log("complete");
          }
        });
  }

  private generateLogoutObservable(): Observable<any>
  {
    const logout: Logout =
    {
      _csrf: this.csrfService.getCsrfToken()
    };
    
    return this.httpClient.post<any>(
      this.BASE_URL + "/logout",
      this.httpUtilsService.getFormUrlEncoded(logout),
      {
        headers: new HttpHeaders(
          {'Content-Type': 'application/x-www-form-urlencoded'})
      });
  }

  public logout(): void
  {
    this.generateLogoutObservable().subscribe(
      {
        next: (response: any) =>
        {
          this.username = null;
          this.password = null;
          this.logedin = false;
          //TODO: route to logout-successful

          return;
        },
        error: (e: any) =>
        {
          this.logedin = false;
          //TODO: route to logout-failed

          return;
        },
        complete: () =>
        {
          // console.log("complete");
        }
      });
  }

  private generateDeleteAccountObservable(): Observable<any>
  {
    if(!this.isLogedin || this.username === null || this.username === undefined)
    {
      return;
    }
    
    const deleteAccount: DeleteAccount =
    {
      username: this.username,
      _csrf: this.csrfService.getCsrfToken()
    };
    
    return this.httpClient.post<any>(
      this.BASE_URL + "/delete-account",
      this.httpUtilsService.getFormUrlEncoded(deleteAccount),
      {
        observe: "response",
        headers: new HttpHeaders(
          {'Content-Type': 'application/x-www-form-urlencoded'})
      });
  }

  public deleteAccount()
  {
    this.generateDeleteAccountObservable().subscribe(
        {
          next: (response: any) =>
          {
            // accepted
            if(response.status === 202)
            {
              this.username = null;
              this.password = null;
              this.logedin = false;

              //TODO: route to delete-account-success
  
              return;
            }
            this.httpUtilsService.redirectToExternalUrl(this.BASE_URL + "/");
            return;
          },
          error: (e: any) =>
          {
            // bad request - user not found
            if(e.status === 400)
            {
              console.log("user not found");

              //TODO: route to delete-account-fail

              return;
            }
            this.httpUtilsService.redirectToExternalUrl(this.BASE_URL + "/");
            return;
          },
          complete: () =>
          {
            // console.log("complete");
          }
        });
  }

  public isLogedin(): boolean
  {
    return this.logedin;
  }
}