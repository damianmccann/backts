"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Entity = /** @class */ (function () {
    function Entity(id) {
        this.id = id;
    }
    return Entity;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(id, firstname, lastname) {
        var _this = _super.call(this, id) || this;
        _this.firstname = firstname;
        _this.lastname = lastname;
        return _this;
    }
    return Person;
}(Entity));
var Company = /** @class */ (function (_super) {
    __extends(Company, _super);
    function Company(id, name) {
        var _this = _super.call(this, id) || this;
        _this.name = name;
        return _this;
    }
    return Company;
}(Entity));
var BaseProvider = /** @class */ (function () {
    function BaseProvider() {
    }
    BaseProvider.prototype.list = function () {
        return this.getData();
    };
    BaseProvider.prototype.search = function (searchText) {
        searchText = searchText.toLowerCase();
        var results = [];
        for (var _i = 0, _a = this.list(); _i < _a.length; _i++) {
            var item = _a[_i];
            if (Object.values(item).join(' ').toLowerCase().includes(searchText)) {
                results.push(item);
            }
        }
        return results;
    };
    return BaseProvider;
}());
var PersonProvider = /** @class */ (function (_super) {
    __extends(PersonProvider, _super);
    function PersonProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonProvider.prototype.getData = function () {
        var p1 = new Person(1, "Sophie", "Lozophy");
        var p2 = new Person(2, "Annie", "Versaire");
        var p3 = new Person(3, "Paul", "Ochon");
        return [p1, p2, p3];
    };
    return PersonProvider;
}(BaseProvider));
var CompanyProvider = /** @class */ (function (_super) {
    __extends(CompanyProvider, _super);
    function CompanyProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompanyProvider.prototype.getData = function () {
        var c1 = new Company(1, "Microsoft");
        var c2 = new Company(2, "Google");
        var c3 = new Company(3, "WebForceLife");
        return [c1, c2, c3];
    };
    return CompanyProvider;
}(BaseProvider));
var RepositoryService = /** @class */ (function () {
    function RepositoryService(providers) {
        this.providers = [];
        this.providers = providers;
    }
    RepositoryService.prototype.list = function () {
        var allProviders = [];
        this.providers.forEach(function (x) { return allProviders = allProviders.concat(x.list()); });
        return allProviders;
    };
    RepositoryService.prototype.search = function (text) {
        var foundProviders = [];
        text = text.toLowerCase();
        this.providers.forEach(function (x) { return foundProviders = foundProviders.concat(x.search(text)); });
        return foundProviders;
    };
    return RepositoryService;
}());
var rs = new RepositoryService([new PersonProvider(), new CompanyProvider()]);
// console.log('RepositoryService.search("so") returns:');
// console.log(rs.search("so"));
var express = require('express');
var cors = require('cors');
var app = express(); // Create server
app.use(cors()); // Use Cors - authorise http requests from a different origin
app.use(express.json()); // Use JSON
app.get('/', function (req, res) {
    res.send(rs.list());
});
app.post('/search', function (req, res) {
    res.send(rs.search(req.body.text));
});
app.listen(4000, function () {
    console.log('Listening on port 4000...');
});
// console.log("RepositoryService.list() returns:");
// console.log(rs.list());
// console.log('RepositoryService.search("so") returns:');
// console.log(rs.search("so"));
// rs.deleteProvider("1")
// console.log("RepositoryService.deleteProvider(1)");
// console.log("RepositoryService.list() returns:");
// console.log(rs.list());
// console.log('RepositoryService.search("so") returns:');
// console.log(rs.search("so"));
