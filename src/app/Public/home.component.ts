import { Component, OnInit } from '@angular/core';
import { JobService } from '../Core/Services/job.service';
import { Job } from '../Shared/Models/Job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  avaliableJobs:Job[] = [];
  exampleVariable:string = "EXAMPLE STRING";
  constructor(private jobService:JobService) { }

  ngOnInit(): void {
    //setTimeout(() => {
    //  this.exampleVariable = "EXAMPLE STRING CHANGED";
    //}, 2000);
    this.jobService.getAllJobs().subscribe(data => this.avaliableJobs = data);
  }
}
