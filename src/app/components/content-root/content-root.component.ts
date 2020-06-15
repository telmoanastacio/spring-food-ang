import { UserService } from 'src/app/services/user/user.service';
import { StateMessage } from './state-message.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-root',
  templateUrl: './content-root.component.html',
  styleUrls: ['./content-root.component.css']
})
export class ContentRootComponent implements OnInit
{
  public stateMessage: StateMessage = StateMessage.CONTENT_MISSING;

  private userService: UserService = null;

  public constructor(userService: UserService)
  {
    this.userService = userService;
  }

  public ngOnInit(): void
  {
    if(this.userService.isLogedin())
    {
      this.stateMessage = StateMessage.CONTENT_MISSING;
    }
    else
    {
      this.stateMessage = StateMessage.LOGIN_MISSING;
    }
    // this.stateMessage = StateMessage.OK;
  }

}
