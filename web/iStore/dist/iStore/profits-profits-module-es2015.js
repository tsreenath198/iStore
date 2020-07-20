(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profits-profits-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/profits/profits.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/profits/profits.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"row\">\n        <div class=\"col-md-4 p-3\">\n          <h4>\n            Set dates by:\n          </h4>\n        </div>\n        <div class=\"col-md-8 p-3\">\n          <select\n            class=\"form-control\"\n           [(ngModel)]=\"choosenDay\"\n            (change)=\"setDates()\">\n            <option *ngFor=\"let cl of choosePrePopulateDays\">{{ cl }} </option>\n          </select>\n        </div>\n        <div class=\"col-md-4 p-3\">\n          <h4>\n            From Date:\n          </h4>\n        </div>\n        <div class=\"col-md-8 p-3\">\n          <input\n            type=\"date\"\n            class=\"form-control\"\n            id=\"fromDate\"\n            [(ngModel)]=\"groupReq.fromDate \"\n          />\n        </div>\n        <div class=\"col-md-4 p-3\">\n          <h4>\n            To Date:\n          </h4>\n        </div>\n        <div class=\"col-md-8 p-3\">\n          <input\n            type=\"date\"\n            class=\"form-control\"\n            min=\"{{ groupReq.fromDate | date: 'yyyy-MM-dd' }}\"\n            [(ngModel)]=\"groupReq.toDate\"\n          />\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <button class=\"btn ml-4\" (click)=\"getTotalData()\">Get Data</button>\n          </div>\n        </div>\n      </div>\n    </div>\n      <div class=\"col-md-4\">\n        <div class=\"accordion\" id=\"accordionOne\" *ngIf=\"profitsCategoriesList\">\n          <div class=\"card\" *ngFor=\"let cat of profitsCategoriesList; let i = index\">\n            <div class=\"card-header card-hover\" [attr.id]=\"'heading' + i\" (click)=\"getProductsData(cat.name)\">\n              <div\n                class=\"mb-0 clearfix\"\n                data-toggle=\"collapse\"\n                [attr.data-target]=\"'#collapse' + i\"\n                aria-expanded=\"false\"\n                [attr.aria-controls]=\"'#collapse' + i\"\n              >\n                <span class=\"float-left\"> <strong>Category:</strong> {{ cat.name }} </span>\n                <span class=\"float-right\"> <strong>Profit:</strong> {{ cat.profit }} </span>\n              </div>\n            </div>\n    \n            <div\n              [attr.id]=\"'collapse' + i\"\n              class=\"collapse\"\n              [attr.aria-labelledby]=\"'heading' + i\"\n              data-parent=\"#accordionOne\"\n            >\n              <div\n                class=\"card-body table table-sm table-responsive table-striped\"\n                style=\"padding: 0;\"\n              >\n              <table style=\"width: 100%;table-layout: fixed;\">\n                <thead>\n                  <tr>\n                    <th>Name</th>\n                    <th>Profit</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <ng-container *ngFor=\"let product of profitsProductsList\">\n                    <tr >\n                      <td >\n                        {{ product.name }}\n                      </td>\n                      <td >\n                        {{ product.profit }}\n                      </td>\n                    </tr>\n                  </ng-container>\n                </tbody>\n              </table>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"pt-5 pl-5\" *ngIf=\"profitsCategoriesList.length ==0\">\n          <h3>\n            No data available!\n          </h3>\n        </div>\n      </div>\n    </div>\n    \n    \n    \n  ");

/***/ }),

/***/ "./src/app/components/layout/profits/profits-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/layout/profits/profits-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: ProfitsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfitsRoutingModule", function() { return ProfitsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _profits_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profits.component */ "./src/app/components/layout/profits/profits.component.ts");




const routes = [
    {
        path: "",
        component: _profits_component__WEBPACK_IMPORTED_MODULE_3__["ProfitsComponent"]
    }
];
let ProfitsRoutingModule = class ProfitsRoutingModule {
};
ProfitsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ProfitsRoutingModule);



/***/ }),

/***/ "./src/app/components/layout/profits/profits.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/components/layout/profits/profits.component.css ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".btn{\r\n    font-size: 1rem;\r\n    border-radius: 20px;\r\n    border: 1px solid yellowgreen ;\r\n    background-color: inherit;\r\n    color: currentColor;\r\n  }\r\n  \r\n  .btn:hover{\r\n    background-color:greenyellow ;\r\n  }\r\n  \r\n  .card-hover:hover{\r\n    cursor: pointer;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sYXlvdXQvcHJvZml0cy9wcm9maXRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLDhCQUE4QjtJQUM5Qix5QkFBeUI7SUFDekIsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsNkJBQTZCO0VBQy9COztFQUNBO0lBQ0UsZUFBZTtFQUNqQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbGF5b3V0L3Byb2ZpdHMvcHJvZml0cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ0bntcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB5ZWxsb3dncmVlbiA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xyXG4gICAgY29sb3I6IGN1cnJlbnRDb2xvcjtcclxuICB9XHJcbiAgXHJcbiAgLmJ0bjpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6Z3JlZW55ZWxsb3cgO1xyXG4gIH1cclxuICAuY2FyZC1ob3Zlcjpob3ZlcntcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9Il19 */");

/***/ }),

/***/ "./src/app/components/layout/profits/profits.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/components/layout/profits/profits.component.ts ***!
  \****************************************************************/
/*! exports provided: ProfitsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfitsComponent", function() { return ProfitsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/http.service */ "./src/app/services/http.service.ts");
/* harmony import */ var src_app_constants_url_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/constants/url-constants */ "./src/app/constants/url-constants.ts");




let ProfitsComponent = class ProfitsComponent {
    constructor(http) {
        this.http = http;
        this.profitsCategoriesList = [];
        this.profitsProductsList = [];
        this.URL = new src_app_constants_url_constants__WEBPACK_IMPORTED_MODULE_3__["URLConstants"]();
        this.totalTable = [{ date: "2020-01-20" }];
        this.choosePrePopulateDays = [
            "Current week",
            "Current month",
            "Current year",
            "Manual"
        ];
        this.choosenDay = "Day";
        this.selectedDay = "Day";
        this.groupReq = {
            fromDate: "",
            toDate: ""
        };
    }
    ngOnInit() {
        this.setCurrentDates();
        this.getTotalData();
    }
    setCurrentDates() {
        this.groupReq.fromDate = new Date().toISOString().substring(0, 10);
        this.groupReq.toDate = new Date().toISOString().substring(0, 10);
    }
    // private getAllSales() {
    //   this.http.get(this.URL.SalesTotal + this.selectedDay).subscribe(resp => {
    //     this.salesList = resp as any;
    //   });
    // }
    getTotalData() {
        this.http.get(this.URL.ProfitGetCategory + this.groupReq.fromDate + '&toDate=' + this.groupReq.toDate).subscribe(resp => {
            this.profitsCategoriesList = resp;
        });
    }
    getProductsData(catName) {
        this.profitsProductsList = [];
        this.http
            .get(this.URL.ProfitGetProduct +
            catName +
            "&fromDate=" +
            this.groupReq.fromDate +
            "&toDate=" +
            this.groupReq.toDate)
            .subscribe(resp => {
            this.profitsProductsList = resp;
        });
    }
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
            this.groupReq.fromDate = "";
            this.groupReq.toDate = "";
        }
    }
};
ProfitsComponent.ctorParameters = () => [
    { type: src_app_services_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] }
];
ProfitsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-profits',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./profits.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/profits/profits.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./profits.component.css */ "./src/app/components/layout/profits/profits.component.css")).default]
    })
], ProfitsComponent);



/***/ }),

/***/ "./src/app/components/layout/profits/profits.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/layout/profits/profits.module.ts ***!
  \*************************************************************/
/*! exports provided: ProfitsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfitsModule", function() { return ProfitsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _profits_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profits-routing.module */ "./src/app/components/layout/profits/profits-routing.module.ts");
/* harmony import */ var _profits_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./profits.component */ "./src/app/components/layout/profits/profits.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");






let ProfitsModule = class ProfitsModule {
};
ProfitsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_profits_component__WEBPACK_IMPORTED_MODULE_4__["ProfitsComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _profits_routing_module__WEBPACK_IMPORTED_MODULE_3__["ProfitsRoutingModule"]
        ]
    })
], ProfitsModule);



/***/ })

}]);
//# sourceMappingURL=profits-profits-module-es2015.js.map