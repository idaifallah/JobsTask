import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchComponent } from './search/search.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobModalComponent } from './job-modal/job-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    SearchComponent,
    JobsListComponent,
    JobModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
