module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/admin/components/CreateHeadItemModal.js":
/*!*****************************************************!*\
  !*** ./src/admin/components/CreateHeadItemModal.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CreateHeadItemModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3__);





var CreateHeadItemModal = /*#__PURE__*/function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(CreateHeadItemModal, _Modal);

  function CreateHeadItemModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = CreateHeadItemModal.prototype;

  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);

    this.item = this.attrs.item || app.store.createRecord('html-headers');
    this.description = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default()(this.item.description() || '');
    this.header = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default()(this.item.header() || '');
    this.loading = false;
  };

  _proto.className = function className() {
    return 'Modal--medium';
  };

  _proto.title = function title() {
    return this.item.exists ? app.translator.trans('ianm-html-head.admin.modal.edit_title') : app.translator.trans('ianm-html-head.admin.modal.create_title');
  };

  _proto.content = function content() {
    return m("div", {
      className: "Modal-body"
    }, m("p", null, app.translator.trans('ianm-html-head.admin.modal.text')), m("div", {
      className: "Form-group"
    }, m("label", {
      className: "label"
    }, app.translator.trans('ianm-html-head.admin.modal.description_label')), m("input", {
      type: "text",
      className: "FormControl",
      bidi: this.description,
      required: true
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      className: "label"
    }, app.translator.trans('ianm-html-head.admin.modal.header_label')), m("input", {
      type: "text",
      className: "FormControl",
      bidi: this.header,
      required: true,
      placeholder: "<link rel=\"example\" href=\"example\">"
    })), m("div", {
      className: "Form-group"
    }, m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: "Button Button--primary",
      type: "submit",
      loading: this.loading
    }, app.translator.trans('ianm-html-head.admin.modal.save_button'))));
  };

  _proto.onsubmit = function onsubmit(e) {
    e.preventDefault();
    if (!this.header()) return;
    this.loading = true;
    var attrs = {
      description: this.description(),
      header: this.header()
    };
    this.item.save(attrs).then(this.hide.bind(this), this.onerror.bind(this), this.loaded.bind(this));
  };

  return CreateHeadItemModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/HeadItemList.js":
/*!**********************************************!*\
  !*** ./src/admin/components/HeadItemList.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeadItemList; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Placeholder */ "flarum/components/Placeholder");
/* harmony import */ var flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _HeadItemListItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HeadItemListItem */ "./src/admin/components/HeadItemListItem.js");
/* harmony import */ var _CreateHeadItemModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CreateHeadItemModal */ "./src/admin/components/CreateHeadItemModal.js");








var HeadItemList = /*#__PURE__*/function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(HeadItemList, _Component);

  function HeadItemList() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = HeadItemList.prototype;

  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);

    this.loading = true;
    this.page = 0;
    this.pageSize = 20;
  };

  _proto.oncreate = function oncreate(vnode) {
    _Component.prototype.oncreate.call(this, vnode);

    this.refresh();
  };

  _proto.view = function view() {
    var next, prev;

    if (this.nextResults === true) {
      next = flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        className: 'Button Button--PageList-next',
        icon: 'fas fa-angle-right',
        onclick: this.loadNext.bind(this)
      });
    }

    if (this.prevResults === true) {
      prev = flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        className: 'Button Button--PageList-prev',
        icon: 'fas fa-angle-left',
        onclick: this.loadPrev.bind(this)
      });
    }

    return m("div", null, m("div", {
      className: "HtmlHeadSettingsPage--controls"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      className: 'Button Button--primary',
      icon: 'fas fa-plus',
      onclick: function onclick() {
        return app.modal.show(_CreateHeadItemModal__WEBPACK_IMPORTED_MODULE_6__["default"]);
      }
    }, app.translator.trans('ianm-html-head.admin.create_button'))), m("br", null), m("div", {
      className: "HtmlHeadSettingsPage-table"
    }, this.loading ? flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default.a.component() : app.store.all('html-headers').length ? m("table", {
      style: {
        width: '100%',
        textAlign: 'left'
      },
      className: "table"
    }, m("thead", null, m("tr", null, m("th", null, app.translator.trans('ianm-html-head.admin.table.description_label')), m("th", null, app.translator.trans('ianm-html-head.admin.table.header_label')), m("th", null, app.translator.trans('ianm-html-head.admin.table.active_label')), m("th", null))), m("tbody", null, app.store.all('html-headers').slice(this.page, this.page + this.pageSize).map(function (headItem) {
      return _HeadItemListItem__WEBPACK_IMPORTED_MODULE_5__["default"].component({
        headItem: headItem
      });
    }))) : m("div", null, flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      text: app.translator.trans('ianm-html-head.admin.table.empty_text')
    }))), m("div", null, next, prev));
  };

  _proto.refresh = function refresh() {
    return this.loadResults().then(this.parseResults.bind(this));
  }
  /**
   * Load a new page of HeadItem results.
   *
   * @param {Integer} page number.
   * @return {Promise}
   */
  ;

  _proto.loadResults = function loadResults() {
    var offset = this.page * this.pageSize;
    return app.store.find('html-headers', {
      page: {
        offset: offset,
        limit: this.pageSize
      }
    });
  }
  /**
   * Load the next page of results.
   *
   * @public
   */
  ;

  _proto.loadNext = function loadNext() {
    if (this.nextResults === true) {
      this.page++;
      this.refresh();
    }
  }
  /**
   * Load the previous page of results.
   *
   * @public
   */
  ;

  _proto.loadPrev = function loadPrev() {
    if (this.prevResults === true) {
      this.page--;
      this.refresh();
    }
  }
  /**
   * Parse results and append them to the page list.
   *
   * @param {Page[]} results
   * @return {Page[]}
   */
  ;

  _proto.parseResults = function parseResults(results) {
    this.loading = false;
    this.nextResults = !!results.payload.links.next;
    this.prevResults = !!results.payload.links.prev;
    m.redraw();
  };

  return HeadItemList;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/HeadItemListItem.js":
/*!**************************************************!*\
  !*** ./src/admin/components/HeadItemListItem.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeadItemListItem; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CreateHeadItemModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CreateHeadItemModal */ "./src/admin/components/CreateHeadItemModal.js");






var HeadItemListItem = /*#__PURE__*/function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(HeadItemListItem, _Component);

  function HeadItemListItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = HeadItemListItem.prototype;

  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);

    this.item = this.attrs.headItem;
  };

  _proto.view = function view() {
    var _this = this;

    return m("tr", null, m("td", null, this.item.description()), m("td", null, m("code", null, this.item.header())), m("td", null, flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.item.data.attributes.active,
      onchange: function onchange(value) {
        _this.activeLoading = true;
        app.request({
          method: 'PATCH',
          url: app.forum.attribute('apiUrl') + "/html-headers/" + _this.item.id(),
          body: {
            active: value
          }
        }).then(function (response) {
          _this.item.data = response.data;
          _this.activeLoading = false;
          m.redraw();
        });
      },
      loading: this.activeLoading
    })), m("td", null, m("div", {
      className: "Button--group"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      className: 'Button Button--secondary',
      onclick: function onclick() {
        return app.modal.show(_CreateHeadItemModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: _this.item
        });
      }
    }, app.translator.trans('ianm-html-head.admin.table.edit_button')), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      className: 'Button Button--danger',
      onclick: function onclick() {
        _this.deleting = true;

        _this.item["delete"]().then(function () {
          _this.deleting = false;
          m.redraw();
        });
      },
      loading: this.deleting
    }, app.translator.trans('ianm-html-head.admin.table.delete_button')))));
  };

  return HeadItemListItem;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/htmlHeadSettingsPage.js":
/*!*******************************************!*\
  !*** ./src/admin/htmlHeadSettingsPage.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HtmlHeadSettingsPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/ExtensionPage */ "flarum/components/ExtensionPage");
/* harmony import */ var flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_HeadItemList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/HeadItemList */ "./src/admin/components/HeadItemList.js");




var HtmlHeadSettingsPage = /*#__PURE__*/function (_ExtensionPage) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(HtmlHeadSettingsPage, _ExtensionPage);

  function HtmlHeadSettingsPage() {
    return _ExtensionPage.apply(this, arguments) || this;
  }

  var _proto = HtmlHeadSettingsPage.prototype;

  _proto.oninit = function oninit(vnode) {
    _ExtensionPage.prototype.oninit.call(this, vnode);
  };

  _proto.content = function content() {
    return [m("div", {
      className: "container"
    }, m("div", {
      className: "HtmlHeadSettingsPage"
    }, _components_HeadItemList__WEBPACK_IMPORTED_MODULE_2__["default"].component()))];
  };

  return HtmlHeadSettingsPage;
}(flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _htmlHeadSettingsPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./htmlHeadSettingsPage */ "./src/admin/htmlHeadSettingsPage.js");
/* harmony import */ var _model_HeadItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/HeadItem */ "./src/admin/model/HeadItem.js");



flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializers.add('ianm-html-head', function () {
  flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.store.models['html-headers'] = _model_HeadItem__WEBPACK_IMPORTED_MODULE_2__["default"];
  flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.extensionData["for"]('ianm-html-head').registerPage(_htmlHeadSettingsPage__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "./src/admin/model/HeadItem.js":
/*!*************************************!*\
  !*** ./src/admin/model/HeadItem.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeadItem; });
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_3__);





var HeadItem = /*#__PURE__*/function (_Model) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(HeadItem, _Model);

  function HeadItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Model.call.apply(_Model, [this].concat(args)) || this;

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "id", flarum_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('id'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "description", flarum_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('description'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "header", flarum_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('header'));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "active", flarum_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('active'));

    return _this;
  }

  return HeadItem;
}(flarum_Model__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/Model":
/*!**********************************************!*\
  !*** external "flarum.core.compat['Model']" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Model'];

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/ExtensionPage":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/ExtensionPage']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/ExtensionPage'];

/***/ }),

/***/ "flarum/components/LoadingIndicator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/LoadingIndicator']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LoadingIndicator'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Placeholder":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['components/Placeholder']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Placeholder'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Switch'];

/***/ }),

/***/ "flarum/utils/Stream":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['utils/Stream']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/Stream'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map