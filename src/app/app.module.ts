import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/api.service';
import { LoadingComponent } from './core/loading.component';
import { DatePipe } from '@angular/common';
import { UtilsService } from './core/utils.service';
import { FilterSortService } from './core/filter-sort.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventComponent } from './pages/event/event.component';
import { EventDetailComponent } from './pages/event/event-detail/event-detail.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    EventComponent,
    EventDetailComponent,
    SimulationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  providers: [
    Title,
    ApiService,
    DatePipe,
    UtilsService,
    FilterSortService,
  ],
  exports: [
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
