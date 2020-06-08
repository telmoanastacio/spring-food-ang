import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService
{
  private router: Router = null;
  private document: Document = null;

  public constructor(router: Router, @Inject(DOCUMENT) document: Document)
  {
    this.router = router;
    this.document = document;
  }

  /**
   * return a native form request body
   */
  public getFormUrlEncoded(objectToConvert: Object)
  {
		const formBody: Array<string> = [];
    for(const property in objectToConvert)
    {
			const encodedKey: string = encodeURIComponent(property);
			const encodedValue: string = encodeURIComponent(
        objectToConvert[property]);
			formBody.push(encodedKey + "=" + encodedValue);
    }
    
		return formBody.join("&");
  }
  
  public redirectToExternalUrl(url: string): void
  {
    this.router.navigate(["/"]).then(result =>
      {
        window.location.href = url;
      });
  }
}