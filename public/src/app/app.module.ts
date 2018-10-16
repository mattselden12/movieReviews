import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { QuotesComponent } from './quotes/quotes.component';
import { AddqComponent } from './addq/addq.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewComponent,
    EditComponent,
    QuotesComponent,
    AddqComponent,
    ReviewsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
