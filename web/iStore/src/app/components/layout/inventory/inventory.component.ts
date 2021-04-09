import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConstants } from 'src/app/constants/global-contants';
import { URLConstants } from 'src/app/constants/url-constants';
import { HttpService } from 'src/app/services/http.service';
import { HistoryDialogComponent } from './history-dialog/history-dialog.component';
import { InventoryModel } from './inventory.component.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  constructor(private inventoryService: HttpService,
    private modalService: NgbModal) { }
  public inventory: InventoryModel = <InventoryModel>{};
  public url = new URLConstants();
  public inventoryList: Array<InventoryModel> = [];
  public actionLabel: string = "Create";
  private modalRef: NgbModalRef;
  ngOnInit() {
    this.getAll();
  }

  /**
   * getAll
   */
  public getAll() {
    this.inventoryService.get(`${this.url.InventoryGetAll}`).subscribe(res => {
      this.inventoryList = res as InventoryModel[];
      this.inventoryService.successToastr(GlobalConstants.FETCHED_MESSAGE, GlobalConstants.INVENTORY);
    }, err => {
      this.errorHandler(GlobalConstants.ERROR_DELETED_MESSAGE);
    });
  }

  /**
   * getById
   */
  public getById(id: number) {
    this.actionLabel = GlobalConstants.UPDATE;
    this.inventory = JSON.parse(JSON.stringify(this.inventoryList.filter(i => i.id === id)[0]));
  }

  /**
   * createOrUpdate
   */
  public createOrUpdate(f: NgForm) {
    if (f.valid) {
      if (this.actionLabel === GlobalConstants.CREATE) {
        this.inventoryService.post(this.inventory, `${this.url.InventoryCreate}`).subscribe(res => {
          this.successHandler(GlobalConstants.CREATED_MESSAGE);
          f.reset();
        }, err => {
          this.errorHandler(GlobalConstants.ERROR_CREATED_MESSAGE);
        });
      } else {
        this.inventoryService.put(this.inventory, `${this.url.InventoryUpdate}`).subscribe(res => {
          this.successHandler(GlobalConstants.UPDATED_MESSAGE);
          f.reset();
        }, err => {
          this.errorHandler(GlobalConstants.ERROR_UPDATED_MESSAGE);
        });
      }
    }
  }

  /**
   * deleteInventory
   */
  public deleteInventory(id: number) {
    this.inventoryService.delete(`${this.url.InventoryDelete}${id}`).subscribe(res => {
      this.successHandler(GlobalConstants.DELETED_MESSAGE);
    }, err => {
      this.errorHandler(GlobalConstants.ERROR_DELETED_MESSAGE);
    });
  }

  /**
   * updateRecordInventory
   */
  public updateRecordInventory() {
    this.inventoryService.get(`${this.url.RecordInventory}`).subscribe(res => {
      this.inventoryService.successToastr(GlobalConstants.CREATED_MESSAGE,GlobalConstants.RECORD_INVENTORY);
    }, err => {
      this.errorHandler(GlobalConstants.ERROR_CREATED_MESSAGE);
    });
  }

  /**
   * getHistoryInventory
   */
  public getHistoryInventory() {
    this.modalRef = this.modalService.open(HistoryDialogComponent, { size: 'lg' });
    this.modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }
  private successHandler(message: string) {
    this.inventoryService.successToastr(message, GlobalConstants.INVENTORY);
    this.getAll();
  }
  private errorHandler(message: string) {
    this.inventoryService.errorToastr(message, GlobalConstants.INVENTORY);
  }
}
