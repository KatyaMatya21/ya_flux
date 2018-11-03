(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dispatcher_1 = __importDefault(require("./dispatcher"));
var store_1 = __importDefault(require("./store"));
var view_1 = __importDefault(require("./view"));
var dispatcher = new dispatcher_1.default();
var store = new store_1.default({
    items: [],
});
store.connectDispatcher(dispatcher);
var ToDoView = /** @class */ (function (_super) {
    __extends(ToDoView, _super);
    function ToDoView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToDoView.prototype.updateState = function () {
        var buttonAdd;
        if (this.clickListener) {
            buttonAdd = this.element.querySelector('button');
            buttonAdd.removeEventListener('click', this.clickListener);
        }
        _super.prototype.updateState.call(this);
        buttonAdd = this.element.querySelector('button');
        buttonAdd.addEventListener('click', this.onBtnClick.bind(this));
    };
    ToDoView.prototype.render = function () {
        var storeData = this.getStoreData();
        var listHtml = '';
        storeData.items.map(function (item) {
            listHtml += "<li>" + item + "</li>";
        });
        return "\n      <h1>Todo</h1>\n\n      <ul>\n        " + listHtml + "\n      </ul>\n\n      <form>\n        <label for=\"text\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438</label>\n        <input type=\"text\" id=\"text\">\n        <button type=\"submit\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n      </form>";
    };
    ToDoView.prototype.onBtnClick = function (event) {
        event.preventDefault();
        var text = this.element.querySelector('input[type="text"]').value;
        this.dispatchAction('addItem', text);
    };
    return ToDoView;
}(view_1.default));
var container = document.querySelector('.todo');
var todo = new ToDoView(container);
todo.connectDispatcher(dispatcher);
todo.connectStore(store);
store.onAction('addItem', function (text, state) {
    state.items.push(text);
});
todo.updateState();

},{"./dispatcher":2,"./store":3,"./view":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this.callbacks = [];
    }
    Dispatcher.prototype.dispatch = function (type, payload) {
        this.callbacks.forEach(function (callback) {
            callback(type, payload);
        });
    };
    Dispatcher.prototype.register = function (callback) {
        this.callbacks.push(callback);
    };
    return Dispatcher;
}());
exports.default = Dispatcher;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store = /** @class */ (function () {
    function Store(initialState) {
        if (initialState === void 0) { initialState = {}; }
        this.state = initialState;
        this.actionCallbacks = {};
        this.views = [];
    }
    Store.prototype.connectDispatcher = function (dispatcher) {
        this.dispatcher = dispatcher;
        this.dispatcher.register(this.processAction.bind(this));
    };
    Store.prototype.connectView = function (view) {
        this.views.push(view);
    };
    Store.prototype.onAction = function (type, callback) {
        this.actionCallbacks[type] = callback;
    };
    Store.prototype.getData = function () {
        return this.state;
    };
    Store.prototype.processAction = function (type, payload) {
        if (typeof this.actionCallbacks[type] !== 'undefined') {
            this.actionCallbacks[type](payload, this.state);
            this.views.map(function (view) {
                view.updateState();
            });
        }
    };
    return Store;
}());
exports.default = Store;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View = /** @class */ (function () {
    function View(element) {
        this.element = element;
    }
    View.prototype.connectDispatcher = function (dispatcher) {
        this.dispatcher = dispatcher;
    };
    View.prototype.connectStore = function (store) {
        this.store = store;
        this.store.connectView(this);
    };
    View.prototype.updateState = function () {
        this.element.innerHTML = this.render();
    };
    View.prototype.dispatchAction = function (type, payload) {
        this.dispatcher.dispatch(type, payload);
    };
    View.prototype.getStoreData = function () {
        return this.store.getData();
    };
    View.prototype.render = function () {
        return '';
    };
    return View;
}());
exports.default = View;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZGVtby50cyIsInNyYy9kaXNwYXRjaGVyLnRzIiwic3JjL3N0b3JlLnRzIiwic3JjL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSw0REFBc0M7QUFDdEMsa0RBQTRCO0FBQzVCLGdEQUEwQjtBQUUxQixJQUFNLFVBQVUsR0FBRyxJQUFJLG9CQUFVLEVBQUUsQ0FBQztBQUNwQyxJQUFNLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQztJQUN0QixLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVwQztJQUF1Qiw0QkFBSTtJQUEzQjs7SUE2Q0EsQ0FBQztJQTFDUSw4QkFBVyxHQUFsQjtRQUVFLElBQUksU0FBc0IsQ0FBQztRQUUzQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsaUJBQU0sV0FBVyxXQUFFLENBQUM7UUFFcEIsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRVMseUJBQU0sR0FBaEI7UUFDRSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdEMsSUFBSSxRQUFRLEdBQVcsRUFBRSxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxL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QyxLQUFLLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7Z0JBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUNILFlBQUM7QUFBRCxDQXJDQSxBQXFDQyxJQUFBOzs7Ozs7QUNyQ0Q7SUFLRSxjQUFZLE9BQW9CO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxnQ0FBaUIsR0FBeEIsVUFBeUIsVUFBc0I7UUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVNLDJCQUFZLEdBQW5CLFVBQW9CLEtBQVk7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVNLDBCQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFUyw2QkFBYyxHQUF4QixVQUF5QixJQUFZLEVBQUUsT0FBWTtRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVTLDJCQUFZLEdBQXRCO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFUyxxQkFBTSxHQUFoQjtRQUNFLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUNILFdBQUM7QUFBRCxDQWpDQSxBQWlDQyxJQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IERpc3BhdGNoZXIgZnJvbSBcIi4vZGlzcGF0Y2hlclwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuL3N0b3JlXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3XCI7XG5cbmNvbnN0IGRpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe1xuICBpdGVtczogW10sXG59KTtcblxuc3RvcmUuY29ubmVjdERpc3BhdGNoZXIoZGlzcGF0Y2hlcik7XG5cbmNsYXNzIFRvRG9WaWV3IGV4dGVuZHMgVmlldyB7XG4gIHByaXZhdGUgY2xpY2tMaXN0ZW5lcjogKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcblxuICBwdWJsaWMgdXBkYXRlU3RhdGUoKTogdm9pZCB7XG5cbiAgICBsZXQgYnV0dG9uQWRkOiBIVE1MRWxlbWVudDtcblxuICAgIGlmICh0aGlzLmNsaWNrTGlzdGVuZXIpIHtcbiAgICAgIGJ1dHRvbkFkZCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICAgIGJ1dHRvbkFkZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgc3VwZXIudXBkYXRlU3RhdGUoKTtcblxuICAgIGJ1dHRvbkFkZCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBidXR0b25BZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQnRuQ2xpY2suYmluZCh0aGlzKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVuZGVyKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3RvcmVEYXRhID0gdGhpcy5nZXRTdG9yZURhdGEoKTtcblxuICAgIGxldCBsaXN0SHRtbDogc3RyaW5nID0gJyc7XG4gICAgc3RvcmVEYXRhLml0ZW1zLm1hcCgoaXRlbTogc3RyaW5nKSA9PiB7XG4gICAgICBsaXN0SHRtbCArPSBgPGxpPiR7aXRlbX08L2xpPmA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgPGgxPlRvZG88L2gxPlxuXG4gICAgICA8dWw+XG4gICAgICAgICR7bGlzdEh0bWx9XG4gICAgICA8L3VsPlxuXG4gICAgICA8Zm9ybT5cbiAgICAgICAgPGxhYmVsIGZvcj1cInRleHRcIj7QndCw0LfQstCw0L3QuNC1INC30LDQtNCw0YfQuDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGV4dFwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj7QlNC+0LHQsNCy0LjRgtGMPC9idXR0b24+XG4gICAgICA8L2Zvcm0+YDtcbiAgfVxuXG4gIHByaXZhdGUgb25CdG5DbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRleHQ6IHN0cmluZyA9ICh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICB0aGlzLmRpc3BhdGNoQWN0aW9uKCdhZGRJdGVtJywgdGV4dCk7XG4gIH1cbn1cblxuY29uc3QgY29udGFpbmVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvJyk7XG5cbmNvbnN0IHRvZG86IFRvRG9WaWV3ID0gbmV3IFRvRG9WaWV3KGNvbnRhaW5lcik7XG5cbnRvZG8uY29ubmVjdERpc3BhdGNoZXIoZGlzcGF0Y2hlcik7XG50b2RvLmNvbm5lY3RTdG9yZShzdG9yZSk7XG5cbnN0b3JlLm9uQWN0aW9uKCdhZGRJdGVtJywgKHRleHQsIHN0YXRlKSA9PiB7XG4gIHN0YXRlLml0ZW1zLnB1c2godGV4dCk7XG59KTtcblxudG9kby51cGRhdGVTdGF0ZSgpO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzcGF0Y2hlciB7XG4gIHByaXZhdGUgY2FsbGJhY2tzOiBBcnJheTwodHlwZTogc3RyaW5nLCBwYXlsb2FkOiBhbnkpID0+IHZvaWQ+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gIH1cblxuICBwdWJsaWMgZGlzcGF0Y2godHlwZTogc3RyaW5nLCBwYXlsb2FkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgY2FsbGJhY2sodHlwZSwgcGF5bG9hZCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXIoY2FsbGJhY2s6ICh0eXBlOiBzdHJpbmcsIHBheWxvYWQ6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICB9XG59XG4iLCJpbXBvcnQgRGlzcGF0Y2hlciBmcm9tIFwiLi9kaXNwYXRjaGVyXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIHtcbiAgcHJpdmF0ZSBkaXNwYXRjaGVyOiBEaXNwYXRjaGVyO1xuICBwcml2YXRlIHN0YXRlOiBhbnk7XG4gIHByaXZhdGUgYWN0aW9uQ2FsbGJhY2tzOiBhbnk7XG4gIHByaXZhdGUgdmlld3M6IFZpZXdbXTtcblxuICBjb25zdHJ1Y3Rvcihpbml0aWFsU3RhdGU6IGFueSA9IHt9KSB7XG4gICAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICB0aGlzLmFjdGlvbkNhbGxiYWNrcyA9IHt9O1xuICAgIHRoaXMudmlld3MgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBjb25uZWN0RGlzcGF0Y2hlcihkaXNwYXRjaGVyOiBEaXNwYXRjaGVyKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcbiAgICB0aGlzLmRpc3BhdGNoZXIucmVnaXN0ZXIodGhpcy5wcm9jZXNzQWN0aW9uLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIGNvbm5lY3RWaWV3KHZpZXc6IFZpZXcpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdzLnB1c2godmlldyk7XG4gIH1cblxuICBwdWJsaWMgb25BY3Rpb24odHlwZTogc3RyaW5nLCBjYWxsYmFjazogKHBheWxvYWQ6IGFueSwgc3RhdGU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aW9uQ2FsbGJhY2tzW3R5cGVdID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgZ2V0RGF0YSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHByb2Nlc3NBY3Rpb24gKHR5cGU6IHN0cmluZywgcGF5bG9hZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFjdGlvbkNhbGxiYWNrc1t0eXBlXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuYWN0aW9uQ2FsbGJhY2tzW3R5cGVdKHBheWxvYWQsIHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy52aWV3cy5tYXAoKHZpZXcpID0+IHtcbiAgICAgICAgdmlldy51cGRhdGVTdGF0ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRGlzcGF0Y2hlciBmcm9tIFwiLi9kaXNwYXRjaGVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4vc3RvcmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIHByb3RlY3RlZCBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBkaXNwYXRjaGVyOiBEaXNwYXRjaGVyO1xuICBwcml2YXRlIHN0b3JlOiBTdG9yZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgY29ubmVjdERpc3BhdGNoZXIoZGlzcGF0Y2hlcjogRGlzcGF0Y2hlcik6IHZvaWQge1xuICAgIHRoaXMuZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XG4gIH1cblxuICBwdWJsaWMgY29ubmVjdFN0b3JlKHN0b3JlOiBTdG9yZSk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICB0aGlzLnN0b3JlLmNvbm5lY3RWaWV3KHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVN0YXRlKCkge1xuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRpc3BhdGNoQWN0aW9uKHR5cGU6IHN0cmluZywgcGF5bG9hZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKHR5cGUsIHBheWxvYWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFN0b3JlRGF0YSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldERhdGEoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW5kZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cbiJdfQ==
