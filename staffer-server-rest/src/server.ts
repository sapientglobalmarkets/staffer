import * as _ from 'lodash';
import * as bodyParser from 'body-parser';
import * as Chance from 'chance';
import * as cors from 'cors';
import * as express from 'express';
import * as moment from 'moment';

// -----------------------------------------------------------------------------
// Domain
// -----------------------------------------------------------------------------
class Skill {
    id: number;
    name: string;
}

class Person {
    id: number;
    name: string;
    email: string;
    phone: string;
    skillIds: number[];
    needIds: number[];
}

class Company {
    id: number;
    name: string;
}

class Project {
    id: number;
    name: string;
    companyId: number;
}

class Need {
    id: number;
    startDate: Date;
    endDate: Date;
    projectId: number;
    skillId: number;
    personId: number;
}

class Store {
    skillMap: any;
    personMap: any;
    companyMap: any;
    projectMap: any;
    needMap: any;
}

// -----------------------------------------------------------------------------
// Generate data
// -----------------------------------------------------------------------------
var nextId = 1;
var chance = new Chance();
var store = new Store();
store.skillMap = generateSkills();
store.personMap = generatePeople();
store.companyMap = generateCompanies();
store.projectMap = generateProjects();
store.needMap = generateNeeds();

// -----------------------------------------------------------------------------
// Create Express App
// -----------------------------------------------------------------------------
var app = express();

// Add middleware to enable CORS
app.use(cors());

// Add middleware to parse the POST data of the body
app.use(bodyParser.urlencoded({ extended: true }));

// Add middleware to parse application/json
app.use(bodyParser.json());

app.get('/skills', function (req: express.Request, res: express.Response) {
    res.json(store.skillMap);
});

app.get('/people', function (req: express.Request, res: express.Response) {

    // Filter people based on the query
    let needId = req.query.needId ? parseInt(req.query.needId) : -1;
    let skillId = req.query.skillId ? parseInt(req.query.skillId) : -1;
    let availableFrom = req.query.availableFrom ? new Date(req.query.availableFrom) : null;
    let availableTo = req.query.availableTo ? new Date(req.query.availableTo) : null;

    let personMap: any = {};
    _.each(store.personMap, function (person: Person) {
        let isRejected = false;

        if (needId > -1 && store.needMap[needId] && store.needMap[needId].personId === person.id) {
            // Do nothing, we want this person - she is the one assigned to this need
        }
        else if (skillId > -1 && person.skillIds.indexOf(skillId) < 0) {
            isRejected = true;
        }
        else if (availableFrom && availableTo) {
            // Find a need that clashes with the availability range
            let clashingNeed = _.find(person.needIds, function(needId: number) {
                let need: Need = store.needMap[needId];
                return (need.startDate <= availableTo && need.endDate >= availableFrom) ? true : false;
            });
            if (clashingNeed) {
                isRejected = true;
            }
        }

        if (!isRejected) {
            personMap[person.id] = person;
        }
    });

    res.json(personMap);
});

// Assign person to a need
app.post('/people/:personId/needs/:needId', function (req: express.Request, res: express.Response) {

    // Check if person and need exist
    let person = store.personMap[req.params.personId];
    let need = store.needMap[req.params.needId];
    if (!person || !need) {
        res.send(400);  // Bad Request
        return;
    }

    let result = {
        people: <any>[],
        need: need
    };

    // If need is assigned to another person, remove it from person
    if (need.personId) {
        let previousPerson = store.personMap[need.personId];
        removeNeedFromPerson(previousPerson, need.id);
        result.people.push(previousPerson);
    }

    // Add need to person
    person.needIds.push(need.id);
    result.people.push(person);

    // Add person to need
    need.personId = person.id;

    res.json(result);
});

// Remove person from a need
app.delete('/people/:personId/needs/:needId', function (req: express.Request, res: express.Response) {

    // Check if person and need exist
    let person = store.personMap[req.params.personId];
    let need = store.needMap[req.params.needId];
    if (!person || !need) {
        res.send(400);  // Bad Request
        return;
    }

    // Remove need from person
    removeNeedFromPerson(person, need.id);

    // Remove person from need
    need.personId = null;

    res.json({
        person: person,
        need: need
    });
});

function removeNeedFromPerson(person: Person, needId: number) {
    let index = person.needIds.indexOf(needId);
    if (index >= 0) {
        person.needIds.splice(index, 1);
    }
}

app.get('/companies', function (req: express.Request, res: express.Response) {
    res.json(store.companyMap);
});

app.get('/projects', function (req: express.Request, res: express.Response) {
    res.json(store.projectMap);
});

app.get('/needs', function (req: express.Request, res: express.Response) {

    // Filter needs based on the query
    let minStartDate = req.query.minStartDate ? new Date(req.query.minStartDate) : null;
    let maxStartDate = req.query.maxStartDate ? new Date(req.query.maxStartDate) : null;
    let projectId = req.query.projectId ? parseInt(req.query.projectId) : -1;
    let skillId = req.query.skillId ? parseInt(req.query.skillId) : -1;
    let personId = req.query.personId ? parseInt(req.query.personId) : -1;
    let status = req.query.status || 'all';

    let needMap: any = {};
    _.each(store.needMap, function (need) {
        let isRejected = false;

        if (minStartDate && need.startDate < minStartDate) {
            isRejected = true;
        }
        else if (maxStartDate && need.startDate > maxStartDate) {
            isRejected = true;
        }
        else if (projectId > -1 && need.projectId !== projectId) {
            isRejected = true;
        }
        else if (skillId > -1 && need.skillId !== skillId) {
            isRejected = true;
        }
        else if (personId > -1 && need.personId !== personId) {
            isRejected = true;
        }
        else if (status === 'open' && need.personId) {
            isRejected = true;
        }
        else if (status === 'closed' && !need.personId) {
            isRejected = true;
        }

        if (!isRejected) {
            needMap[need.id] = need;
        }
    });

    // Get related entities
    let projectMap = getProjectsForNeeds(needMap);
    let skillMap = getSkillsForNeeds(needMap);
    let personMap = getPeopleForNeeds(needMap);

    // Return result
    res.json({
        needMap: needMap,
        projectMap: projectMap,
        skillMap: skillMap,
        personMap: personMap
    });
});

// -----------------------------------------------------------------------------
// Start the HTTP Server using the Express App
// -----------------------------------------------------------------------------
var port = process.env.PORT || 8080;

var server = require('http').createServer(app);

// Start listening to HTTP requests
server.listen(port, function () {
    console.log('Listening on port ' + port);
});

// -----------------------------------------------------------------------------
// Stop the HTTP server and the database when SIGINT is received
// (i.e. Ctrl-C is pressed)
// -----------------------------------------------------------------------------
process.on('SIGINT', function () {
    console.log('SIGINT received ...');
    server.close(function () {
        console.log('Server stopped ...');
        console.log('Exiting process ...');
        process.exit();
    });
});


///////// Utility Functions ///////////

function generateSkills(): any {

    let skills = [
        'HTML/CSS/JavaScript',
        'Node.js',
        'Java',
        '.NET',
        'PHP',
        'Ruby',
        'Project Management',
        'Information Architect',
        'Visual Designer',
        'Business Consultant'
    ];

    let skillMap: any = {};

    _.each(skills, skill => {
        let id = nextId++;
        skillMap[id] = { id: id, name: skill };
    });

    return skillMap;
}

function generatePeople(): any {

    let skillIds = Object.keys(store.skillMap);

    let personMap: any = {};

    for (let i = 0; i < 50; i++) {
        let id = nextId++;
        personMap[id] = {
            id: id,
            name: chance.name(),
            email: chance.email(),
            phone: chance.phone(),
            skillIds: [
                parseInt(chance.pick(skillIds)),
                parseInt(chance.pick(skillIds))
            ],
            needIds: [
            ]
        };
    };

    return personMap;
}

function generateCompanies(): any {

    let companies = [
        'Apple',
        'Google',
        'eBay',
        'Netflix',
        'Facebook',
        'Microsoft',
        'Amazon',
        'Github',
        'Sapient',
        'Uber'
    ];

    let companyMap: any = {};

    _.each(companies, company => {
        let id = nextId++;
        companyMap[id] = { id: id, name: company };
    });

    return companyMap;
}

function generateProjects(): any {

    let companyIds = Object.keys(store.companyMap);

    let projects = [
        'Cheerful Planet',
        'Star Rainbow',
        'Brave Mountain',
        'Electron',
        'Locomotive',
        'Compass',
        'Plutonium',
        'Jupiter',
        'Scoreboard',
        'Zeus',
        'Gamma',
        'Winter',
        'Helium',
        'Orange Fox',
        'Star Burst',
        'Puppet',
        'Eastern Railroad',
        'April Showers',
        'Dinosaur',
        'Elastic Cloud',
        'Rare Jazz',
        'Tungsten',
        'Sapphire',
        'Golden Viper',
        'Pink Floyd',
        'Aerosmith',
        'Stones',
        'Zeppelin',
        'Eagles',
        'Maroon Five'
    ];

    let projectMap: any = {};

    _.each(projects, company => {
        let id = nextId++;
        projectMap[id] = {
            id: id,
            name: company,
            companyId: parseInt(chance.pick(companyIds))
        };
    });

    return projectMap;
}

function generateNeeds(): any {

    let skillIds = Object.keys(store.skillMap);
    let projectIds = Object.keys(store.projectMap);

    let needMap: any = {};

    for (let i = 0; i < 50; i++) {
        let id = nextId++;

        // Set start date to Monday this week + random number of weeks
        var numWeeksAfter = chance.integer({ min: 0, max: 26 });
        var startDate = moment().weekday(1).startOf('day').add(numWeeksAfter, 'weeks');

        // Set duration to a random number of weeks
        var numWeeksDuration = chance.integer({ min: 1, max: 26 });
        var endDate = startDate.clone().add(numWeeksDuration - 1, 'weeks').add(4, 'days').endOf('day');

        needMap[id] = {
            id: id,
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            projectId: parseInt(chance.pick(projectIds)),
            skillId: parseInt(chance.pick(skillIds)),
            personId: null,
        };
    };

    return needMap;
}

function getProjectsForNeeds(needMap: any): any {

    let projectMap: any = {};

    _.each(needMap, function (need) {
        projectMap[need.projectId] = store.projectMap[need.projectId];
    });

    return projectMap;
}

function getSkillsForNeeds(needMap: any): any {

    let skillMap: any = {};

    _.each(needMap, function (need) {
        skillMap[need.skillId] = store.skillMap[need.skillId];
    });

    return skillMap;
}

function getPeopleForNeeds(needMap: any): any {

    let personMap: any = {};

    _.each(needMap, function (need) {
        if (need.personId) {
            personMap[need.personId] = store.personMap[need.personId];
        }
    });

    return personMap;
}
