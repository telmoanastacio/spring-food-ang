import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-pre-menu',
  templateUrl: './pre-menu.component.html',
  styleUrls: ['./pre-menu.component.css']
})
export class PreMenuComponent implements OnInit
{
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

  public constructor() {}

  public ngOnInit(): void{}

  public onMenuClick(): void
  {
    // console.log("button click");
    this.showMenu = !this.showMenu;
    this.isComponentClick = this.showMenu;
    this.isMenuButtonClick = true;
  }
}
