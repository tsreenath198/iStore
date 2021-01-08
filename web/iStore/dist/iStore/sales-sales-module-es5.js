(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sales-sales-module"], {
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/sales/sales.component.html": 
        /*!****************************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/sales/sales.component.html ***!
          \****************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n  <div class=\"col-md-4\">\n    <div class=\"row\">\n      <div class=\"col-md-4 p-3\">\n        <h4>\n          Set dates by:\n        </h4>\n      </div>\n      <div class=\"col-md-8 p-3\">\n        <select class=\"form-control\" [(ngModel)]=\"choosenDay\" (change)=\"setDates()\">\n          <option *ngFor=\"let cl of choosePrePopulateDays\">{{ cl }} </option>\n        </select>\n      </div>\n      <div class=\"col-md-4 p-3\">\n        <h4>\n          From Date:\n        </h4>\n      </div>\n      <div class=\"col-md-8 p-3\">\n        <input type=\"date\" class=\"form-control\" id=\"fromDate\" [(ngModel)]=\"groupReq.fromDate \" />\n      </div>\n      <div class=\"col-md-4 p-3\">\n        <h4>\n          To Date:\n        </h4>\n      </div>\n      <div class=\"col-md-8 p-3\">\n        <input type=\"date\" class=\"form-control\" min=\"{{ groupReq.fromDate | date: 'yyyy-MM-dd' }}\"\n          [(ngModel)]=\"groupReq.toDate\" />\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <button class=\"btn ml-4\" (click)=\"getTotalData()\">Get Data</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-4\">\n    <div class=\"accordion\" id=\"accordionOne\" *ngIf=\"salesCategoriesList\">\n      <div class=\"card\" *ngFor=\"let cat of salesCategoriesList; let i = index\">\n        <div class=\"card-header card-hover\" [attr.id]=\"'heading' + i\" (click)=\"getProductsData(cat.name)\">\n          <div class=\"mb-0 clearfix\" data-toggle=\"collapse\" [attr.data-target]=\"'#collapse' + i\" aria-expanded=\"false\"\n            [attr.aria-controls]=\"'#collapse' + i\">\n            <span class=\"float-left\"> <strong>Category:</strong> {{ cat.name }} </span>\n            <span class=\"float-right\"> <strong>Count:</strong> {{ cat.count }} </span>\n          </div>\n        </div>\n\n        <div [attr.id]=\"'collapse' + i\" class=\"collapse\" [attr.aria-labelledby]=\"'heading' + i\"\n          data-parent=\"#accordionOne\">\n          <div class=\"card-body table table-sm table-responsive table-hover table-striped\" style=\"padding: 0;\">\n            <!-- Product List Start-->\n            <div class=\"accordion\" id=\"accordionTwo\" *ngIf=\"salesProductsList\">\n              <table style=\"width: 100%;table-layout: fixed;\">\n                <thead>\n                  <tr>\n                    <th>Name</th>\n                    <th>Profit</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <ng-container *ngFor=\"let sale of salesProductsList\">\n                    <tr>\n                      <td>\n                        {{ sale.name }}\n                      </td>\n                      <td>\n                        {{ sale.count }}\n                      </td>\n                    </tr>\n                  </ng-container>\n                </tbody>\n              </table>\n              <!-- Pr0duct List Ends-->\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"pt-5 pl-5\" *ngIf=\"!salesCategoriesList\">\n        <h3>\n          No data available!\n        </h3>\n      </div>\n    </div>\n  </div>");
            /***/ 
        }),
        /***/ "./src/app/components/layout/sales/sales-routing.module.ts": 
        /*!*****************************************************************!*\
          !*** ./src/app/components/layout/sales/sales-routing.module.ts ***!
          \*****************************************************************/
        /*! exports provided: SalesRoutingModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesRoutingModule", function () { return SalesRoutingModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
            /* harmony import */ var _sales_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sales.component */ "./src/app/components/layout/sales/sales.component.ts");
            var routes = [
                {
                    path: "",
                    component: _sales_component__WEBPACK_IMPORTED_MODULE_3__["SalesComponent"]
                }
            ];
            var SalesRoutingModule = /** @class */ (function () {
                function SalesRoutingModule() {
                }
                return SalesRoutingModule;
            }());
            SalesRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
                    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
                })
            ], SalesRoutingModule);
            /***/ 
        }),
        /***/ "./src/app/components/layout/sales/sales.component.css": 
        /*!*************************************************************!*\
          !*** ./src/app/components/layout/sales/sales.component.css ***!
          \*************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = (".btn{\r\n    font-size: 1rem;\r\n    border-radius: 20px;\r\n    border: 1px solid yellowgreen ;\r\n    background-color: inherit;\r\n    color: currentColor;\r\n  }\r\n  \r\n  .btn:hover{\r\n    background-color:greenyellow ;\r\n  }\r\n  \r\n  .card-hover:hover{\r\n    cursor: pointer;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sYXlvdXQvc2FsZXMvc2FsZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsOEJBQThCO0lBQzlCLHlCQUF5QjtJQUN6QixtQkFBbUI7RUFDckI7O0VBRUE7SUFDRSw2QkFBNkI7RUFDL0I7O0VBQ0E7SUFDRSxlQUFlO0VBQ2pCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9sYXlvdXQvc2FsZXMvc2FsZXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idG57XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgeWVsbG93Z3JlZW4gO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcclxuICAgIGNvbG9yOiBjdXJyZW50Q29sb3I7XHJcbiAgfVxyXG4gIFxyXG4gIC5idG46aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOmdyZWVueWVsbG93IDtcclxuICB9XHJcbiAgLmNhcmQtaG92ZXI6aG92ZXJ7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfSJdfQ== */");
            /***/ 
        }),
        /***/ "./src/app/components/layout/sales/sales.component.ts": 
        /*!************************************************************!*\
          !*** ./src/app/components/layout/sales/sales.component.ts ***!
          \************************************************************/
        /*! exports provided: SalesComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesComponent", function () { return SalesComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var src_app_constants_url_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/constants/url-constants */ "./src/app/constants/url-constants.ts");
            /* harmony import */ var src_app_services_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/http.service */ "./src/app/services/http.service.ts");
            var SalesComponent = /** @class */ (function () {
                function SalesComponent(http) {
                    this.http = http;
                    this.salesCategoriesList = [];
                    this.salesProductsList = [];
                    this.URL = new src_app_constants_url_constants__WEBPACK_IMPORTED_MODULE_2__["URLConstants"]();
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
                SalesComponent.prototype.ngOnInit = function () {
                    //this.getTotalData();
                    this.setCurrentDates();
                };
                SalesComponent.prototype.setCurrentDates = function () {
                    this.groupReq.fromDate = new Date().toISOString().substring(0, 10);
                    this.groupReq.toDate = new Date().toISOString().substring(0, 10);
                };
                // private getAllSales() {
                //   this.http.get(this.URL.SalesTotal + this.selectedDay).subscribe(resp => {
                //     this.salesList = resp as any;
                //   });
                // }
                SalesComponent.prototype.getTotalData = function () {
                    var _this = this;
                    this.http.get(this.URL.SalesGetCategories + this.groupReq.fromDate + '&toDate=' + this.groupReq.toDate).subscribe(function (resp) {
                        _this.salesCategoriesList = resp;
                    });
                };
                SalesComponent.prototype.getProductsData = function (catName) {
                    var _this = this;
                    this.http
                        .get(this.URL.SalesGetProducts +
                        catName +
                        "&fromDate=" +
                        this.groupReq.fromDate +
                        "&toDate=" +
                        this.groupReq.toDate)
                        .subscribe(function (resp) {
                        _this.salesProductsList = resp;
                    });
                };
                SalesComponent.prototype.setDates = function () {
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
                };
                return SalesComponent;
            }());
            SalesComponent.ctorParameters = function () { return [
                { type: src_app_services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"] }
            ]; };
            SalesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: "app-sales",
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./sales.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/sales/sales.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./sales.component.css */ "./src/app/components/layout/sales/sales.component.css")).default]
                })
            ], SalesComponent);
            /***/ 
        }),
        /***/ "./src/app/components/layout/sales/sales.module.ts": 
        /*!*********************************************************!*\
          !*** ./src/app/components/layout/sales/sales.module.ts ***!
          \*********************************************************/
        /*! exports provided: SalesModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesModule", function () { return SalesModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _sales_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sales-routing.module */ "./src/app/components/layout/sales/sales-routing.module.ts");
            /* harmony import */ var _sales_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sales.component */ "./src/app/components/layout/sales/sales.component.ts");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
            var SalesModule = /** @class */ (function () {
                function SalesModule() {
                }
                return SalesModule;
            }());
            SalesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_sales_component__WEBPACK_IMPORTED_MODULE_4__["SalesComponent"]],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                        _sales_routing_module__WEBPACK_IMPORTED_MODULE_3__["SalesRoutingModule"]
                    ]
                })
            ], SalesModule);
            /***/ 
        })
    }]);
//# sourceMappingURL=sales-sales-module-es2015.js.map
//# sourceMappingURL=sales-sales-module-es5.js.map
//# sourceMappingURL=sales-sales-module-es5.js.map