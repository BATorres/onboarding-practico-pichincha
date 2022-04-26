import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FullLayoutComponent } from './layout/full-layout.component';
import { SimpleLayoutComponent } from './layout/simple-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
