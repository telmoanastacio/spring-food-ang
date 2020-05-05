import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './login';
import { Observable } from 'rxjs';
import { CsrfService } from '../csrf/csrf.service';
import { HttpUtilsService } from '../utils/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  private BASE_URL: string = "localhost:8081";

  private csrfService: CsrfService = null;
  private httpUtilsService: HttpUtilsService = null;
  private httpClient: HttpClient = null;

  private logedin: boolean = false;

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
          this.logedin = true;
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
          this.httpUtilsService.redirectToExternalUrl("localhost:8081/");
          return;
        },
        complete: () =>
        {
          // console.log("complete");
        }});
  }

  public isLogedin(): boolean
  {
    return this.logedin;
  }
}