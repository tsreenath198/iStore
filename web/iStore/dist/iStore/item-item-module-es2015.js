(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["item-item-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/item/item.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/item/item.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <combo-box [dataList]=\"datalistEx\" [columnName]=\"'name'\"></combo-box> -->\n<div class=\"row\">\n  <div class=\"col-md-5\" style=\"height: 90vh; background-color: #343a40;overflow-y: scroll;\">\n    <form #form=\"ngForm\" id=\"ngForm\" novalidate>\n      <div class=\"row p-3\">\n        <div class=\"col-md-12 clearfix\">\n          <div class=\"float-left form-group\">\n            <input type=\"text\" id=\"cname\" name=\"cname\" placeholder=\"Name\" minlength=\"3\" #cname=\"ngModel\"\n              (change)=\"onChange()\" list=\"id-list\" pattern=\"[A-Za-z]\" [(ngModel)]=\"customerDetails.name\"\n              value=\"{{ customerDetails.name }}\" ngModel />\n            <datalist id=\"id-list\">\n              <option *ngFor=\"let customer of customerList; let i = index\" [value]=\"customer.name \">{{ customer.phone }}\n              </option>\n            </datalist>\n          </div>\n          <div class=\"float-right\">\n            <input type=\"text\" placeholder=\"Phone\" name=\"phone\" [(ngModel)]=\"customerDetails.phone\" />\n          </div>\n        </div>\n      </div>\n      <table class=\"table table-dark table-sm table-striped istore-table\">\n        <thead>\n          <tr>\n            <th></th>\n            <th>Name</th>\n            <th>Qty</th>\n            <th>Price</th>\n            <th>Discount(%)</th>\n            <th>Total</th>\n          </tr>\n        </thead>\n        <tbody *ngIf=\"itemList.length\">\n          <tr *ngFor=\"let item of itemList; let i = index\">\n            <td style=\"position: relative;cursor: pointer;\" (click)=\"removeItemFromBill(i)\">\n              <span style=\"color: greenyellow; margin: 0;\n          font-size: 15px ;\n        position: relative;\n        margin-top: 50%;\">\n                <i class=\"fa fa-minus\" aria-hidden=\"true\"></i></span>\n            </td>\n            <td>\n              <p>{{ item.product.name }}({{ item.product.category.name }})</p>\n            </td>\n            <td>\n              <div>\n                <input type=\"number\" class=\"form-control\" name=\"quantity\" min=\"1\" [(ngModel)]=\"item.quantity\"\n                  (change)=\"setTotal(item)\" />\n              </div>\n            </td>\n            <td>\n              <p>{{ item.price }}</p>\n            </td>\n            <td>\n              <div>\n                <input type=\"number\" class=\"form-control\" name=\"discount\" [(ngModel)]=\"item.discount\" step=\"5\" max=\"100\"\n                  min=\"0\" (change)=\"setTotal(item)\" />\n              </div>\n            </td>\n            <td>\n              <p>{{ item.total }}</p>\n            </td>\n          </tr>\n          <tr>\n            <td colspan=\"5\">\n              <p><b>Add discount</b></p>\n            </td>\n            <td>\n              <div style=\"width:50px\">\n                <input type=\"number\" class=\"form-control\" name=\"totalDiscount\" [(ngModel)]=\"totalDiscount\"\n                  (keyup)=\"calculateDiscount($event)\" />\n              </div>\n            </td>\n          </tr>\n          <tr>\n            <td colspan=\"5\">\n              <p><b>Total</b></p>\n            </td>\n            <td>\n              <p>\n                <b>{{ totalBill }}</b>\n              </p>\n            </td>\n          </tr>\n          <tr *ngIf=\"itemList.length\">\n            <td colspan=\"3\">\n              <button class=\"btn\" style=\"float: right;\" (click)=\"cancelBill()\">\n                Cancel\n              </button>\n            </td>\n            <td colspan=\"1\">\n              <button class=\"btn\" style=\"float: right;\" *ngIf=\"!updateMode\"\n                (click)=\"setPrintingBill(paymentModeContent)\">\n                Generate\n              </button>\n              <button class=\"btn\" style=\"float: right;\" *ngIf=\"updateMode\" (click)=\"update(billContent)\">\n                Update\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </form>\n  </div>\n  <div class=\"col-md-7 item-view-pane\">\n    <nav class=\"nav nav-tabs\">\n      <li class=\"nav-item\" *ngFor=\"let cat of categoryList\">\n        <a class=\"nav-item nav-link\" *ngIf=\"!cat.activeStatus\" [ngClass]=\"{ active: selectedCategory == cat.name }\"\n          (click)=\"filter(cat.id, cat.name)\">{{ cat.name }}\n        </a>\n      </li>\n    </nav>\n    <div class=\"row\">\n      <div *ngFor=\"let product of productList\" class=\"col-md-2 p-1\" id=\"productsInBill\" [hidden]=\"\n          (product.category.rawMaterial && !product?.inventory) ||\n          product.activeStatus ||\n          product.category.activeStatus\n        \" [ngClass]=\"{\n          'text-red': product.inventory < product.minimumAvailability\n        }\" (click)=\"addToList(product)\">\n        <b>\n          <h5>{{ product.name }}</h5>\n        </b>\n        <b><small>({{ selectedCategory }})</small></b>\n        <b>\n          <p>{{ product.price }}.rs</p>\n        </b>\n      </div>\n    </div>\n  </div>\n</div>\n<ng-template #billContent let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">Bill</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n      <div id=\"print-section\" style=\"margin: 2;\">\n        <div style=\"text-align: center;\">\n          <small>NATURAL FRESH ICE CREAMS</small><br />\n          <small>SRI YOGESHWARA ENTERPRISE</small><br />\n          <small>TAX INVOICE #{{ printingBill.id + 1 }}</small>\n          <br />\n          <small>YELLAMMAGUTTA, NZB</small><br />\n        </div>\n        <hr />\n        <div style=\"display: inline;\">\n          <div style=\"float: left;\">\n            <p *ngIf=\"printingBill?.contact?.name\">\n              <small>Name: {{ printingBill.contact.name }}</small>\n            </p>\n            <p>\n              <small>Date:{{ printingBill.date | date }},{{\n                  printingBill.date | date: \"h:mm:ss a\"\n                }}</small>\n            </p>\n          </div>\n          <div style=\"float: right;\">\n            <p *ngIf=\"printingBill?.contact?.phone?.length >= 10\">\n              <small>Phone: {{ printingBill.contact.phone }}</small>\n            </p>\n          </div>\n        </div>\n        <div>\n          <table class=\"table table-sm\">\n            <thead>\n              <tr>\n                <th>Name</th>\n                <th>Qty</th>\n                <th>Price</th>\n                <th>Disc(%)</th>\n                <th>Total</th>\n              </tr>\n            </thead>\n            <tbody *ngIf=\"itemList.length\">\n              <tr *ngFor=\"let item of printingBill.items; let i = index\">\n                <td>\n                  {{ item.product.name }}({{ item.product.category.name }})\n                </td>\n                <td>\n                  {{ item.quantity }}\n                </td>\n                <td>\n                  {{ item.price }}\n                </td>\n                <td>\n                  {{ item.discount }}\n                </td>\n                <td>\n                  {{ item.total }}\n                </td>\n              </tr>\n              <tr *ngIf=\"printingBill.totalDiscount\">\n                <td colspan=\"4\">\n                  <b>Assitional Discount</b>\n                </td>\n                <td>\n                  <b>{{ printingBill.totalDiscount }}</b>\n                </td>\n              </tr>\n              <tr>\n                <td colspan=\"4\">\n                  <b>Total</b>\n                </td>\n                <td>\n                  <b>{{ printingBill.total }}</b>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n\n          <hr />\n          <span>Payment Mode : {{ printingBill.paymentMode }}</span>\n        </div>\n        <div style=\"text-align: center;\">\n          <hr />\n          <small>THANK YOU! VISIT AGAIN</small>\n          <hr />\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-secondary\" printSectionId=\"print-section\" [printStyle]=\"{\n          div: { 'margin-left': '-5px', 'margin-right': '-5px' }\n        }\" (click)=\"generateBill()\" ngxPrint>\n        Print\n      </button>\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"close('Close click')\">\n        Close\n      </button>\n    </div>\n  </div>\n</ng-template>\n<ng-template #paymentModeContent let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">Choose Payment Mode</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"p-3\">\n        <div class=\"row\">\n          <div class=\"col-md-4\">\n            <select  id=\"payMode\" class=\"form-control\" name=\"pm\" [(ngModel)]=\"paymentMode\" #pm=\"ngModel\" required>\n              <option [ngValue]=\"undefined\" hidden selected>\n                Payment Mode <label class=\"required\" for=\"pm\">*</label>\n              </option>\n              <option *ngFor=\"let cl of paymentTypes\">{{ cl }} </option>\n            </select>\n          </div>\n          <div class=\"col-md-4\">\n            <select id=\"ordertype\" class=\"form-control\" name=\"ot\" [(ngModel)]=\"orderType\" #ot=\"ngModel\" required>\n              <option [ngValue]=\"undefined\" hidden selected>\n                Order Type <label class=\"required\" for=\"ot\">*</label>\n              </option>\n              <option *ngFor=\"let ot of orderTypes\">{{ ot }} </option>\n            </select>\n          </div>\n          <div class=\"col-md-4\">\n            <input type=\"date\" class=\"form-control\" name=\"invoicedt\" [(ngModel)]=\"invoiceDate\" #invoicedt=\"ngModel\" required>\n            </div>\n        </div>\n        <div class=\"col-md-12\" *ngIf=\"paymentMode == 'Cash'\">\n          <table>\n            <tr>\n              <td>\n                <h3>Total:</h3>\n              </td>\n              <td>\n                <h5>{{ totalBill }}</h5>\n              </td>\n            </tr>\n            <tr>\n              <td>\n                <h3>Given:</h3>\n              </td>\n              <td>\n                <input type=\"number\" class=\"form-control\" style=\"color: black;\" (keyup)=\"calculateBill($event)\" />\n              </td>\n            </tr>\n            <tr>\n              <td>\n                <h3>Return:</h3>\n              </td>\n              <td>\n                <h5>{{ giveAmount }}</h5>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-secondary\" [disabled]=\"!paymentMode\" (click)=\"proceedToPrint(billContent)\">\n        Next\n      </button>\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"close('Close click')\">\n        Close\n      </button>\n    </div>\n  </div>\n</ng-template>");

/***/ }),

/***/ "./src/app/components/layout/item/item-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/layout/item/item-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: ItemRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemRoutingModule", function() { return ItemRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _item_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./item.component */ "./src/app/components/layout/item/item.component.ts");




const routes = [
    {
        path: "",
        component: _item_component__WEBPACK_IMPORTED_MODULE_3__["ItemComponent"]
    }
];
let ItemRoutingModule = class ItemRoutingModule {
};
ItemRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ItemRoutingModule);



/***/ }),

/***/ "./src/app/components/layout/item/item.component.css":
/*!***********************************************************!*\
  !*** ./src/app/components/layout/item/item.component.css ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".istore-table {\r\n  width: 100%;\r\n}\r\n\r\ninput[type='text'],input[type='number'] {\r\n  margin-top: 0px;\r\n  font-size: 1rem;\r\n  border: 0;\r\n  border-bottom: 2px solid greenyellow;\r\n  background-color: inherit;\r\n  color: white;\r\n}\r\n\r\ninput[type='date'] {\r\n  margin-top: 0px;\r\n  font-size: 1rem;\r\n  border: 0;\r\n  border-bottom: 2px solid greenyellow;\r\n  background-color: inherit;\r\n}\r\n\r\ninput[type='text']:focus,input[type='number']:focus {\r\n  background-color: inherit;\r\n  color: white;\r\n}\r\n\r\nselect :focus {\r\n  background-color: inherit;\r\n  color: white;\r\n}\r\n\r\nselect {\r\n  font-size: 1rem;\r\n  border: 0;\r\n  border-bottom: 2px solid greenyellow;\r\n  background-color: inherit;\r\n  color: black;\r\n}\r\n\r\n.item-view-pane {\r\n  background-color: #343a40;\r\n  color: white;\r\n  height: 90vh;\r\n  margin-left: -16px;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.istore-table p {\r\n  font-size: 1rem;\r\n  margin-top: 5px;\r\n}\r\n\r\n/* Modal Header */\r\n\r\n.modal-header {\r\n  background-color: #343a40;\r\n  color: white;\r\n}\r\n\r\n/* Modal Body */\r\n\r\n.modal-body {\r\n  padding: 2px 16px;\r\n}\r\n\r\n/* Modal Footer */\r\n\r\n.modal-footer {\r\n  background-color: #343a40;\r\n  color: white;\r\n}\r\n\r\n/* Modal Content */\r\n\r\n.modal-content {\r\n  position: relative;\r\n  margin: auto;\r\n  padding: 0;\r\n  border: 1px solid #888;\r\n  width: 100%;\r\n  -webkit-animation-name: animatetop;\r\n          animation-name: animatetop;\r\n  -webkit-animation-duration: 0.4s;\r\n          animation-duration: 0.4s\r\n}\r\n\r\n/* Add Animation */\r\n\r\n@-webkit-keyframes animatetop {\r\n  from {\r\n    top: -300px;\r\n    opacity: 0\r\n  }\r\n\r\n  to {\r\n    top: 0;\r\n    opacity: 1\r\n  }\r\n}\r\n\r\n@keyframes animatetop {\r\n  from {\r\n    top: -300px;\r\n    opacity: 0\r\n  }\r\n\r\n  to {\r\n    top: 0;\r\n    opacity: 1\r\n  }\r\n}\r\n\r\n.nav-tabs .nav-item.show .nav-link,\r\n.nav-tabs .nav-link.active {\r\n  background-color: #343a40;\r\n  color: #fff;\r\n  border-color: #dee2e6 #dee2e6 #fff;\r\n  border-bottom: 0;\r\n}\r\n\r\n.required {\r\n  color: red;\r\n}\r\n\r\n.btn {\r\n  font-size: 1rem;\r\n  border-radius: 20px;\r\n  border: 1px solid yellowgreen;\r\n  background-color: inherit;\r\n  color: currentColor;\r\n}\r\n\r\n.btn:hover {\r\n  background-color: greenyellow;\r\n}\r\n\r\n.text-red {\r\n  color: tomato;\r\n}\r\n\r\n#productsInBill{\r\n  text-align: center;\r\n}\r\n\r\n#productsInBill :hover{\r\n  cursor: pointer;\r\n}\r\n\r\n.alert-danger{\r\n  color:red;\r\n  background-color: transparent;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sYXlvdXQvaXRlbS9pdGVtLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZUFBZTtFQUNmLFNBQVM7RUFDVCxvQ0FBb0M7RUFDcEMseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFDQTtFQUNFLGVBQWU7RUFDZixlQUFlO0VBQ2YsU0FBUztFQUNULG9DQUFvQztFQUNwQyx5QkFBeUI7QUFDM0I7O0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtBQUNkOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGVBQWU7RUFDZixTQUFTO0VBQ1Qsb0NBQW9DO0VBQ3BDLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7O0FBSUE7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7QUFDakI7O0FBRUEsaUJBQWlCOztBQUNqQjtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7O0FBRUEsZUFBZTs7QUFDZjtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQSxpQkFBaUI7O0FBQ2pCO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQSxrQkFBa0I7O0FBQ2xCO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxrQ0FBMEI7VUFBMUIsMEJBQTBCO0VBQzFCLGdDQUF1QjtVQUF2QjtBQUNGOztBQUVBLGtCQUFrQjs7QUFDbEI7RUFDRTtJQUNFLFdBQVc7SUFDWDtFQUNGOztFQUVBO0lBQ0UsTUFBTTtJQUNOO0VBQ0Y7QUFDRjs7QUFWQTtFQUNFO0lBQ0UsV0FBVztJQUNYO0VBQ0Y7O0VBRUE7SUFDRSxNQUFNO0lBQ047RUFDRjtBQUNGOztBQUVBOztFQUVFLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsa0NBQWtDO0VBQ2xDLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLHlCQUF5QjtFQUN6QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBQ0E7RUFDRSxlQUFlO0FBQ2pCOztBQUNBO0VBQ0UsU0FBUztFQUNULDZCQUE2QjtBQUMvQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbGF5b3V0L2l0ZW0vaXRlbS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmlzdG9yZS10YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9J3RleHQnXSxpbnB1dFt0eXBlPSdudW1iZXInXSB7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIGZvbnQtc2l6ZTogMXJlbTtcclxuICBib3JkZXI6IDA7XHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGdyZWVueWVsbG93O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGluaGVyaXQ7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcbmlucHV0W3R5cGU9J2RhdGUnXSB7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIGZvbnQtc2l6ZTogMXJlbTtcclxuICBib3JkZXI6IDA7XHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGdyZWVueWVsbG93O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGluaGVyaXQ7XHJcbn1cclxuaW5wdXRbdHlwZT0ndGV4dCddOmZvY3VzLGlucHV0W3R5cGU9J251bWJlciddOmZvY3VzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuc2VsZWN0IDpmb2N1cyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbnNlbGVjdCB7XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG4gIGJvcmRlcjogMDtcclxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgZ3JlZW55ZWxsb3c7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcblxyXG5cclxuLml0ZW0tdmlldy1wYW5lIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzQzYTQwO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBoZWlnaHQ6IDkwdmg7XHJcbiAgbWFyZ2luLWxlZnQ6IC0xNnB4O1xyXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcclxufVxyXG5cclxuLmlzdG9yZS10YWJsZSBwIHtcclxuICBmb250LXNpemU6IDFyZW07XHJcbiAgbWFyZ2luLXRvcDogNXB4O1xyXG59XHJcblxyXG4vKiBNb2RhbCBIZWFkZXIgKi9cclxuLm1vZGFsLWhlYWRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM0M2E0MDtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi8qIE1vZGFsIEJvZHkgKi9cclxuLm1vZGFsLWJvZHkge1xyXG4gIHBhZGRpbmc6IDJweCAxNnB4O1xyXG59XHJcblxyXG4vKiBNb2RhbCBGb290ZXIgKi9cclxuLm1vZGFsLWZvb3RlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM0M2E0MDtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi8qIE1vZGFsIENvbnRlbnQgKi9cclxuLm1vZGFsLWNvbnRlbnQge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBtYXJnaW46IGF1dG87XHJcbiAgcGFkZGluZzogMDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjODg4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGFuaW1hdGlvbi1uYW1lOiBhbmltYXRldG9wO1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC40c1xyXG59XHJcblxyXG4vKiBBZGQgQW5pbWF0aW9uICovXHJcbkBrZXlmcmFtZXMgYW5pbWF0ZXRvcCB7XHJcbiAgZnJvbSB7XHJcbiAgICB0b3A6IC0zMDBweDtcclxuICAgIG9wYWNpdHk6IDBcclxuICB9XHJcblxyXG4gIHRvIHtcclxuICAgIHRvcDogMDtcclxuICAgIG9wYWNpdHk6IDFcclxuICB9XHJcbn1cclxuXHJcbi5uYXYtdGFicyAubmF2LWl0ZW0uc2hvdyAubmF2LWxpbmssXHJcbi5uYXYtdGFicyAubmF2LWxpbmsuYWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzQzYTQwO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlci1jb2xvcjogI2RlZTJlNiAjZGVlMmU2ICNmZmY7XHJcbiAgYm9yZGVyLWJvdHRvbTogMDtcclxufVxyXG5cclxuLnJlcXVpcmVkIHtcclxuICBjb2xvcjogcmVkO1xyXG59XHJcblxyXG4uYnRuIHtcclxuICBmb250LXNpemU6IDFyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCB5ZWxsb3dncmVlbjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xyXG4gIGNvbG9yOiBjdXJyZW50Q29sb3I7XHJcbn1cclxuXHJcbi5idG46aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVueWVsbG93O1xyXG59XHJcblxyXG4udGV4dC1yZWQge1xyXG4gIGNvbG9yOiB0b21hdG87XHJcbn1cclxuXHJcbiNwcm9kdWN0c0luQmlsbHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuI3Byb2R1Y3RzSW5CaWxsIDpob3ZlcntcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLmFsZXJ0LWRhbmdlcntcclxuICBjb2xvcjpyZWQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/layout/item/item.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/components/layout/item/item.component.ts ***!
  \**********************************************************/
/*! exports provided: ItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemComponent", function() { return ItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/http.service */ "./src/app/services/http.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var src_app_constants_url_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/constants/url-constants */ "./src/app/constants/url-constants.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");








let ItemComponent = class ItemComponent {
    constructor(storageService, http, modalService, toastr) {
        this.storageService = storageService;
        this.http = http;
        this.modalService = modalService;
        this.toastr = toastr;
        this.productList = [];
        this.filterProductList = [];
        this.itemList = [];
        this.customerDetails = {};
        this.selectedItem = {};
        this.selectedCategory = "Cup";
        this.categoryList = [];
        this.customerList = [];
        this.paymentTypes = ["Cash", "Bank"];
        this.orderTypes = ["Store", "Zomato", "Swiggy"];
        this.orderType = 'Store';
        this.updateMode = false;
        this.totalDiscount = 0;
        this.totalBill = 0.0;
        this.printingBill = {};
        this.url = new src_app_constants_url_constants__WEBPACK_IMPORTED_MODULE_4__["URLConstants"]();
        this.giveAmount = 0;
        this.closeResult = "";
    }
    ngOnInit() {
        this.getCategoryList();
        this.getProductList();
        this.getCustomerList();
        if (this.storageService.orderId) {
            this.updateMode = true;
            this.http
                .get(this.url.OrderGetById + this.storageService.orderId)
                .subscribe(resp => {
                let temp = resp;
                this.itemList = temp.items;
                this.totalBill = temp.total;
                this.customerDetails = temp.contact;
                this.paymentMode = temp.paymentMode;
                this.invoiceDate = temp.invoiceDate;
                this.orderType = temp.orderType;
            });
        }
    }
    getCustomerList() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.customerList = yield this.http
                .get(this.url.CustomerGetAll)
                .toPromise()
                .then(resp => resp); //Do you own cast here
            return this.customerList;
        });
    }
    getProductList() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.productList = yield this.http
                .get(this.url.ProductGetAll)
                .toPromise()
                .then(resp => resp); //Do you own cast here
            this.filterProductList = this.productList;
            if (this.filterProductList) {
                this.setFilter();
            }
            return this.productList;
        });
    }
    getCategoryList() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.categoryList = yield this.http
                .get(this.url.CategoryGetAll)
                .toPromise()
                .then(resp => resp); //Do you own cast here
            return this.categoryList;
        });
    }
    setFilter() {
        this.selectedCategory = "Cup";
        const item = this.categoryList.filter(item => item.name == this.selectedCategory);
        this.filter(item[0].id, item[0].name);
    }
    addToList(p) {
        if (p.inventory <= 0) {
            window.alert("Item out of stock!");
        }
        else {
            let index = this.itemList.findIndex(i => i.product.id === p.id);
            if (index == -1) {
                this.itemList.push(this.addToModel(p));
            }
            else {
                this.itemList[index].quantity += 1;
                this.itemList[index].total = this.calculateSingleItemTotal(this.itemList[index]);
            }
            this.calculateOrderTotal(this.itemList);
        }
    }
    addToModel(p) {
        let bill = {};
        bill.price = p.price;
        bill.product = p;
        if (p.defaultDiscount) {
            bill.discount = p.defaultDiscount;
        }
        else if (p.category.defaultDiscount) {
            bill.discount = p.category.defaultDiscount;
        }
        else {
            bill.discount = 0;
        }
        bill.quantity = 1;
        bill.total = this.calculateSingleItemTotal(bill);
        return bill;
    }
    calculateSingleItemTotal(p) {
        return (p.quantity * p.product.price * (100 - p.discount)) / 100;
    }
    calculateOrderTotal(p) {
        this.totalBill = 0;
        p.forEach(i => (this.totalBill += i.total));
    }
    setTotal(p) {
        p.total = (p.quantity * p.price * (100 - p.discount)) / 100;
        this.calculateOrderTotal(this.itemList);
    }
    generateBill(event) {
        let finalOrder = {};
        finalOrder.total = this.printingBill.total;
        finalOrder.items = this.printingBill.items;
        if (Object.keys(this.printingBill.contact).length === 0) {
            finalOrder.contact = null;
        }
        else {
            finalOrder.contact = this.printingBill.contact;
        }
        finalOrder.paymentMode = this.printingBill.paymentMode;
        finalOrder.invoiceDate = this.printingBill.invoiceDate;
        finalOrder.totalDiscount = this.printingBill.totalDiscount;
        finalOrder.orderType = this.printingBill.orderType;
        this.http.post(finalOrder, this.url.OrderCreate).subscribe(resp => {
            alert("Successfully created");
            this.cancelBill();
            this.form.reset();
            this.close();
        });
    }
    update() {
        let finalOrder = {};
        finalOrder.id = this.storageService.orderId;
        finalOrder.total = Math.ceil(this.totalBill);
        finalOrder.items = this.itemList;
        finalOrder.contact = this.customerDetails;
        finalOrder.paymentMode = this.paymentMode;
        finalOrder.invoiceDate = this.invoiceDate;
        finalOrder.orderType = this.orderType;
        this.http.update(finalOrder, this.url.OrderUpdate).subscribe(resp => {
            // this.printingBill=resp as any;
            // this.setPrintingBill(event);
            window.alert("Updated successfully.");
            this.cancelBill();
            this.updateMode = false;
            this.storageService.orderId = null;
        });
    }
    openPaymentOption(event) {
        this.open(event);
    }
    proceedToPrint(event) {
        this.printingBill["paymentMode"] = this.paymentMode;
        this.printingBill["invoiceDate"] = this.invoiceDate;
        this.printingBill["orderType"] = this.orderType;
        this.close();
        this.open(event);
    }
    /**Printing bill model */
    setPrintingBill(billContent) {
        this.http.get(this.url.OrderGetId).subscribe(resp => {
            this.printingBill["id"] = resp;
        });
        this.printingBill["items"] = this.itemList;
        this.printingBill["total"] = Math.ceil(this.totalBill);
        this.printingBill["contact"] = this.customerDetails;
        this.printingBill["date"] = new Date();
        this.printingBill["totalDiscount"] = this.totalDiscount;
        this.open(billContent);
    }
    cancelBill() {
        this.itemList = [];
        this.totalBill = 0.0;
        this.paymentMode = undefined;
        this.invoiceDate = new Date();
        this.orderType = 'Store';
        if (this.updateMode) {
            this.updateMode = false;
        }
        this.customerDetails = {};
    }
    /**Filter */
    filter(categoryId, categoryName) {
        this.selectedCategory = categoryName;
        let temp = [];
        this.filterProductList.filter(product => {
            if (categoryId == product.category.id && product.activeStatus == 0) {
                temp.push(product);
            }
        });
        this.productList = temp;
    }
    /**
     * @param
     * 1) content consists the modal instance
     * 2) Selected contains the code of selected row
     */
    open(content) {
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static' });
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
        if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ModalDismissReasons"].ESC) {
            return "by pressing ESC";
        }
        else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ModalDismissReasons"].BACKDROP_CLICK) {
            return "by clicking on a backdrop";
        }
        else {
            return `with: ${reason}`;
        }
    }
    removeItemFromBill(i) {
        this.itemList.splice(i, 1);
        this.calculateOrderTotal(this.itemList);
    }
    alert() {
        window.alert("Name or Payment mode is empty.");
    }
    calculateBill(event) {
        console.log(event);
        this.giveAmount = 0;
        this.giveAmount = Math.floor(event.target.value - this.totalBill);
    }
    calculateDiscount(event) {
        console.log(event);
        if (this.totalDiscount > 0 &&
            ((event.keyCode >= 48 && event.keyCode <= 57) ||
                (event.keyCode >= 96 && event.keyCode <= 105))) {
            let temp = (this.totalBill * this.totalDiscount) / 100;
            this.totalBill -= temp;
        }
        else if (this.totalDiscount == 0 || this.totalDiscount == null) {
            this.calculateOrderTotal(this.itemList);
        }
    }
    onChange(details) {
        this.customerList.forEach((data) => {
            if (data.name == this.customerDetails.name) {
                this.customerDetails.phone = data.phone;
            }
        });
    }
};
ItemComponent.ctorParameters = () => [
    { type: src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_6__["StorageService"] },
    { type: src_app_services_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("form", { read: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgForm"], static: true })
], ItemComponent.prototype, "form", void 0);
ItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-item",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./item.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/item/item.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./item.component.css */ "./src/app/components/layout/item/item.component.css")).default]
    })
], ItemComponent);



/***/ }),

/***/ "./src/app/components/layout/item/item.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/layout/item/item.module.ts ***!
  \*******************************************************/
/*! exports provided: ItemModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemModule", function() { return ItemModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _item_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./item.component */ "./src/app/components/layout/item/item.component.ts");
/* harmony import */ var _item_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./item-routing.module */ "./src/app/components/layout/item/item-routing.module.ts");
/* harmony import */ var ngx_print__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-print */ "./node_modules/ngx-print/fesm2015/ngx-print.js");



;




let ItemModule = class ItemModule {
};
ItemModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_item_component__WEBPACK_IMPORTED_MODULE_4__["ItemComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _item_routing_module__WEBPACK_IMPORTED_MODULE_5__["ItemRoutingModule"],
            ngx_print__WEBPACK_IMPORTED_MODULE_6__["NgxPrintModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]
        ]
    })
], ItemModule);



/***/ })

}]);
//# sourceMappingURL=item-item-module-es2015.js.map