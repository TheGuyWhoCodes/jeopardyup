import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { Subscription, Observable } from 'rxjs';
import { EventModel } from './../../core/models/event.model';
import { CategoryModel } from 'src/app/core/models/category.model';
import { FormControl } from '@angular/forms';

export interface Difficulty {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  myControl = new FormControl();
  category: CategoryModel[];
  filteredOptions: Observable<string[]>;



  pageTitle = 'Jeopardy Search';
  eventListSub: Subscription;
  eventList: EventModel[];
  filteredEvents: EventModel[];
  loading: boolean;
  error: boolean;
  minDate: Date;
  maxDate: Date;
  diff: String;
  query: '';

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService
  ) { }
  questions: Difficulty[] = [
    {value: '100', viewValue: '$100'},
    {value: '200', viewValue: '$200'},
    {value: '300', viewValue: '$300'},
    {value: '400', viewValue: '$400'},
    {value: '500', viewValue: '$500'}
  ];
  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getEventList("");
    this.populateCategories();
    
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.category.filter(option => option.toLowerCase().includes(filterValue));
  }

   _getEventList(question: string, diff?: string) {
    this.loading = true;
    // Get future, public events
    console.log(this.minDate)
    this.eventListSub = this.api
      .getEvents$(question, this.minDate, this.maxDate, diff)
      .subscribe(
        res => {
          this.eventList = res;
          this.filteredEvents = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }
  searchEvents() {
    this.filteredEvents = this.fs.search(this.eventList, this.query, 'question', 'mediumDate');
  }

  resetQuery() {
    this.query = '';
    this.filteredEvents = this.eventList;
  }

  ngOnDestroy() {
    this.eventListSub.unsubscribe();
  }

  formatDate(time) {
    return new Date(time).toLocaleDateString("en-US");
  }

  updateMinimum(event){
    this.minDate = (event.value.toISOString())
  }
  updateMaximum(event){
    this.maxDate = (event.value.toISOString())
  }
  populateCategories() {
    this.api.getCategories$()
    .subscribe((response)=>{
        this.category = response;
        console.log(this.category); //<-- not undefined anymore
    });
  }
  updateDiff() {

  }
}