import { RecipeDetailResponseBody } from './contract/recipe-detail-response-body';
export interface RecipeDetailResponseBodyEvent
{
    isResponseOk: boolean;
    recipeDetailResponseBody: RecipeDetailResponseBody;
}
