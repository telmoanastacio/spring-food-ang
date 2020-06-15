import { RecipeSearchResponseBody } from './contract/recipe-search-response-body';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../user/user.service';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Config } from '../config';
import { RecipeSearchResponseBodyEvent } from './recipe-search-response-body-event';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService
{
  private BASE_URL: string = Config.BASE_URL;

  @Output("recipeSearchResponseBodyEvent")
  public recipeSearchResponseBodyEventEmitter:
  EventEmitter<RecipeSearchResponseBodyEvent>
    = new EventEmitter<RecipeSearchResponseBodyEvent>();

  private userService: UserService = null;
  private httpClient: HttpClient = null;

  public recipeSearchResponseBody: RecipeSearchResponseBody = null;

  public constructor(userService: UserService, httpClient: HttpClient)
  {
    this.userService = userService;
    this.httpClient = httpClient;
  }

  private generateRecipeSearchObservable(
    recipeName: string, searchType?: number)
    : Observable<RecipeSearchResponseBody>
  {
    if(!this.userService.isLogedin()
      || recipeName === null
      || recipeName === undefined)
    {
      return;
    }

    let urlStr: string = this.BASE_URL;
    urlStr += "/spring-food-api/recipes/";
    urlStr += recipeName;
    if(searchType !== null && searchType !== undefined)
    {
      urlStr += "?searchType=";
      urlStr += searchType;
    }

    return this.httpClient.get<any>(urlStr);
  }

  public recipeSearch(recipeName: string, searchType?: number): void
  {
    this.generateRecipeSearchObservable(recipeName, searchType).subscribe(
      {
        next: (response: RecipeSearchResponseBody) =>
        {
          this.recipeSearchResponseBody = response;
          this.recipeSearchResponseBodyEventEmitter.emit(
            {
              isResponseOk: true,
              recipeSearchResponseBody: this.recipeSearchResponseBody
            });

          return;
        },
        error: (e: any) =>
        {
          console.log(e);

          return;
        },
        complete: () =>
        {
          // console.log("complete");
        }
      });
  }
}
