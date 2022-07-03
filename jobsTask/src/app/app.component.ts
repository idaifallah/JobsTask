import { Component } from '@angular/core';
import { EventQueueService } from './Event/event-queue-service.service';
import { JobService } from './Jobs/job.service';
import { ModalService } from './Modals/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jobsTask';
  jobs: any;
  renderedJobs: any;
  ready: boolean = false;
  filter: any = {
    'sector': null,
    'country': null,
    'city': null
  }

  constructor(
    private jobService: JobService,
    private modalService: ModalService,
    private eventQueue: EventQueueService
  ){};

  ngOnInit(): void {
    this.getJobs();

    this.eventQueue.on(AppEventType.ClickedOnNotification).subscribe(event => this.filterHandler(event.payload));
    this.eventQueue.on(JobAddedEventType.JobAdded as any).subscribe(event => this.getJobs());
  }

  getJobs() {
    this.jobService.getJobs().subscribe((jobs: any) => {
      this.jobs = JSON.parse(jobs.jobs);
      this.renderedJobs = this.jobs;
      this.ready = true;
    });
  }

  openAddNewJobModal() {
    this.modalService.open();
  }

  filterHandler(filter: any) {
    this.ready = false;

    if(typeof(filter) === "string") {
      if(filter.length) {
        this.renderedJobs = this.renderedJobs.filter((job: any) => {
          return (job.title).toLocaleLowerCase().includes(filter.trim()) ? job : null;
        });
      } else {
        this.renderedJobs = this.jobs;
      }

      this.ready = true;
      return;
    }

    if (!filter.sector.length && !filter.country.length && !filter.city.length) {
      this.renderedJobs = this.jobs;
    } else {
      if (filter.sector.length) {
        this.renderedJobs = this.jobs.filter((job: any) => {
          if(filter.sector.indexOf(job.sector) != -1) {
            return job;
          }
        });
      }

      if (filter.country.length) {
        this.renderedJobs = this.jobs.filter((job: any) => {        
          if(filter.country.indexOf(job.country) != -1) {
            return job;
          }
        });
      }

      if(filter.city.length) {
        this.renderedJobs = this.jobs.filter((job: any) => {
          if(filter.city.indexOf(job.city) != -1) {
            return job;
          }
        });
      }
    }

    this.ready = true;
  }
}

export enum AppEventType {
  ClickedOnNotification = 'CLICKED_ON_NOTIFICATION',
  SocketEvent = 'SOCKET_EVENT',
}

export class AppEvent<T> {
  constructor(
    public type: AppEventType,
    public payload: T,
  ) {}
}

export enum JobAddedEventType {
  JobAdded = 'JOB_ADDED',
  SocketEvent = 'SOCKET_EVENT',
}

export class JobAddedEvent<T> {
  constructor(
    public type: JobAddedEventType
  ) {}
}