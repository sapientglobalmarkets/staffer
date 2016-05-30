import * as _ from 'lodash';
import * as Chance from 'chance';
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
    location: String;
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
// Output SQL Inserts
// -----------------------------------------------------------------------------
console.log('-- skills');
_.each(store.skillMap, skill => {
    console.log(`INSERT INTO skills (id, name) VALUES (${skill.id}, '${skill.name}');`);
});

console.log('\n-- companies');
_.each(store.companyMap, company => {
    console.log(`INSERT INTO companies (id, name) VALUES (${company.id}, '${company.name}');`);
});

console.log('\n-- projects');
_.each(store.projectMap, project => {
    let template = `
INSERT INTO projects (id, name, location, company_id)
VALUES (${project.id}, '${project.name}', '${project.location}', ${project.companyId});`;
    console.log(template);
});

console.log('\n-- people');
_.each(store.personMap, person => {
    let template = `
INSERT INTO people (id, name, email, phone)
VALUES (${person.id}, '${person.name}', '${person.email}', '${person.phone}');`;
    console.log(template);
});

console.log('\n-- needs');
_.each(store.needMap, need => {
    let isoStartDate = need.startDate.toISOString();
    let isoEndDate = need.endDate.toISOString();

    let template = `
INSERT INTO needs (id, start_date, end_date, person_id, project_id, skill_id)
VALUES (${need.id}, '${isoStartDate}', '${isoEndDate}', ${need.personId}, ${need.projectId}, ${need.skillId});`;
    console.log(template);
});

// -----------------------------------------------------------------------------
// Generation Functions
// -----------------------------------------------------------------------------
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

    let locations = [
        'ATL',
        'BOS',
        'DEN',
        'DET',
        'LAS',
        'LAX',
        'MIA',
        'NYC',
        'ORD',
        'SFO'
    ];

    let projectMap: any = {};

    _.each(projects, company => {
        let id = nextId++;
        projectMap[id] = {
            id: id,
            name: company,
            location: chance.pick(locations),
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
