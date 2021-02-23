import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalConstants } from 'src/app/constants/global-contants';
import { URLConstants } from 'src/app/constants/url-constants';
import { HttpService } from 'src/app/services/http.service';
import { InventoryModel } from './inventory.component.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  constructor(private inventoryService: HttpService) { }
  public inventory: InventoryModel = <InventoryModel>{};
  public url = new URLConstants();
  public constants = new GlobalConstants();
  public inventoryList: Array<InventoryModel> = [];
  public actionLabel: string = "Create";
  ngOnInit() {
    this.getAll();
  }

  /**
   * getAll
   */
  public getAll() {
    this.inventoryService.get(`${this.url.InventoryGetAll}`).subscribe(res => this.inventoryList = res as InventoryModel[]);
  }

  /**
   * getById
   */
  public getById(id: number) {
    this.actionLabel = this.constants.UPDATE;
    this.inventory = JSON.parse(JSON.stringify(this.inventoryList.filter(i => i.id === id)[0]));
  }

  /**
   * createOrUpdate
   */
  public createOrUpdate(f: NgForm) {
    if (f.valid) {
      if (this.actionLabel === this.constants.CREATE) {
        this.inventoryService.post(this.inventory, `${this.url.InventoryCreate}`).subscribe(res => {
          this.successHandler();
          f.reset();
        }, err => {
          this.errorHandler();
        });
      } else {
        this.inventoryService.put(this.inventory, `${this.url.InventoryUpdate}`).subscribe(res => {
          this.successHandler();
          f.reset();
        }, err => {
          this.errorHandler();
        });
      }
    }
  }

  /**
   * deleteInventory
   */
  public deleteInventory(id: number) {
    this.inventoryService.delete(`${this.url.InventoryDelete}${id}`).subscribe(res => {
      this.successHandler();
    }, err => {
      this.errorHandler();
    });
  }

  private successHandler() {
    this.getAll();
  }
  private errorHandler() {
    alert("Error in Inventory");
  }
}
