import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ItemModel } from '../item/item.component.model';
import { URLConstants } from 'src/app/constants/url-constants';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public orderList: Array<ItemModel> = [];
  public URL = new URLConstants();
  constructor(private http:HttpService) { }

  ngOnInit() {
    this.getAllReports();
  }

  private getAllReports(){
    this.http.get(this.URL.OrderGetAll).subscribe(resp =>{
      this.orderList = resp as any;
    })
  }
}
