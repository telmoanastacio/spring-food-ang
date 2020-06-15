import { RecipeBaseResponse } from './recipe-base-response';
export interface RecipeSearchResponseBody
{
    status: number;
    message: string;
    timeStamp: number;
    recipeBaseResponseList: Array<RecipeBaseResponse>;
}
