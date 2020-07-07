import { DismissMenuEvent } from './../../services/user/dismiss-menu-event';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pre-menu',
  templateUrl: './pre-menu.component.html',
  styleUrls: ['./pre-menu.component.css']
})
export class PreMenuComponent implements OnInit, OnDestroy
{
  private userService: UserService = null;
  private dismissMenuEventSubscription: Subscription = null;

  public showMenu: boolean = false;
  private isComponentClick: boolean = false;
  private isMenuButtonClick: boolean = false;

  @HostListener("click")
  private clickInside(): void
  {
    if(!this.isMenuButtonClick)
    {
      // console.log("inside");
      this.showMenu = true;
      this.isComponentClick = true;
      this.isMenuButtonClick = false;
    }
  }
  
  @HostListener("document:click")
  private clickOut(): void
  {
    if(!this.isComponentClick && !this.isMenuButtonClick)
    {
      // console.log("outside");
      this.showMenu = false;
    }
    this.isComponentClick = false;
    this.isMenuButtonClick = false;
  }

  public constructor(userService: UserService)
  {
    this.userService = userService;


  }

  public ngOnInit(): void
  {
    this.dismissMenuEventSubscription =
      this.userService.dismissMenuEventEmitter.subscribe(dismissMenuEvent =>
      {
        const DISMISS_MENU_EVENT: DismissMenuEvent
          = dismissMenuEvent;

        this.handleDismissMenuEvent(DISMISS_MENU_EVENT);
      });
  }

  public ngOnDestroy(): void
  {
    this.dismissMenuEventSubscription.unsubscribe();
  }

  private handleDismissMenuEvent(dismissMenuEvent: DismissMenuEvent)
  {
    if(dismissMenuEvent !== null && dismissMenuEvent !== undefined)
        {
          let isDismiss = false;

          if(dismissMenuEvent.isForceDismiss !== null
            && dismissMenuEvent.isForceDismiss !== undefined
            && dismissMenuEvent.isForceDismiss)
          {
            isDismiss = true;
          }

          if(dismissMenuEvent.isForceDismiss !== null
            && dismissMenuEvent.isForceDismiss !== undefined
            && dismissMenuEvent.isForceDismiss)
          {
            isDismiss = true;
          }

          if(dismissMenuEvent.isLogin !== null
            && dismissMenuEvent.isLogin !== undefined
            && dismissMenuEvent.isLogin)
          {
            isDismiss = true;
          }

          if(dismissMenuEvent.isLogout !== null
            && dismissMenuEvent.isLogout !== undefined
            && dismissMenuEvent.isLogout)
          {
            isDismiss = true;
          }

          if(dismissMenuEvent.isDeleteAccount !== null
            && dismissMenuEvent.isDeleteAccount !== undefined
            && dismissMenuEvent.isDeleteAccount)
          {
            isDismiss = true;
          }

          if(isDismiss)
          {
            this.onMenuClick();
          }
        }
  }

  public onMenuClick(): void
  {
    // console.log("button click");
    this.showMenu = !this.showMenu;
    this.isComponentClick = this.showMenu;
    this.isMenuButtonClick = true;
  }
}
