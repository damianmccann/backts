"use strict";
class Entity {
    constructor(id) {
        this.id = id;
    }
}
class Person extends Entity {
    constructor(id, firstname, lastname) {
        super(id);
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
class Company extends Entity {
    constructor(id, name) {
        super(id);
        this.name = name;
    }
}
class BaseProvider {
    list() {
        return this.getData();
    }
    search(searchText) {
        searchText = searchText.toLowerCase();
        let results = [];
        for (const item of this.list()) {
            if (Object.values(item).join(' ').toLowerCase().includes(searchText)) {
                results.push(item);
            }
        }
        return results;
    }
}
class PersonProvider extends BaseProvider {
    getData() {
        let p1 = new Person(1, "Sophie", "Lozophy");
        let p2 = new Person(2, "Annie", "Versaire");
        let p3 = new Person(3, "Paul", "Ochon");
        return [p1, p2, p3];
    }
}
class CompanyProvider extends BaseProvider {
    getData() {
        let c1 = new Company(1, "Microsoft");
        let c2 = new Company(2, "Google");
        let c3 = new Company(3, "WebForceLife");
        return [c1, c2, c3];
    }
}
class RepositoryService {
    constructor(providers) {
        this.providers = [];
        this.providers = providers;
    }
    list() {
        let allProviders = [];
        this.providers.forEach(x => allProviders = allProviders.concat(x.list()));
        return allProviders;
    }
    search(text) {
        let foundProviders = [];
        text = text.toLowerCase();
        this.providers.forEach(x => foundProviders = foundProviders.concat(x.search(text)));
        return foundProviders;
    }
}
let rs = new RepositoryService([new PersonProvider(), new CompanyProvider()]);
// console.log('RepositoryService.search("so") returns:');
// console.log(rs.search("so"));
const express = require('express');
const cors = require('cors');
let app = express(); // Create server
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
