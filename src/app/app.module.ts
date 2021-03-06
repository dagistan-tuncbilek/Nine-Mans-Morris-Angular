import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { InstructionsComponent } from './main/instructions/instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
