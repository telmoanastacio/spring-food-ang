import { StepResponse } from './step-response';
import { IngredientResponse } from './ingredient-response';

export interface RecipeDetail
{
    id: number;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationInMinutes: number;
    cookingMinutes: number;
    sourceUrl: string;
    spoonacularSourceUrl: string;
    aggregateLikes: number;
    spoonacularScore: number;
    healthScore: number;
    creditsText: string;
    sourceName: string;
    pricePerServing: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    image: string;
    imageType: string;
    summary: string;
    instructions: string;
    originalId: number;
    dishTypes: Array<string>;
    cuisines: Array<string>;
    stepOptionList: Array<Array<StepResponse>>;
    ingredients: Array<IngredientResponse>;
}
