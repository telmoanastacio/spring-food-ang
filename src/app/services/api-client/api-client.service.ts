import { RecipeDetailResponseBodyEvent } from './recipe-detail-response-body-event';
import { RecipeSearchResponseBody } from './contract/recipe-search-response-body';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../user/user.service';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { RecipeSearchResponseBodyEvent } from './recipe-search-response-body-event';
import { RecipeDetailResponseBody } from './contract/recipe-detail-response-body';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService
{
  @Output("recipeSearchResponseBodyEvent")
  public recipeSearchResponseBodyEventEmitter:
  EventEmitter<RecipeSearchResponseBodyEvent>
    = new EventEmitter<RecipeSearchResponseBodyEvent>();

  @Output("recipeDetailResponseBodyEvent")
  public recipeDetailResponseBodyEventEmitter:
  EventEmitter<RecipeDetailResponseBodyEvent>
    = new EventEmitter<RecipeDetailResponseBodyEvent>();

  private userService: UserService = null;
  private httpClient: HttpClient = null;

  public recipeSearchResponseBody: RecipeSearchResponseBody = null;
  public recipeDetailResponseBody: RecipeDetailResponseBody = null;

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

    let urlStr: string = "";
    urlStr += "spring-food-api/recipes/";
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

  private generateRecipeDetailSearchObservable(recipeBaseId: number)
  : Observable<RecipeDetailResponseBody>
  {
    if(!this.userService.isLogedin()
      || recipeBaseId === null
      || recipeBaseId === undefined)
    {
      return;
    }

    let urlStr: string = "";
    urlStr += "spring-food-api/recipeDetail/";
    urlStr += recipeBaseId;

    return this.httpClient.get<any>(urlStr);
  }

  public recipeDetailSearch(recipeBaseId: number): void
  {
    this.generateRecipeDetailSearchObservable(recipeBaseId).subscribe(
      {
        next: (response: RecipeDetailResponseBody) =>
        {
          this.recipeDetailResponseBody = response;
          this.recipeDetailResponseBodyEventEmitter.emit(
            {
              isResponseOk: true,
              recipeDetailResponseBody: this.recipeDetailResponseBody
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
