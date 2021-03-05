import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { URLConstants } from 'src/app/constants/url-constants';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.css']
})
export class HistoryDialogComponent implements OnInit {
  public metaDataList: any[];
  public inventoryTableList: any[];
  public url: URLConstants = new URLConstants();
  constructor(private ngbActiveModal: NgbActiveModal,
    private historyService: HttpService) { }

  ngOnInit() {
    this.init();
  }

  /**
   * init
   */
  public init() {
    this.historyService.get(this.url.InventoryMetaData).subscribe(results => {
      this.metaDataList = results as any[];
    })
  }
  /**
   * getTableRecords
   */
  public getTableRecords(name: string) {
    this.historyService.get(`${this.url.GetRecordInventory}${name}`).subscribe(results => {
      this.inventoryTableList = results as any[];
    })
  }
  /**
   * closeModal
   */
  public closeModal() {
    this.ngbActiveModal.dismiss();
  }

}
