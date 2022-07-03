import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {Observable} from 'rxjs';
import { JobService } from '../Jobs/job.service';
import {ModalService} from '../Modals/modal.service';
import { EventQueueService } from '../Event/event-queue-service.service';
import { JobAddedEvent, JobAddedEventType } from '../app.component';

@Component({
  selector: 'app-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.scss'],
})
export class JobModalComponent implements OnInit {

  display$: Observable<'open' | 'close'> | undefined;
  mode$: Observable<'edit' | 'new'> | undefined;

  addJobForm;

  job: any = {
    'id': null,
    'title': '',
    'sector': '',
    'country': '',
    'city': '',
    'description': ''
  }

  constructor(
    private modalService: ModalService,
    formBuilder: FormBuilder,
    private jobService: JobService,
    private eventQueue: EventQueueService
  ) {
    this.addJobForm = formBuilder.group({
      jobTitle: new FormControl('', 
            Validators.compose([Validators.required, Validators.minLength(6)])),
      jobSector: new FormControl('', 
            Validators.compose([Validators.required])),
      jobCountry: new FormControl('', 
            Validators.compose([Validators.required])),
      jobCity: new FormControl('', 
            Validators.compose([Validators.required])),
      jobDescription: new FormControl('', 
            Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    this.display$ = this.modalService.watch();
    this.mode$ = this.modalService.watchMode();
  }

  close() {
    this.modalService.close();
  }

  addJob() {
    if(this.addJobForm.status !== "VALID") {
      return;
    }

    this.job.title = this.addJobForm.controls.jobTitle.value;
    this.job.sector = this.addJobForm.controls.jobSector.value;
    this.job.country = this.addJobForm.controls.jobCountry.value;
    this.job.city = this.addJobForm.controls.jobCity.value;
    this.job.description = this.addJobForm.controls.jobDescription.value;

    this.jobService.addJob(this.job).subscribe((res) => {
      this.eventQueue.dispatch(new JobAddedEvent(JobAddedEventType.JobAdded) as any);
    });    

    this.modalService.close();
  }

  editJob() {
    if(this.addJobForm.status !== "VALID") {
      return;
    }

    this.job.id = ModalService.job?.id;
    this.job.title = this.addJobForm.controls.jobTitle.value;
    this.job.sector = this.addJobForm.controls.jobSector.value;
    this.job.country = this.addJobForm.controls.jobCountry.value;
    this.job.city = this.addJobForm.controls.jobCity.value;
    this.job.description = this.addJobForm.controls.jobDescription.value;

    this.jobService.editJob(this.job).subscribe((res) => {
      this.eventQueue.dispatch(new JobAddedEvent(JobAddedEventType.JobAdded) as any);
    });    

    this.modalService.close();
  }
}