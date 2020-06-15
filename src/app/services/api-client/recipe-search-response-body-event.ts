import { RecipeSearchResponseBody } from './contract/recipe-search-response-body';
export interface RecipeSearchResponseBodyEvent
{
    isResponseOk: boolean;
    recipeSearchResponseBody: RecipeSearchResponseBody;
}
