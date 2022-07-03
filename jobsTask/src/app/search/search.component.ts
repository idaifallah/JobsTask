import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AppEvent, AppEventType } from '../app.component';
import { EventQueueService } from '../Event/event-queue-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  filterTextChanged: Subject<string> = new Subject<string>();
  
  constructor(private eventQueue: EventQueueService) { }

  ngOnInit(): void {
  }

  onFilterTextChanged(event: any) {
    let term = event?.target?.value;
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(term => {
          this.eventQueue.dispatch(new AppEvent(AppEventType.ClickedOnNotification, term));
        });
    }
    this.filterTextChanged.next(term);
  }
}
