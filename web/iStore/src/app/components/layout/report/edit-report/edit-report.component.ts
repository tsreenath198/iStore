import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {
  @Input() report:any;
  public paymentTypes: Array<any> = ["Cash", "Bank"];
  public orderTypes: Array<any> = ["Store", "Zomato", "Swiggy"];
  constructor() { }

  ngOnInit() {
  }
  public update() {
    
  }

}
