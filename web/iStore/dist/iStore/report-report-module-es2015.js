(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["report-report-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/report/report.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/report/report.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\r\n  <div class=\"col-md-4\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-4 p-3\">\r\n        <h4>\r\n          Group By:\r\n        </h4>\r\n      </div>\r\n      <div class=\"col-md-8 p-3\">\r\n        <select class=\"form-control\" name=\"pm\" [(ngModel)]=\"groupReq.groupBy\" #pm=\"ngModel\">\r\n          <option *ngFor=\"let cl of chooseDays\">{{ cl }} </option>\r\n        </select>\r\n      </div>\r\n      <div class=\"col-md-4 p-3\">\r\n        <h4>\r\n          Set dates by:\r\n        </h4>\r\n      </div>\r\n      <div class=\"col-md-8 p-3\">\r\n        <select class=\"form-control\" [(ngModel)]=\"choosenDay\" (change)=\"setDates()\">\r\n          <option *ngFor=\"let cl of choosePrePopulateDays\">{{ cl }} </option>\r\n        </select>\r\n      </div>\r\n      <div class=\"col-md-4 p-3\">\r\n        <h4>\r\n          From Date:\r\n        </h4>\r\n      </div>\r\n      <div class=\"col-md-8 p-3\">\r\n        <input type=\"date\" class=\"form-control\" id=\"fromDate\" [(ngModel)]=\"groupReq.fromDate \" />\r\n      </div>\r\n      <div class=\"col-md-4 p-3\">\r\n        <h4>\r\n          To Date:\r\n        </h4>\r\n      </div>\r\n      <div class=\"col-md-8 p-3\">\r\n        <input type=\"date\" class=\"form-control\" min=\"{{ groupReq.fromDate | date: 'yyyy-MM-dd' }}\"\r\n          [(ngModel)]=\"groupReq.toDate\" />\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n          <button class=\"btn ml-4\" (click)=\"getTotalData()\">Get Data</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-md-5\">\r\n    <div class=\"accordion\" *ngIf=\"groupByData.length > 0\" id=\"accordionGroupBy\">\r\n      <div class=\"card\" *ngFor=\"let group of groupByData; let i = index\">\r\n        <div class=\"card-header card-hover\" style=\"background-color: #808080;\" (click)=\"groupBy(group)\"\r\n          [attr.id]=\"'heading' + i\">\r\n          <div class=\"mb-0 clearfix\" data-toggle=\"collapse\" [attr.data-target]=\"'#collapse' + i\" aria-expanded=\"false\"\r\n            [attr.aria-controls]=\"'#collapse' + i\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-3\">\r\n                <span *ngIf=\"group.type == 'year'\">\r\n                  <strong>Year:</strong> {{ group.year }}\r\n                </span>\r\n                <span *ngIf=\"group.type == 'month'\">\r\n                  <strong>Month:</strong> {{ months[group.month - 1] }},{{\r\n                    group.year\r\n                  }}\r\n                </span>\r\n                <span *ngIf=\"group.type == 'day'\">\r\n                  <strong>Date:</strong> {{ months[group.month - 1] }} {{group.value}},{{\r\n                    group.year\r\n                  }}\r\n                </span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <span> <strong>Bank:</strong>{{ group.bankSum }} </span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <span> <strong>Cash:</strong>{{ group.cashSum }} </span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <span> <strong>Total:</strong> {{ group.sum }} </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div [attr.id]=\"'collapse' + i\" class=\"collapse\" [attr.aria-labelledby]=\"'heading' + i\"\r\n          data-parent=\"#accordionGroupBy\">\r\n          <div class=\"card-body table  table-responsive table-hover table-striped\" style=\"padding: 0;\">\r\n            <div class=\"accordion\" *ngIf=\"valueByData.length > 0\" id=\"accordionFirstValue\">\r\n              <div class=\"card\" *ngFor=\"let group of valueByData; let j = index\">\r\n                <div class=\"card-header card-hover\" style=\"background-color: \t#A9A9A9\t;\" (click)=\"valueBy1(group)\"\r\n                  [attr.id]=\"'headingOne' + j\">\r\n                  <div class=\"mb-0 clearfix\" data-toggle=\"collapse\" [attr.data-target]=\"'#collapseOne' + j\"\r\n                    aria-expanded=\"false\" [attr.aria-controls]=\"'#collapseOne' + j\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-3\">\r\n                        <span class=\"float-left\" *ngIf=\"group.type == 'day'\">\r\n                          <strong>Date:</strong>\r\n                          {{ months[group.month - 1] }},{{ group.value }}\r\n                        </span>\r\n                        <span class=\"float-left\" *ngIf=\"group.type == 'month'\">\r\n                          <strong>Month:</strong> {{ months[group.month - 1] }}\r\n                        </span>\r\n                      </div>\r\n                      <div class=\"col-md-3\">\r\n                        <span> <strong>Bank:</strong>{{ group.bankSum }} </span>\r\n                      </div>\r\n                      <div class=\"col-md-3\">\r\n                        <span> <strong>Cash:</strong>{{ group.cashSum }} </span>\r\n                      </div>\r\n                      <div class=\"col-md-3\">\r\n                        <span> <strong>Total:</strong> {{ group.sum }} </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div [attr.id]=\"'collapseOne' + j\" class=\"collapse\" [attr.aria-labelledby]=\"'headingOne' + j\"\r\n                  data-parent=\"#accordionFirstValue\">\r\n                  <div class=\"card-body table  table-responsive table-hover table-striped\" style=\"padding: 0;\"\r\n                    id=\"cardBody1\">\r\n                    <div *ngIf=\"valueByData2\">\r\n                      <div class=\"accordion\" *ngIf=\"valueByData.length > 0\" id=\"accordionSecondValue\">\r\n                        <div class=\"card\" *ngFor=\"let group of valueByData2; let k = index\">\r\n                          <div class=\"card-header card-hover\" style=\"background-color: #DCDCDC;\"\r\n                            (click)=\"valueBy2(group)\" [attr.id]=\"'headingTwo' + k\">\r\n                            <div class=\"mb-0 clearfix\" data-toggle=\"collapse\" [attr.data-target]=\"'#collapseTwo' + k\"\r\n                              aria-expanded=\"false\" [attr.aria-controls]=\"'#collapseTwo' + k\">\r\n                              <div class=\"row\">\r\n                                <div class=\"col-md-3\">\r\n                                  <span *ngIf=\"group.type == 'day'\">\r\n                                    <strong>Date:</strong>\r\n                                    {{ months[group.month - 1] }},{{\r\n                                      group.value\r\n                                    }}\r\n                                  </span>\r\n                                </div>\r\n                                <div class=\"col-md-3\">\r\n                                  <span>\r\n                                    <strong>Bank:</strong>{{ group.bankSum }}\r\n                                  </span>\r\n                                </div>\r\n                                <div class=\"col-md-3\">\r\n                                  <span>\r\n                                    <strong>Cash:</strong>{{ group.cashSum }}\r\n                                  </span>\r\n                                </div>\r\n                                <div class=\"col-md-3\">\r\n                                  <span>\r\n                                    <strong>Total:</strong> {{ group.sum }}\r\n                                  </span>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                          <div>\r\n                            <div [attr.id]=\"'collapseTwo' + k\" class=\"collapse\"\r\n                              [attr.aria-labelledby]=\"'headingTwo' + k\" data-parent=\"#accordionSecondValue\">\r\n                              <div id=\"cardBody2\" class=\"card-body table  table-responsive table-hover table-striped\"\r\n                                style=\"padding: 0;\">\r\n                                <div>\r\n                                  <div *ngIf=\"\r\n                                      finalBills.length > 0 &&\r\n                                      showTable == 'cardBody2'\r\n                                    \">\r\n                                    <table style=\"width: 100%;table-layout: fixed;\">\r\n                                      <thead>\r\n                                        <!-- <tr>\r\n                                                  <td colspan=\"4\">\r\n                                                    <strong>Cash:</strong>{{ temp.cashTotal }}\r\n                                                  </td>\r\n                                                  <td><strong>Bank:</strong>{{ temp.bankTotal }}</td>\r\n                                                </tr> -->\r\n                                        <tr>\r\n                                          <th>Bill.no</th>\r\n                                          <th>Date</th>\r\n                                          <th>Total</th>\r\n                                          <th>Action</th>\r\n                                          <th></th>\r\n                                        </tr>\r\n                                      </thead>\r\n                                      <tbody>\r\n                                        <ng-container *ngFor=\"let bill of finalBills\">\r\n                                          <tr>\r\n                                            <td (click)=\"\r\n                                                openPopup(bill, billContent)\r\n                                              \">\r\n                                              {{ bill.id }}\r\n                                            </td>\r\n                                            <td (click)=\"\r\n                                                openPopup(bill, billContent)\r\n                                              \">\r\n                                              {{ bill.createdDate | date }}\r\n                                            </td>\r\n                                            <td (click)=\"\r\n                                                openPopup(bill, billContent)\r\n                                              \">\r\n                                              {{ bill.total }}\r\n                                            </td>\r\n                                            <td>\r\n                                              <button class=\"btn btn-sm \" type=\"submit\" (click)=\"edit(bill)\">\r\n                                                Edit\r\n                                                <i class=\"fa  fa-edit\" style=\"font-size: 10px;\" aria-hidden=\"true\"></i>\r\n                                              </button>\r\n                                            </td>\r\n                                            <td>\r\n                                              <button class=\"btn btn-sm \" type=\"submit\" (click)=\"delete(bill)\">\r\n                                                Delete\r\n                                                <i class=\"fa  fa-trash\" style=\"font-size: 10px;\" aria-hidden=\"true\"></i>\r\n                                              </button>\r\n                                            </td>\r\n                                          </tr>\r\n                                        </ng-container>\r\n                                      </tbody>\r\n                                    </table>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                      <div>\r\n                        <div *ngIf=\"\r\n                            finalBills.length > 0 && showTable == 'cardBody1'\r\n                          \">\r\n                          <table style=\"width: 100%;table-layout: fixed;\">\r\n                            <thead>\r\n                              <tr>\r\n                                <th>Bill.no</th>\r\n                                <th>Date</th>\r\n                                <th>Total</th>\r\n                                <th>Action</th>\r\n                                <th></th>\r\n                              </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                              <ng-container *ngFor=\"let bill of finalBills\">\r\n                                <tr>\r\n                                  <td (click)=\"openPopup(bill, billContent)\">\r\n                                    {{ bill.id }}\r\n                                  </td>\r\n                                  <td (click)=\"openPopup(bill, billContent)\">\r\n                                    {{ bill.createdDate | date }}\r\n                                  </td>\r\n                                  <td (click)=\"openPopup(bill, billContent)\">\r\n                                    {{ bill.total }}\r\n                                  </td>\r\n                                  <td>\r\n                                    <button class=\"btn btn-sm \" type=\"submit\" (click)=\"edit(bill)\">\r\n                                      Edit\r\n                                      <i class=\"fa  fa-edit\" style=\"font-size: 10px;\" aria-hidden=\"true\"></i>\r\n                                    </button>\r\n                                  </td>\r\n                                  <td>\r\n                                    <button class=\"btn btn-sm \" type=\"submit\" (click)=\"delete(bill)\">\r\n                                      Delete\r\n                                      <i class=\"fa  fa-trash\" style=\"font-size: 10px;\" aria-hidden=\"true\"></i>\r\n                                    </button>\r\n                                  </td>\r\n                                </tr>\r\n                              </ng-container>\r\n                            </tbody>\r\n                          </table>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"table  table-responsive table-hover table-striped\"\r\n              *ngIf=\"groupReq.groupBy == 'Day' && finalBills.length > 0\">\r\n              <table style=\"width: 100%;table-layout: fixed;\">\r\n                <thead>\r\n                  <tr>\r\n                    <th>Bill.no</th>\r\n                    <th>Date</th>\r\n                    <th>Total</th>\r\n                    <th>Action</th>\r\n                    <th></th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <ng-container *ngFor=\"let bill of finalBills\">\r\n                    <tr>\r\n                      <td (click)=\"openPopup(bill, billContent)\">\r\n                        {{ bill.id }}\r\n                      </td>\r\n                      <td (click)=\"openPopup(bill, billContent)\">\r\n                        {{ bill.createdDate | date }}\r\n                      </td>\r\n                      <td (click)=\"openPopup(bill, billContent)\">\r\n                        {{ bill.total }}\r\n                      </td>\r\n                      <td>\r\n                        <button class=\"btn btn-sm \" type=\"submit\" (click)=\"edit(bill)\">\r\n                          Edit\r\n                          <i class=\"fa  fa-edit\" style=\"font-size: 10px;\" aria-hidden=\"true\"></i>\r\n                        </button>\r\n                      </td>\r\n                      <td>\r\n                        <button class=\"btn btn-sm \" type=\"submit\" (click)=\"delete(bill)\">\r\n                          Delete\r\n                          <i class=\"fa  fa-trash\" style=\"font-size: 10px;\" aria-hidden=\"true\"></i>\r\n                        </button>\r\n                      </td>\r\n                    </tr>\r\n                  </ng-container>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"pt-5 pl-5\" *ngIf=\"groupByData.length == 0\">\r\n      <h3>\r\n        No data available!\r\n      </h3>\r\n    </div>\r\n\r\n    <!-- <div\r\n      class=\"pt-5 pl-5\"\r\n      *ngIf=\"groupReq.groupBy == 'Day' && finalBills.length == 0\"\r\n    >\r\n      <h3>No bills available on {{ this.groupReq.fromDate | date }}!</h3>\r\n    </div> -->\r\n\r\n  </div>\r\n</div>\r\n\r\n<ng-template #billContent let-c=\"close\" let-d=\"dismiss\">\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <h4 class=\"modal-title\">Bill</h4>\r\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <div id=\"print-section\">\r\n        <div style=\"text-align: center;\">\r\n          <small>NATURAL FRESH</small><br />\r\n          <small>SRI YOGESHWARA ENTERPRISE</small><br />\r\n          <small>TAX INVOICE #{{ popupContent.id }}</small><br />\r\n          <small>YELLAMMAGUTTA, NZB</small><br />\r\n        </div>\r\n        <hr />\r\n        <div style=\"display: inline;\">\r\n          <div style=\"float: left;\">\r\n            <p *ngIf=\"popupContent?.contact?.name\">\r\n              <small>Name: {{ popupContent.contact.name }}</small>\r\n            </p>\r\n            <p>\r\n              <small>Date:{{ popupContent.createdDate | date }},{{\r\n                  popupContent.createdDate | date: \"h:mm:ss a\"\r\n                }}</small>\r\n            </p>\r\n          </div>\r\n          <div style=\"float: right;\">\r\n            <p *ngIf=\"popupContent?.contact?.phone?.length >= 10\">\r\n              <small>Phone: {{ popupContent.contact.phone }}</small>\r\n            </p>\r\n          </div>\r\n        </div>\r\n        <div>\r\n          <table class=\"table table-sm\">\r\n            <thead>\r\n              <tr>\r\n                <th>Name</th>\r\n                <th>Qty</th>\r\n                <th>Price</th>\r\n                <th>Disc(%)</th>\r\n                <th>Total</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let item of popupContent.items; let i = index\">\r\n                <td>\r\n                  {{ item.product.name }}({{ item.product.category.name }})\r\n                </td>\r\n                <td>\r\n                  {{ item.quantity }}\r\n                </td>\r\n                <td>\r\n                  {{ item.price }}\r\n                </td>\r\n                <td>\r\n                  {{ item.discount }}\r\n                </td>\r\n                <td>\r\n                  {{ item.total }}\r\n                </td>\r\n              </tr>\r\n              <tr *ngIf=\"popupContent.totalDiscount\">\r\n                <td colspan=\"4\">\r\n                  <b>Additional Discount</b>\r\n                </td>\r\n                <td>\r\n                  <b>{{ popupContent.totalDiscount }}</b>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td colspan=\"4\">\r\n                  <b>Total</b>\r\n                </td>\r\n                <td>\r\n                  <b>{{ popupContent.total }}</b>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <span *ngIf=\"popupContent.paymentMode\">\r\n            <hr />\r\n            Payment Mode : {{ popupContent?.paymentMode }}</span>\r\n        </div>\r\n        <div style=\"text-align: center;\">\r\n          <hr />\r\n          <small>THANK YOU! VISIT AGAIN</small>\r\n          <hr />\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button type=\"button\" class=\"btn btn-secondary\" printSectionId=\"print-section\" [printStyle]=\"{\r\n          div: { 'margin-left': '-5px', 'margin-right': '-5px' }\r\n        }\" ngxPrint>\r\n        Print\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"close('Close click')\">\r\n        Close\r\n      </button>\r\n    </div>\r\n  </div>\r\n</ng-template>");

/***/ }),

/***/ "./src/app/components/layout/report/report-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/layout/report/report-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: ReportRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportRoutingModule", function() { return ReportRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _report_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./report.component */ "./src/app/components/layout/report/report.component.ts");




const routes = [
    {
        path: "",
        component: _report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"]
    }
];
let ReportRoutingModule = class ReportRoutingModule {
};
ReportRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ReportRoutingModule);



/***/ }),

/***/ "./src/app/components/layout/report/report.component.css":
/*!***************************************************************!*\
  !*** ./src/app/components/layout/report/report.component.css ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/* .table-hover:hover{\r\n    background-color: #dee2e6;\r\n} */\r\n/* Modal Header */\r\n.modal-header {\r\n    background-color: #343a40;\r\n    color: white;\r\n  }\r\n/* Modal Body */\r\n.modal-body {padding: 2px 16px;}\r\n/* Modal Footer */\r\n.modal-footer {\r\n    background-color: #343a40;\r\n    color: white;\r\n  }\r\n/* Modal Content */\r\n.modal-content {\r\n    position: relative;\r\n    margin: auto;\r\n    padding: 0;\r\n    border: 1px solid #888;\r\n    width: 100%;\r\n    -webkit-animation-name: animatetop;\r\n            animation-name: animatetop;\r\n    -webkit-animation-duration: 0.4s;\r\n            animation-duration: 0.4s\r\n  }\r\n/* Add Animation */\r\n@-webkit-keyframes animatetop {\r\n    from {top: -300px; opacity: 0}\r\n    to {top: 0; opacity: 1}\r\n  }\r\n@keyframes animatetop {\r\n    from {top: -300px; opacity: 0}\r\n    to {top: 0; opacity: 1}\r\n  }\r\ntable\r\n{\r\n    margin: 10px 0;\r\n    width: 100%;\r\n}\r\n.card-hover:hover{\r\n  cursor: pointer;\r\n}\r\n.panel-head{\r\n  display: block;\r\n  margin-top:5px ;\r\n  width:100%;\r\n  border: 1px solid black\r\n}\r\n.btn{\r\n  font-size: 1rem;\r\n  border-radius: 20px;\r\n  border: 1px solid yellowgreen ;\r\n  background-color: inherit;\r\n  color: currentColor;\r\n}\r\n.btn:hover{\r\n  background-color:greenyellow ;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sYXlvdXQvcmVwb3J0L3JlcG9ydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsaUJBQWlCO0FBQ2pCO0lBQ0kseUJBQXlCO0lBQ3pCLFlBQVk7RUFDZDtBQUVBLGVBQWU7QUFDZixhQUFhLGlCQUFpQixDQUFDO0FBRS9CLGlCQUFpQjtBQUNqQjtJQUNFLHlCQUF5QjtJQUN6QixZQUFZO0VBQ2Q7QUFFQSxrQkFBa0I7QUFDbEI7SUFDRSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFVBQVU7SUFDVixzQkFBc0I7SUFDdEIsV0FBVztJQUNYLGtDQUEwQjtZQUExQiwwQkFBMEI7SUFDMUIsZ0NBQXVCO1lBQXZCO0VBQ0Y7QUFFQSxrQkFBa0I7QUFDbEI7SUFDRSxNQUFNLFdBQVcsRUFBRSxVQUFVO0lBQzdCLElBQUksTUFBTSxFQUFFLFVBQVU7RUFDeEI7QUFIQTtJQUNFLE1BQU0sV0FBVyxFQUFFLFVBQVU7SUFDN0IsSUFBSSxNQUFNLEVBQUUsVUFBVTtFQUN4QjtBQUNBOztJQUVFLGNBQWM7SUFDZCxXQUFXO0FBQ2Y7QUFDQTtFQUNFLGVBQWU7QUFDakI7QUFDQTtFQUNFLGNBQWM7RUFDZCxlQUFlO0VBQ2YsVUFBVTtFQUNWO0FBQ0Y7QUFDQTtFQUNFLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsOEJBQThCO0VBQzlCLHlCQUF5QjtFQUN6QixtQkFBbUI7QUFDckI7QUFFQTtFQUNFLDZCQUE2QjtBQUMvQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbGF5b3V0L3JlcG9ydC9yZXBvcnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC50YWJsZS1ob3Zlcjpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZWUyZTY7XHJcbn0gKi9cclxuLyogTW9kYWwgSGVhZGVyICovXHJcbi5tb2RhbC1oZWFkZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM0M2E0MDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICB9XHJcbiAgXHJcbiAgLyogTW9kYWwgQm9keSAqL1xyXG4gIC5tb2RhbC1ib2R5IHtwYWRkaW5nOiAycHggMTZweDt9XHJcbiAgXHJcbiAgLyogTW9kYWwgRm9vdGVyICovXHJcbiAgLm1vZGFsLWZvb3RlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzQzYTQwO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuICBcclxuICAvKiBNb2RhbCBDb250ZW50ICovXHJcbiAgLm1vZGFsLWNvbnRlbnQge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGFuaW1hdGlvbi1uYW1lOiBhbmltYXRldG9wO1xyXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjRzXHJcbiAgfVxyXG4gIFxyXG4gIC8qIEFkZCBBbmltYXRpb24gKi9cclxuICBAa2V5ZnJhbWVzIGFuaW1hdGV0b3Age1xyXG4gICAgZnJvbSB7dG9wOiAtMzAwcHg7IG9wYWNpdHk6IDB9XHJcbiAgICB0byB7dG9wOiAwOyBvcGFjaXR5OiAxfVxyXG4gIH1cclxuICB0YWJsZVxyXG57XHJcbiAgICBtYXJnaW46IDEwcHggMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5jYXJkLWhvdmVyOmhvdmVye1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4ucGFuZWwtaGVhZHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXJnaW4tdG9wOjVweCA7XHJcbiAgd2lkdGg6MTAwJTtcclxuICBib3JkZXI6IDFweCBzb2xpZCBibGFja1xyXG59XHJcbi5idG57XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgeWVsbG93Z3JlZW4gO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGluaGVyaXQ7XHJcbiAgY29sb3I6IGN1cnJlbnRDb2xvcjtcclxufVxyXG5cclxuLmJ0bjpob3ZlcntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOmdyZWVueWVsbG93IDtcclxufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/layout/report/report.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/components/layout/report/report.component.ts ***!
  \**************************************************************/
/*! exports provided: ReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportComponent", function() { return ReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/http.service */ "./src/app/services/http.service.ts");
/* harmony import */ var src_app_constants_url_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/constants/url-constants */ "./src/app/constants/url-constants.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");







let ReportComponent = class ReportComponent {
    constructor(router, http, modalService, storageService) {
        this.router = router;
        this.http = http;
        this.modalService = modalService;
        this.storageService = storageService;
        this.orderList = [];
        this.URL = new src_app_constants_url_constants__WEBPACK_IMPORTED_MODULE_3__["URLConstants"]();
        this.popupContent = {};
        this.cardTable = [];
        this.groupByData = [];
        this.valueByData = [];
        this.finalBills = [];
        this.valueByData2 = [];
        this.showTable = "";
        this.chooseDays = ["Day", "Month", "Year"];
        this.choosePrePopulateDays = ["Current week", "Current month", "Current year", "Manual"];
        this.choosenDay = "Day";
        this.getBillURLData = {};
        this.months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        this.groupReq = {
            fromDate: "",
            groupBy: "",
            toDate: ""
        };
        this.closeResult = "";
    }
    ngOnInit() {
        this.groupReq.groupBy = "Day";
        this.setCurrentDates();
        // let date = new Date();
        // let day = date.getDate();
        // let month = date.getMonth() + 1;
        // let year = date.getFullYear();
        // if (month < 10) {
        //   month = 0 + month;
        // }
        // if (day < 10) day = 0 + day;
        // var today = year + "-" + month + "-" + day;
        this.getTotalData();
    }
    setCurrentDates() {
        this.groupReq.fromDate = new Date().toISOString().substring(0, 10);
        this.groupReq.toDate = new Date().toISOString().substring(0, 10);
    }
    getTotalData() {
        this.finalBills = [];
        this.http
            .get(this.URL.ReportByGroup +
            this.groupReq.fromDate +
            "&groupBy=" +
            this.groupReq.groupBy +
            "&toDate=" +
            this.groupReq.toDate)
            .subscribe(resp => {
            this.groupByData = resp;
        });
    }
    valueBy1(data) {
        this.valueByData2 = [];
        this.finalBills = [];
        console.log(data);
        let reqUrl = "";
        if (data.type == "day") {
            this.getDateBills(data);
            this.showTable = "cardBody1";
        }
        else if (data.type == "month") {
            document.body.style.cursor = "progress";
            reqUrl =
                this.URL.ReportByValue +
                    data.value +
                    "&month=" +
                    data.month +
                    "&type=" +
                    data.type +
                    "&year=" +
                    data.year +
                    "&fromDate=" +
                    this.groupReq.fromDate +
                    "&toDate=" +
                    this.groupReq.toDate;
            this.http.get(reqUrl).subscribe(resp => {
                this.valueByData2 = resp;
                document.body.style.cursor = "default";
            });
        }
    }
    groupBy(data) {
        this.valueByData = [];
        this.valueByData2 = [];
        this.finalBills = [];
        console.log(data);
        if (data.type == "day") {
            this.getDateBills(data);
        }
        else {
            let reqUrl = "";
            reqUrl =
                this.URL.ReportByValue +
                    data.value +
                    "&month=" +
                    data.month +
                    "&type=" +
                    data.type +
                    "&year=" +
                    data.year +
                    "&fromDate=" +
                    this.groupReq.fromDate +
                    "&toDate=" +
                    this.groupReq.toDate;
            this.http.get(reqUrl).subscribe(resp => {
                this.valueByData = resp;
            });
        }
    }
    valueBy2(data) {
        this.showTable = "cardBody2";
        this.getDateBills(data);
    }
    getDateBills(data) {
        this.finalBills = [];
        this.getBillURLData = data;
        let reqUrl = this.URL.ReportGetBills +
            data.month +
            "&value=" +
            data.value +
            "&year=" +
            data.year;
        this.http.get(reqUrl).subscribe(resp => {
            this.finalBills = resp;
        });
    }
    delete(order) {
        if (window.confirm("Do you want to delete the bill?")) {
            this.http.delete(this.URL.OrderDelete + order.id).subscribe(resp => {
                this.getDateBills(this.getBillURLData);
                //this.filterData(date);
                window.alert("Bill deleted successfully");
            });
        }
    }
    edit(order) {
        this.storageService.orderId = order.id;
        this.router.navigate(["layout/bill"]);
    }
    openPopup(order, billContent) {
        this.popupContent = order;
        this.open(billContent);
    }
    /**
     * @param
     * 1) content consists the modal instance
     * 2) Selected contains the code of selected row
     */
    open(content) {
        this.modalRef = this.modalService.open(content);
        this.modalRef.result.then(result => {
            this.closeResult = `Closed with: ${result}`;
        }, reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    close() {
        this.modalRef.close();
    }
    getDismissReason(reason) {
        if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ModalDismissReasons"].ESC) {
            return "by pressing ESC";
        }
        else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ModalDismissReasons"].BACKDROP_CLICK) {
            return "by clicking on a backdrop";
        }
        else {
            return `with: ${reason}`;
        }
    }
    // public setToDate() {
    //   let temp = new Date(this.groupReq.fromDate);
    //   this.groupReq.toDate = temp;
    // }
    setDates() {
        this.setCurrentDates();
        if (this.choosenDay == this.choosePrePopulateDays[0]) {
            //week
            var now = new Date();
            var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            this.groupReq.fromDate = firstDayOfWeek.toISOString().substring(0, 10);
        }
        else if (this.choosenDay == this.choosePrePopulateDays[1]) {
            //month
            //new Date(date.getFullYear(), date.getMonth(), 1)
            this.groupReq.fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), 2)
                .toISOString()
                .substring(0, 10);
        }
        else if (this.choosenDay == this.choosePrePopulateDays[2]) {
            //year
            new Date().toISOString().substring(0, 10);
            this.groupReq.fromDate = new Date(new Date().getFullYear(), 0, 2)
                .toISOString()
                .substring(0, 10);
        }
        else {
            this.groupReq.fromDate = '';
            this.groupReq.toDate = '';
        }
    }
};
ReportComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
    { type: src_app_services_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] },
    { type: src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"] }
];
ReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-report",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./report.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/report/report.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./report.component.css */ "./src/app/components/layout/report/report.component.css")).default]
    })
], ReportComponent);



/***/ }),

/***/ "./src/app/components/layout/report/report.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/layout/report/report.module.ts ***!
  \***********************************************************/
/*! exports provided: ReportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportModule", function() { return ReportModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _report_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./report-routing.module */ "./src/app/components/layout/report/report-routing.module.ts");
/* harmony import */ var _report_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./report.component */ "./src/app/components/layout/report/report.component.ts");
/* harmony import */ var ngx_print__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-print */ "./node_modules/ngx-print/fesm2015/ngx-print.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");







let ReportModule = class ReportModule {
};
ReportModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_report_component__WEBPACK_IMPORTED_MODULE_4__["ReportComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _report_routing_module__WEBPACK_IMPORTED_MODULE_3__["ReportRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
            ngx_print__WEBPACK_IMPORTED_MODULE_5__["NgxPrintModule"]
        ]
    })
], ReportModule);



/***/ })

}]);
//# sourceMappingURL=report-report-module-es2015.js.map