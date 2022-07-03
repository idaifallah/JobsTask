import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { AppEvent, AppEventType } from '../app.component';

@Injectable({
  providedIn: 'root'
})

export class EventQueueService {

  private eventBrocker = new Subject<any>();

  on(eventType: AppEventType): Observable<AppEvent<any>> {
    return this.eventBrocker.pipe(filter(event => event.type === eventType));
  }


  dispatch<T>(event: AppEvent<T>): void {
    this.eventBrocker.next(event);
  }

}