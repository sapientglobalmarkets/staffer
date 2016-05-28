# staffer-server-rest

To run this application:

```bash
$ npm install
$ npm start
```

The Staffer REST API is now available at [http://localhost:8080/](http://localhost:8080/).

## Server API

The server is designed to send complex graphs of objects efficiently - without dulicating data. The inspiration comes from Dan Abramov's [normalizr](https://github.com/paularmstrong/normalizr) as well as Falcor's [JSON Graph](http://netflix.github.io/falcor/documentation/jsongraph.html).

### Get Skills

#### Request
```
GET http://localhost:8080/skills
```

#### Response
```
{
  "1": {
    "id": 1,
    "name": "HTML/CSS/JavaScript"
  },
  ...
}
```

### Get People

#### Request
Note: All query parameters are optional.

```
GET http://localhost:8080/people?needId=20&skillId=8&availableFrom=2016-06-01&availableTo=2016-06-30

```

#### Response
```
{
  "11": {
    "id": 11,
    "name": "Jeanette Newton",
    "email": "sepajkit@gigdobku.cu",
    "phone": "(309) 615-1790",
    "skillIds": [
      8,
      3
    ],
    "needIds": [
      20
    ]
  },
  ...
}
```

### Assign Person to Need

#### Request
```
POST http://localhost:8080/people/11/needs/101

```

#### Response
Note that response may have 2 people: one who got assigned and another who got unassigned.

```
{
  "needMap": {
    "101": {
      "id": 101,
      "startDate": "2016-09-12T04:00:00.000Z",
      "endDate": "2017-01-28T04:59:59.999Z",
      "projectId": 84,
      "skillId": 9,
      "personId": 11
    }
  },
  "personMap": {
    "11": {
      "id": 11,
      "name": "Jeanette Newton",
      "email": "sepajkit@gigdobku.cu",
      "phone": "(309) 615-1790",
      "skillIds": [
        8,
        3
      ],
      "needIds": [
        101
      ]
    }
  }
}
```

### Remove Person from Need

#### Request
```
DELETE http://localhost:8080/people/11/needs/101

```

#### Response
```
{
  "needMap": {
    "101": {
      "id": 101,
      "startDate": "2016-09-12T04:00:00.000Z",
      "endDate": "2017-01-28T04:59:59.999Z",
      "projectId": 84,
      "skillId": 9,
      "personId": null
    }
  },
  "personMap": {
    "11": {
      "id": 11,
      "name": "Jeanette Newton",
      "email": "sepajkit@gigdobku.cu",
      "phone": "(309) 615-1790",
      "skillIds": [
        8,
        3
      ],
      "needIds": []
    }
  }
}
```

### Get Companies

#### Request
```
GET http://localhost:8080/companies
```

#### Response
```
{
  "61": {
    "id": 61,
    "name": "Apple"
  },
  ...
}
```

### Get Projects

#### Request
```
GET http://localhost:8080/projects
```

#### Response
```
{
  "71": {
    "id": 71,
    "name": "Cheerful Planet",
    "companyId": 70
  },
  ...
}
```

### Get Needs

#### Request
Note: All query parameters are optional. Status is one of `[open | closed | all]`.

```
GET http://localhost:8080/needs?minStartDate=2016-06-01&maxStartDate=2016-06-30&projectId=84&skillId=9&personId=32&status=open

```

#### Response
```
{
    "needMap": {
        "101": {
            "id": 101,
            "startDate": "2016-09-12T04:00:00.000Z",
            "endDate": "2017-01-28T04:59:59.999Z",
            "projectId": 84,
            "skillId": 9,
            "personId": null
        },
        ...
    },
    "projectMap": {
        "71": {
            "id": 71,
            "name": "Cheerful Planet",
            "companyId": 70
        },
        ...
    },
    "skillMap": {
        "1": {
            "id": 1,
            "name": "HTML/CSS/JavaScript"
        },
        ...
    },
    "personMap": {
        "34": {
            "id": 34,
            "name": "Johanna Guzman",
            "email": "puzakla@efana.mh",
            "phone": "(878) 622-7560",
            "skillIds": [
                9,
                3
            ],
            "needIds": [
                130
            ]
        },
        ...
    }
}
```
