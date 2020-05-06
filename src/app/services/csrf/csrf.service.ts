import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsrfService
{
  private csrfStr: string = null;

  constructor() {}

  /**
   * return document CSRF token
   */
  public getCsrfToken(): string
  {
    if(this.csrfStr == null)
    {
      this.csrfStr = document.body.children["_csrf"].value;
    }
    
    return this.csrfStr;
  }

  public setCsrfToken(csrfToken: string)
  {
    this.csrfStr = csrfToken;
  }
}