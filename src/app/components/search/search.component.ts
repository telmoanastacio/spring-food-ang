import { RecipeSearchResponseBodyEvent } from './../../services/api-client/recipe-search-response-body-event';
import { RecipeBaseResponse } from './../../services/api-client/contract/recipe-base-response';
import { ApiClientService } from './../../services/api-client/api-client.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { StateMessage } from './state-message.enum';
import { Component, OnInit, ChangeDetectorRef, ApplicationRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy
{
  public stateMessage: StateMessage = StateMessage.LOGIN_MISSING;

  public userService: UserService = null;
  public apiClientService: ApiClientService = null;

  public recipeBaseResponseList: Array<RecipeBaseResponse> = new Array();

  public constructor(
    userService: UserService,
    apiClientService: ApiClientService)
  {
    this.userService = userService;
    this.apiClientService = apiClientService;
  }

  public ngOnInit(): void
  {
    this.userService.userLoginStatusEventEmitter.subscribe(loginStatusEvent =>
      {
        this.setRecipeBaseResponseList(null);
      });
    this.apiClientService.recipeSearchResponseBodyEventEmitter.subscribe(
      recipeSearchResponseBodyEvent =>
      {
        const RECIPE_SEARCH_RESPONSE_BODY_EVENT: RecipeSearchResponseBodyEvent
          = recipeSearchResponseBodyEvent;
        this.setRecipeBaseResponseList(
          RECIPE_SEARCH_RESPONSE_BODY_EVENT
          .recipeSearchResponseBody
          .recipeBaseResponseList);
      });

    if(this.userService.isLogedin())
    {
      this.stateMessage = StateMessage.CONTENT_MISSING;
    }
    else
    {
      this.stateMessage = StateMessage.LOGIN_MISSING;
    }
    // this.stateMessage = StateMessage.OK;
  }

  public ngOnDestroy(): void
  {
    this.userService.userLoginStatusEventEmitter.unsubscribe();
    this.apiClientService.recipeSearchResponseBodyEventEmitter.unsubscribe();
  }

  public onSubmitSearchQuery(
    searchQueryForm: NgForm): void
  {
    const recipeName: string = searchQueryForm.form.controls.recipeName.value;
    let ingredientCheckBox: any =
      searchQueryForm.form.controls.ingredientCheckBox.value;
    if(ingredientCheckBox === null
      || ingredientCheckBox === undefined
      || ingredientCheckBox === "")
    {
      ingredientCheckBox = false;
    }

    this.apiClientService.recipeSearch(
      recipeName, ingredientCheckBox === true ? 1 : 0);
  }

  public getRecipeImageAddress(recipeBaseResponseListIndex: number): string
  {
    if(this.recipeBaseResponseList === null
      || this.recipeBaseResponseList === undefined
      || this.recipeBaseResponseList.length === 0
      || this.recipeBaseResponseList[recipeBaseResponseListIndex] === null
      || this.recipeBaseResponseList[recipeBaseResponseListIndex] === undefined
      || this.recipeBaseResponseList[recipeBaseResponseListIndex].image === null
      || this.recipeBaseResponseList[recipeBaseResponseListIndex].image ===
        undefined)
    {
      return "";
    }

    return "https://spoonacular.com/recipeImages/"
      + this.recipeBaseResponseList[recipeBaseResponseListIndex].image;
  }

  public onRecipeBaseItemClick(recipeBaseResponseListIndex: number): void
  {
    if(this.recipeBaseResponseList === null
      || this.recipeBaseResponseList === undefined
      || this.recipeBaseResponseList.length === 0
      || this.recipeBaseResponseList[recipeBaseResponseListIndex] === null
      || this.recipeBaseResponseList[recipeBaseResponseListIndex] === undefined
      || this.recipeBaseResponseList[recipeBaseResponseListIndex].image === null
      || this.recipeBaseResponseList[recipeBaseResponseListIndex].image ===
        undefined)
    {
      return;
    }

    console.log("Pressed item with recipe base id: "
    + this.recipeBaseResponseList[recipeBaseResponseListIndex].id);

    //TODO: route to recipeDetail?recipeBaseId={recipeBaseId}
    // this.router.navigate(["/recipeDetail?recipeBaseId={recipeBaseId}"]);
  }

  public setRecipeBaseResponseList(
    recipeBaseResponseList: Array<RecipeBaseResponse>): void
  {
    if(recipeBaseResponseList !== null
      && recipeBaseResponseList !== undefined
      && recipeBaseResponseList.length > 0)
    {
      this.recipeBaseResponseList = recipeBaseResponseList;
      this.stateMessage = StateMessage.OK;
    }
    else
    {
      this.recipeBaseResponseList = [];
      this.stateMessage = StateMessage.CONTENT_MISSING;
    }
  }
}
