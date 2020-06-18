import { UserService } from 'src/app/services/user/user.service';
import { StateRoute } from './state-route.enum';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-root',
  templateUrl: './content-root.component.html',
  styleUrls: ['./content-root.component.css']
})
export class ContentRootComponent implements OnInit
{
  private location: Location = null;
  private router: Router = null;
  public userService: UserService = null;

  public currentRoute: StateRoute = StateRoute.ROOT;

  public constructor(
    location: Location,
    router: Router,
    userService: UserService)
  {
    this.location = location;
    this.router = router;
    this.userService = userService;
  }

  public ngOnInit(): void
  {
    this.getCurrentRoute();
  }

  private getCurrentRoute(): void
  {
    switch(this.location.path())
    {
      case StateRoute.RECIPE_CREATE:
      {
        this.userService.currentRoute = StateRoute.RECIPE_CREATE;
        break;
      }
      default:
      {
        this.userService.currentRoute = StateRoute.ROOT;
      }
    }
  }

  public onSearchClick(): void
  {
    this.router.navigate(["/"]);
    this.userService.currentRoute = StateRoute.ROOT;
  }

  public onCreateClick(): void
  {
    this.router.navigate(["/recipeCreate"]);
    this.userService.currentRoute = StateRoute.RECIPE_CREATE;
  }
}
