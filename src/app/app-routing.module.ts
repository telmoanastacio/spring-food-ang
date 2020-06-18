import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { SearchComponent } from './components/search/search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes =
[
  {path: "", component: SearchComponent},
  {path: "recipeDetail/:recipeBaseId", component: RecipeDetailComponent},
  {path: "recipeCreate", component: SearchComponent},
  {path: "recipeDelete/:recipeBaseId", component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
