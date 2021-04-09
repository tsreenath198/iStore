import { Component, OnInit } from '@angular/core';
import { Expense } from './expense';
import { NgForm } from '@angular/forms';
import { URLConstants } from "src/app/constants/url-constants";
import { HttpService } from 'src/app/services/http.service';
import { GlobalConstants } from 'src/app/constants/global-contants';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  public expense: Expense = <Expense>{};
  public url = new URLConstants();
  public actionLabel: string = "Create";
  public paymentTypes: Array<any> = ["Cash", "Bank"];
  public today = new Date().toISOString().substring(0, 10);
  public expenseList = [];
  constructor(private expenseService: HttpService) { }

  ngOnInit() {
    this.getAll();
    this.expense.date = this.today;
    this.expense.mode = 'Cash';
  }

  public create(f: NgForm): void {
    if (f.valid) {
      if (this.actionLabel == GlobalConstants.CREATE) {
        this.expenseService.post(this.expense, this.url.ExpenseCreate).subscribe(
          res => {
            f.reset();
            this.successHandler(GlobalConstants.CREATED_MESSAGE);
            this.actionLabel = GlobalConstants.CREATE;
          },
          err => {
            this.errorHandler(GlobalConstants.ERROR_CREATED_MESSAGE);
          }
        );
      } else {
        this.expenseService.update(this.expense, this.url.ExpenseUpdate).subscribe(
          res => {
            f.reset();
            this.successHandler(GlobalConstants.UPDATED_MESSAGE);
            this.actionLabel = GlobalConstants.CREATE;
          },
          err => {
            this.errorHandler(GlobalConstants.ERROR_UPDATED_MESSAGE);
          }
        );
      }
    } else {
      this.errorHandler(GlobalConstants.REQUIRED_FIELDS);
    }
  }
  public getAll() {
    this.expenseService.get(this.url.ExpenseGetAll).subscribe(
      res => {
        this.expenseList = res as any;
        this.actionLabel = GlobalConstants.CREATE;
        this.expenseService.successToastr(GlobalConstants.FETCHED_MESSAGE,GlobalConstants.EXPENSE);
      },
      err => {
        this.errorHandler(GlobalConstants.ERROR_DELETED_MESSAGE);
      }
    );
  }
  public editRow(e: Expense) {
    this.actionLabel = GlobalConstants.UPDATE;
    this.expense = JSON.parse(JSON.stringify(e));
    this.expense.date = new Date(e.date).toISOString().substring(0, 10);
  }
  public reset() {
    this.expense = new Expense();
    this.actionLabel = GlobalConstants.CREATE;
    this.expense.date = this.today;
  }
  public deleteRow(id) {
    this.expenseService.delete(this.url.ExpenseDelete + id).subscribe(
      res => {
        this.successHandler(GlobalConstants.DELETED_MESSAGE);
      },
      err => {
        this.errorHandler(GlobalConstants.ERROR_DELETED_MESSAGE);
      }
    );
  }
  private successHandler( message: string) {
    this.expenseService.successToastr(message,GlobalConstants.EXPENSE);
    this.getAll();
    this.reset();
  }
  private errorHandler(message: string) {
    this.expenseService.errorToastr(message,GlobalConstants.EXPENSE);
  }
}
