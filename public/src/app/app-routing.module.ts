import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AddqComponent } from './addq/addq.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  { path: "new", component: NewComponent },
  { path: "edit/:id", component: EditComponent },
  { path: "", pathMatch: "full", component: MainComponent },
  { path: "reviews/:id", component: ReviewsComponent },
  { path: "write/:id", component: AddqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
