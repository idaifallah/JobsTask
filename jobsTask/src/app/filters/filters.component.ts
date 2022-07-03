import { Component, OnInit, Input } from '@angular/core';
import { AppEvent, AppEventType } from '../app.component';
import { EventQueueService } from '../Event/event-queue-service.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  sectors: any = [];
  countries: any = [];
  cities: any = [];

  filter = {
    'sector': [] as string[],
    'city': [] as string[],
    'country': [] as string[]
  }

  @Input() public jobs: any[] = [];

  constructor(private eventQueue: EventQueueService) { }

  ngOnInit(): void {
    this.sectors = [...new Set(this.jobs.map((job: any) => job.sector))];
    this.countries = [...new Set(this.jobs.map((job: any) => job.country))];
    this.cities = [...new Set(this.jobs.map((job: any) => job.city))];
  }

  filterJobs(type: any, value: string) {
    if(type == 'sector') {
      let index = this.filter.sector.indexOf(value);
      if(index != -1) {
        this.filter.sector.splice(index, 1)
      } else {
        this.filter.sector.push(value);
      }
    } else if(type == 'city') {
      let index = this.filter.city.indexOf(value);
      if(index != -1) {
        this.filter.city.splice(index, 1)
      } else {
        this.filter.city.push(value);
      }
    } else if(type == 'country') {
      let index = this.filter.country.indexOf(value);
      if(index != -1) {
        this.filter.country.splice(index, 1)
      } else {
        this.filter.country.push(value);
      }
    }
    
    this.eventQueue.dispatch(new AppEvent(AppEventType.ClickedOnNotification, this.filter));
  }

}
