import { Component, OnInit } from '@angular/core';
import { Expense } from './expense';
import { NgForm } from '@angular/forms';
import { URLConstants } from "src/app/constants/url-constants";
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  public expense: Expense = <Expense>{};
  public url = new URLConstants();
  public actionLabel: string = "Create";
  public component: String = "Expense";
  public paymentTypes: Array<any> = ["Cash", "Bank"];
  public today = new Date().toISOString().substring(0, 10);
  public expenseList = [];
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getAll();
    this.expense.date = this.today;
  }

  public create(f: NgForm): void {
    if (f.valid) {
      if (this.actionLabel == 'Create') {
        this.http.post(this.expense, this.url.ExpenseCreate).subscribe(
          res => {
            f.reset();
            this.successHandler(this.component,'Created');
            this.actionLabel = 'Create';
          },
          err => {
            this.errorHandler(this.component);
          }
        );
      } else {
        this.http.update(this.expense, this.url.ExpenseUpdate).subscribe(
          res => {
            f.reset();
            this.successHandler(this.component,'Updated');
            this.actionLabel = 'Create';
          },
          err => {
            this.errorHandler(this.component);
          }
        );
      }
    } else {
      alert("Please enter all required fields");
    }
  }
  public getAll() {
    this.http.get(this.url.ExpenseGetAll).subscribe(
      res => {
        this.expenseList = res as any;
        this.actionLabel = 'Create';
      },
      err => {
        this.errorHandler(this.component);
      }
    );
  }
  public editRow(e: Expense) {
    this.actionLabel = 'Update';
    this.expense = JSON.parse(JSON.stringify(e));
    this.expense.date = new Date(e.date).toISOString().substring(0, 10);
  }
  public reset() {
    this.expense = new Expense();
    this.actionLabel = 'Create';
    this.expense.date = this.today;
  }
  public deleteRow(id) {
    this.http.delete(this.url.ExpenseDelete + id).subscribe(
      res => {
        this.successHandler(this.component,'Deleted');
      },
      err => {
        this.errorHandler(this.component);
      }
    );
  }
  private successHandler(type: String,msg:string) {
    this.getAll(); 
    this.reset();
    alert("SuccessFully " + type +' '+ msg);
  }
  private errorHandler(type: String) {
    alert("Error in " + type);
  }

}
