import { Component, OnInit, Input } from '@angular/core';
import { JobService } from '../Jobs/job.service';
import {ModalService} from '../Modals/modal.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  @Input() public jobs: any[] = [];

  constructor(
    private jobService: JobService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  editJob(job: any) {
    this.modalService.open(job);
  }

  deleteJob(jobId: any) {
    this.jobService.deleteJob(jobId).subscribe((res) => {
      this.getJobs();
    });    
  }

  getJobs() {
    this.jobService.getJobs().subscribe((jobs: any) => {
      this.jobs = JSON.parse(jobs.jobs);
    });
  }
}
