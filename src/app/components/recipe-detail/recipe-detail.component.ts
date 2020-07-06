import { RecipeDetailResponseBodyEvent } from './../../services/api-client/recipe-detail-response-body-event';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { Subscription } from 'rxjs';
import { RecipeDetail } from 'src/app/services/api-client/contract/recipe-detail';
import { IngredientResponse } from 'src/app/services/api-client/contract/ingredient-response';
import Fraction from 'node_modules/fraction.js/fraction';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy
{
  private activatedRoute: ActivatedRoute = null;

  private recipeBaseId: number = null;
  private apiClientService: ApiClientService = null;
  private recipeDetailResponseBodyEventSusbscription: Subscription = null;

  public recipeDetail: RecipeDetail = null;
  public tags: string = null;

  public constructor(
    activatedRoute: ActivatedRoute,
    apiClientService: ApiClientService)
  {
    this.activatedRoute = activatedRoute;
    this.apiClientService = apiClientService;
  }

  public ngOnInit(): void
  {
    this.recipeDetailResponseBodyEventSusbscription =
      this.apiClientService.recipeDetailResponseBodyEventEmitter.subscribe(
        recipeDetailResponseBodyEvent =>
      {
        const RECIPE_DETAIL_RESPONSE_BODY_EVENT: RecipeDetailResponseBodyEvent
          = recipeDetailResponseBodyEvent;

        this.recipeDetail = RECIPE_DETAIL_RESPONSE_BODY_EVENT
          .recipeDetailResponseBody
          .recipeDetail;
      });

    this.recipeBaseId = this.activatedRoute.snapshot.params["recipeBaseId"];
    this.apiClientService.recipeDetailSearch(this.recipeBaseId);

    console.log("=== recipeBaseId: " + this.recipeBaseId);
  }

  public ngOnDestroy(): void
  {
    this.recipeDetailResponseBodyEventSusbscription.unsubscribe();
  }

  private addTag(str: string, tag: string): string
  {
    if(str !== null && str !== undefined)
    {
      if(str.length > 0)
      {
        str += " ";
      }

      str += "#" + tag.toUpperCase();
    }

    return str;
  }

  public getTags(): string
  {
    if(this.recipeDetail === null || this.recipeDetail === undefined)
    {
      return null;
    }

    let str: string = "";

    if(this.recipeDetail.vegetarian !== null
      && this.recipeDetail.vegetarian !== undefined
      && this.recipeDetail.vegetarian)
    {
      str = this.addTag(str, "vegetarian");
    }

    if(this.recipeDetail.vegan !== null
      && this.recipeDetail.vegan !== undefined
      && this.recipeDetail.vegan)
    {
      str = this.addTag(str, "vegan");
    }

    if(this.recipeDetail.glutenFree !== null
      && this.recipeDetail.glutenFree !== undefined
      && this.recipeDetail.glutenFree)
    {
      str = this.addTag(str, "gluten-Free");
    }

    if(this.recipeDetail.dairyFree !== null
      && this.recipeDetail.dairyFree !== undefined
      && this.recipeDetail.dairyFree)
    {
      str = this.addTag(str, "dairy-Free");
    }

    if(this.recipeDetail.veryHealthy !== null
      && this.recipeDetail.veryHealthy !== undefined
      && this.recipeDetail.veryHealthy)
    {
      str = this.addTag(str, "very-Healthy");
    }

    if(this.recipeDetail.cheap !== null
      && this.recipeDetail.cheap !== undefined
      && this.recipeDetail.cheap)
    {
      str = this.addTag(str, "cheap");
    }

    if(this.recipeDetail.veryPopular !== null
      && this.recipeDetail.veryPopular !== undefined
      && this.recipeDetail.veryPopular)
    {
      str = this.addTag(str, "very-Popular");
    }

    if(this.recipeDetail.sustainable !== null
      && this.recipeDetail.sustainable !== undefined
      && this.recipeDetail.sustainable)
    {
      str = this.addTag(str, "sustainable");
    }

    if(this.recipeDetail.lowFodmap !== null
      && this.recipeDetail.lowFodmap !== undefined
      && this.recipeDetail.lowFodmap)
    {
      str = this.addTag(str, "low-Fodmap");
    }

    this.tags = str === "" ? null: str;

    return this.tags;
  }

  public getIngredientAmmount(ingredient: IngredientResponse): string
  {
    if(ingredient === null || ingredient === undefined)
    {
      return "";
    }

    let str: string = "";

    if(ingredient.amount !== null && ingredient.amount !== undefined)
    {
      const fraction: Fraction = new Fraction(ingredient.amount);

      str += fraction.toFraction(true);
    }
    
    if(str !== "")
    {
      if(ingredient.measure !== null
        && ingredient.measure !== undefined
        && ingredient.measure.impUnitShort !== null
        && ingredient.measure.impUnitShort !== undefined)
      {
        str += " " + ingredient.measure.impUnitShort;
      }
      else if(ingredient.unit !== null && ingredient.unit !== undefined)
      {
        str += " " + ingredient.unit;
      }
    }

    return str;
  }
}
