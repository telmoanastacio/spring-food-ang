import { RecipeDetail } from './recipe-detail';

export interface RecipeDetailResponseBody
{
    status: number;
    message: string;
    timeStamp: number;
    recipeDetail: RecipeDetail;
}
