abstract class Entity {
    private id: number;
    public constructor(id: number) {
        this.id = id;
    }
}

class Person extends Entity {
    private firstname: string;
    private lastname: string;
    constructor(id: number,firstname: string, lastname: string) {
        super(id);
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

class Company extends Entity {
    private name: string;
    constructor(id: number, name: string) {
        super(id);
        this.name = name;
    }
}

interface IDataProvider {
    list() :Entity[];
    search(text: string) :Entity[];
}

abstract class BaseProvider implements IDataProvider {
    protected abstract getData() :Entity[];

    public list() :Entity[] {
        return this.getData();
    }

    public search(searchText: string) :Entity[] {
        searchText = searchText.toLowerCase();
        let results:Entity[] = [];
        for (const item of this.list()) {
            if(Object.values(item).join(' ').toLowerCase().includes(searchText)) {
                results.push(item);
            }
        }
        return results;
    }
}


class PersonProvider extends BaseProvider {
    protected getData() :Person[] {
        let p1 = new Person(1, "Sophie", "Lozophy");
        let p2 = new Person(2, "Annie", "Versaire");
        let p3 = new Person(3, "Paul", "Ochon");
        return [p1, p2, p3];
    }
}

class CompanyProvider extends BaseProvider {
    protected getData() :Company [] {
        let c1 = new Company(1, "Microsoft");
        let c2 = new Company(2, "Google");
        let c3 = new Company(3, "WebForceLife");
        return [c1, c2, c3];
    }
}

class RepositoryService {
    private providers: IDataProvider[] = [];
    constructor(providers: IDataProvider[]) {
        this.providers = providers;
    }

    public list():Entity[] {
        let allProviders:Entity[] = [];
        this.providers.forEach(x => allProviders = allProviders.concat(x.list()));
        return allProviders;
    }

    public search(text:string):Entity[] {
        let foundProviders:Entity[] = [];
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

let app = express();            // Create server
app.use(cors());                // Use Cors - authorise http requests from a different origin
app.use(express.json());        // Use JSON

app.get('/', function(req: any, res: any) {
    res.send(rs.list());
});

app.post('/search', function(req: any, res: any) {
    res.send(rs.search(req.body.text));
});

app.listen(4000, function() {
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

