import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService
{
  constructor() {}

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
    window.location.href = url;
  }
}