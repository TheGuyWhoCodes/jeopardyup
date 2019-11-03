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
  categories$ = this.api.getCategories$()
  filteredOptions: Observable<string[]>;
  pageTitle = 'Jeopardy Search';
  eventListSub: Subscription;
  categoryListSub: Subscription;
  eventList: EventModel[];
  filteredEvents: EventModel[];
  categories: CategoryModel[];
  categoryID: number[];
  categorySearch: string;
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
    {value: '500', viewValue: '$500'},
    {value: '600', viewValue: '$600'},
    {value: '700', viewValue: '$700'},
    {value: '800', viewValue: '$800'},
    {value: '900', viewValue: '$900'},
    {value: '1000', viewValue: '$1000'},
    {value: '1110', viewValue: '$1110'},

  ];
  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getEventList();
    this._getCategories();
    this.minDate = undefined;
    this.maxDate = undefined;
  }

  _getEventList(question?: string, diff?: string, category?: number[]) {
    this.loading = true;
    // Get future, public events
    this.eventListSub = this.api
      .getEvents$(question, this.minDate, this.maxDate, diff,category)
      .subscribe(
        res => {
          this.eventList = res;
          this.filteredEvents = res;
          this.loading = false;
          this.categoryID = [];
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }
  async _search(question?: string, diff?: string) {
    this._getEventList(question, diff, await this.getCategoryID())
  }
  getCategoryID() : number[]{
    for(let i = 0; i < this.categories.length; i++) {
      if(this.categories[i].title.includes(this.categorySearch)) {
        this.categoryID.push(this.categories[i].id);
      }
    }
    return this.categoryID
  }
  updateCategorySearch(event) {
    this.categorySearch = event;
  }
  _getCategories() {
    this.categoryListSub = this.api
    .getCategories$()
    .subscribe(
      res => {
        this.categories = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    )
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
  getOptionText(option) {
    return option.title;
  }
}