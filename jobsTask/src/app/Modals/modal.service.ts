import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject('close') as any;
  private mode: BehaviorSubject<'edit' | 'new'> = new BehaviorSubject('new') as any;

  static job: any;

  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  watchMode(): Observable<'edit' | 'new'> {
    return this.mode.asObservable();
  }

  open(job?: any) {
    job ? this.mode.next('edit') : this.mode.next('new');
    ModalService.job = job ? job : null;

    this.display.next('open');
  }

  close() {
    this.display.next('close');
  }
}