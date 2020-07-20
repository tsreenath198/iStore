(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["category-category-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/category/category.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/category/category.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n  <div class=\"col-md-3\" style=\"height: 90vh; background-color: #343a40;\">\n    <form\n      name=\"form\"\n      class=\"ml-3 mr-2\"\n      id=\"productEntryForm\"\n      (ngSubmit)=\"create(f)\"\n      #f=\"ngForm\"\n      novalidate\n    >\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            name=\"pName\"\n            placeholder=\"Category\"\n            [(ngModel)]=\"model.name\"\n          />\n        </div>\n        <div class=\"col-md-12\">\n          <select\n            class=\"form-control\"\n            name=\"st\"\n            [(ngModel)]=\"model.activeStatus\"\n            #st=\"ngModel\"\n            required\n          >\n            <option [ngValue]=\"undefined\" hidden selected> Status Type </option>\n            <option\n              *ngFor=\"let option of statusOptions\"\n              [ngValue]=\"option.value\"\n            >\n              {{ option.name }}\n            </option>\n          </select>\n        </div>\n        <div class=\"col-md-12\">\n          <input\n            type=\"number\"\n            class=\"form-control\"\n            name=\"discount\"\n            placeholder=\"Discount(%)\"\n            min=\"1\" max=\"100\"\n            [(ngModel)]=\"model.defaultDiscount\"\n          />\n        </div>\n        <div class=\"col-md-12\">\n          <input\n            type=\"number\"\n            class=\"form-control\"\n            name=\"desc\"\n            placeholder=\"Order\"\n            [(ngModel)]=\"model.categoryOrder\"\n          />\n        </div>\n        <div class=\"col-md-12\">\n          <label>\n            <input\n              type=\"checkbox\"name=\"rm\"\n              [(ngModel)]=\"model.rawMaterial\"\n              #rm=\"ngModel\"\n            /><span class=\"ml-2\">Raw Material</span></label\n          >\n        </div>\n        <div class=\"col-md-12 text-center mt-2\">\n          <button *ngIf=\"actionType == 'C'\" class=\"btn mt-2\" type=\"submit\">\n            Create\n          </button>\n          <button\n            *ngIf=\"actionType == 'U'\"\n            class=\"btn mt-2\"\n            (click)=\"update()\"\n            type=\"button\"\n          >\n            Update\n          </button>\n          <button\n            class=\"btn mt-2 ml-2\"\n            (click)=\"new(f)\"\n            type=\"button\"\n          >\n            Cancel\n          </button>\n        </div>\n      </div>\n    </form>\n  </div>\n  <div class=\"col-md-8\" style=\"height: 90vh;overflow-y: scroll;\">\n    <table class=\"table table-bordered table-striped\">\n      <thead>\n        <tr>\n          <th>\n            Category\n          </th>\n          <th>\n            Discount\n          </th>\n          <th>\n            Order\n          </th>\n          <th>\n            Raw Material\n          </th>\n          <th>\n            Actions\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr\n          *ngFor=\"let category of categoryList\"\n          [ngClass]=\"{ 'bg-yellow': category.activeStatus }\"\n        >\n          <td>\n            {{ category.name }}\n          </td>\n          <td>\n            {{ category.defaultDiscount }}\n          </td>\n          <td>\n            {{ category.categoryOrder }}\n          </td>\n          <td>\n            {{ category.rawMaterial?\"Yes\":\"No\"}}\n          </td>\n          <td>\n            <button class=\"btn\" type=\"submit\" (click)=\"getById(category.id)\">\n              Edit\n            </button>\n            <button class=\"btn ml-2\" type=\"submit\" (click)=\"delete(category)\">\n              Delete\n              <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n            </button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n");

/***/ }),

/***/ "./src/app/components/layout/category/category-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/components/layout/category/category-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: CategoryRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryRoutingModule", function() { return CategoryRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _category_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category.component */ "./src/app/components/layout/category/category.component.ts");




const routes = [
    {
        path: "",
        component: _category_component__WEBPACK_IMPORTED_MODULE_3__["CategoryComponent"]
    }
];
let CategoryRoutingModule = class CategoryRoutingModule {
};
CategoryRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], CategoryRoutingModule);



/***/ }),

/***/ "./src/app/components/layout/category/category.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/components/layout/category/category.component.css ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("form {\r\n  color: white;\r\n}\r\n\r\nform input {\r\n  margin-top: 40px;\r\n  font-size: 1rem;\r\n  border: 0;\r\n  border-bottom: 2px solid greenyellow;\r\n  background-color: inherit;\r\n  color: white;\r\n}\r\n\r\nform select {\r\n  font-size: 1rem;\r\n  border: 0;\r\n  border-bottom: 2px solid greenyellow;\r\n  background-color: inherit;\r\n  color: white;\r\n}\r\n\r\nform option {\r\n  background-color: black;\r\n}\r\n\r\n.bg-yellow {\r\n  background-color: #FFFF66;\r\n}\r\n\r\n.btn {\r\n  font-size: 1rem;\r\n  border-radius: 20px;\r\n  border: 1px solid yellowgreen;\r\n  background-color: inherit;\r\n  color: currentColor;\r\n}\r\n\r\n.btn:hover {\r\n  background-color: greenyellow;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sYXlvdXQvY2F0ZWdvcnkvY2F0ZWdvcnkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsU0FBUztFQUNULG9DQUFvQztFQUNwQyx5QkFBeUI7RUFDekIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFNBQVM7RUFDVCxvQ0FBb0M7RUFDcEMseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLHlCQUF5QjtFQUN6QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw2QkFBNkI7QUFDL0IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2xheW91dC9jYXRlZ29yeS9jYXRlZ29yeS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiZm9ybSB7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG5mb3JtIGlucHV0IHtcclxuICBtYXJnaW4tdG9wOiA0MHB4O1xyXG4gIGZvbnQtc2l6ZTogMXJlbTtcclxuICBib3JkZXI6IDA7XHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGdyZWVueWVsbG93O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGluaGVyaXQ7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG5mb3JtIHNlbGVjdCB7XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG4gIGJvcmRlcjogMDtcclxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgZ3JlZW55ZWxsb3c7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbmZvcm0gb3B0aW9uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmJnLXllbGxvdyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkY2NjtcclxufVxyXG5cclxuLmJ0biB7XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgeWVsbG93Z3JlZW47XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcclxuICBjb2xvcjogY3VycmVudENvbG9yO1xyXG59XHJcblxyXG4uYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbnllbGxvdztcclxufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/layout/category/category.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/components/layout/category/category.component.ts ***!
  \******************************************************************/
/*! exports provided: CategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryComponent", function() { return CategoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_constants_url_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/constants/url-constants */ "./src/app/constants/url-constants.ts");
/* harmony import */ var src_app_services_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/http.service */ "./src/app/services/http.service.ts");




let CategoryComponent = class CategoryComponent {
    constructor(http) {
        this.http = http;
        this.categoryList = [];
        this.model = {};
        this.url = new src_app_constants_url_constants__WEBPACK_IMPORTED_MODULE_2__["URLConstants"]();
        this.actionType = "C";
        this.statusOptions = [{ name: 'Active', value: 0 }, { name: 'Inactive', value: 1 }];
        this.rawMatOpt = [{ name: 'Raw Material', value: true }, { name: 'Non Raw Material', value: false }];
    }
    ngOnInit() {
        this.getAll();
        this.model.activeStatus = 0;
        this.model.rawMaterial = false;
    }
    getAll() {
        this.http.get(this.url.CategoryGetAll).subscribe(resp => {
            this.categoryList = resp;
        });
    }
    commonInHTTP() {
        this.getAll();
        this.model = {};
        this.model.activeStatus = 0;
        this.model.rawMaterial = false;
    }
    create(form) {
        this.http
            .post(this.model, this.url.CategoryCreate)
            .subscribe(resp => {
            this.commonInHTTP();
            this.model.activeStatus = 0;
            this.model.rawMaterial = false;
        });
    }
    update() {
        this.http.update(this.model, this.url.CategoryUpdate).subscribe(resp => {
            this.commonInHTTP();
            this.actionType = "C";
        });
    }
    new(form) {
        this.model = {};
        this.model.activeStatus = 0;
        this.model.rawMaterial = false;
        this.actionType = "C";
    }
    getById(id) {
        this.http.get(this.url.CategoryGetById + id).subscribe(resp => {
            this.model = resp;
            this.actionType = "U";
        });
    }
    delete(category) {
        if (window.confirm("Do you want to delete " + category.name + "?")) {
            this.http.delete(this.url.CategoryDelete + category.id).subscribe(resp => {
                this.getAll();
            });
        }
    }
};
CategoryComponent.ctorParameters = () => [
    { type: src_app_services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"] }
];
CategoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-category",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./category.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/layout/category/category.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./category.component.css */ "./src/app/components/layout/category/category.component.css")).default]
    })
], CategoryComponent);



/***/ }),

/***/ "./src/app/components/layout/category/category.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/layout/category/category.module.ts ***!
  \***************************************************************/
/*! exports provided: CategoryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryModule", function() { return CategoryModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _category_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category-routing.module */ "./src/app/components/layout/category/category-routing.module.ts");
/* harmony import */ var _category_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./category.component */ "./src/app/components/layout/category/category.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");






let CategoryModule = class CategoryModule {
};
CategoryModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_category_component__WEBPACK_IMPORTED_MODULE_4__["CategoryComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _category_routing_module__WEBPACK_IMPORTED_MODULE_3__["CategoryRoutingModule"]
        ]
    })
], CategoryModule);



/***/ })

}]);
//# sourceMappingURL=category-category-module-es2015.js.map