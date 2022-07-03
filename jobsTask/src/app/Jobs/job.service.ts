import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  apiUri = "http://localhost:2020";

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get(`${this.apiUri}/jobs`);
  }

  deleteJob(jobId: string) {
    return this.http.delete(`${this.apiUri}/deleteJob/${jobId}`);
  }

  addJob(job: any) {
    return this.http.post(`${this.apiUri}/addJob`, {job});
  }

  editJob(job: any) {
    return this.http.patch(`${this.apiUri}/editJob`, {job});
  }
}
