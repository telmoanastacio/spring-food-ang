import { MeasureResponse } from './measure-response';
export interface IngredientResponse
{
    id: number;
    spoonacularId: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    original: string;
    originalString: string;
    originalName: string;
    amount: number;
    unit: string;
    ingredientMetaList: Array<string>;
    ingredientMetaInformationList: Array<string>;
    measure: MeasureResponse;
}
