import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreMenuComponent } from './components/pre-menu/pre-menu.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContentRootComponent } from './components/content-root/content-root.component';

@NgModule({
   declarations: [
      AppComponent,
      PreMenuComponent,
      MenuComponent,
      ContentRootComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
