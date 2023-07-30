import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




// client/src/app/app.module.ts
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this line

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule,     AppRoutingModule,    FormsModule], // Add FormsModule to imports
  providers: [],
  bootstrap: [AppComponent],
})
// export class AppModule {}



export class AppModule { }
