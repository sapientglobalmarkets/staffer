// -----------------------------------------------------------------------------
// Needs
// -----------------------------------------------------------------------------
var needs_flattened = [
    {
        id: 101,
        startDate: new Date('2016-06-01'),
        endDate: new Date('2016-06-30'),
        project: 'Cheerful Planet',
        company: 'Apple',
        skill: 'JavaScript',
        person: 'Peter Gill'
    },
    {
        id: 102,
        startDate: new Date('2016-08-01'),
        endDate: new Date('2016-08-31'),
        project: 'Cheerful Planet',
        company: 'Apple',
        skill: 'JavaScript',
        person: 'Peter Gill'
    }
];

var needs_fully_expanded_with_duplicates = [
    {
        id: 101,
        startDate: new Date('2016-06-01'),
        endDate: new Date('2016-06-30'),
        project: {
            id: 71,
            name: 'Cheerful Planet',
            company: {
                id: 61,
                name: 'Apple'
            }
        },
        skill: {
            id: 1,
            name: 'JavaScript'
        },
        person: {
            id: 11,
            name: 'Peter Gill',
            email: 'owo@nifganwu.ng',
            phone: '(464) 630-2937',
            skills: [
                {
                    id: 1,
                    name: 'JavaScript'
                }
            ],
            needIds: [101, 102]
        }
    },
    {
        id: 102,
        startDate: new Date('2016-08-01'),
        endDate: new Date('2016-08-31'),
        project: {
            id: 71,
            name: 'Cheerful Planet',
            company: {
                id: 61,
                name: 'Apple'
            }
        },
        skill: {
            id: 1,
            name: 'JavaScript'
        },
        person: {
            id: 11,
            name: 'Peter Gill',
            email: 'owo@nifganwu.ng',
            phone: '(464) 630-2937',
            skills: [
                {
                    id: 1,
                    name: 'JavaScript'
                }
            ],
            needIds: [101, 102]
        }
    }
];

var needs_represented_as_a_graph = {
    needMap: {
        101: {
            id: 101,
            startDate: new Date('2016-06-01'),
            endDate: new Date('2016-06-30'),
            projectId: 71,
            skillId: 1,
            personId: 11
        },
        102: {
            id: 102,
            startDate: new Date('2016-08-01'),
            endDate: new Date('2016-08-31'),
            projectId: 71,
            skillId: 1,
            personId: 11
        }
    },
    projectMap: {
        71: {
            id: 71,
            name: 'Cheerful Planet',
            companyId: 61
        }
    },
    skillMap: {
        1: {
            id: 1,
            name: 'JavaScript'
        }
    },
    personMap: {
        11: {
            id: 11,
            name: 'Peter Gill',
            email: 'owo@nifganwu.ng',
            phone: '(464) 630-2937',
            skillIds: [1],
            needIds: [101, 102]
        }
    },
    companyMap: {
        61: {
            id: 61,
            name: 'Apple'
        }
    }
};

// -----------------------------------------------------------------------------
// Falcor Model
// -----------------------------------------------------------------------------
var model_flattened = new falcor.Model({
    cache: {
        needMap: {
            101: {
                startDate: '2016-06-01',
                endDate: '2016-06-30',
                project: 'Cheerful Planet',
                company: 'Apple',
                skill: 'JavaScript',
                person: 'Peter Gill',
            },
            102: {
                startDate: '2016-08-01',
                endDate: '2016-08-31',
                project: 'Cheerful Planet',
                company: 'Apple',
                skill: 'JavaScript',
                person: 'Peter Gill'
            }
        }
    }
});

var model_represented_as_a_graph = new falcor.Model({
    cache: {
        needs: [
            $ref('needMap[101]'),
            $ref('needMap[102]')
        ],
        needMap: {
            101: {
                startDate: '2016-06-01',
                endDate: '2016-06-30',
                project: $ref('projectMap[71]'),
                skill: $ref('skillMap[1]'),
                person: $ref('personMap[11]')
            },
            102: {
                startDate: '2016-08-01',
                endDate: '2016-08-31',
                project: $ref('projectMap[71]'),
                skill: $ref('skillMap[1]'),
                person: $ref('personMap[11]')
            }
        },
        projectMap: {
            71: {
                name: 'Cheerful Planet',
                company: $ref('companyMap[61]')
            }
        },
        skillMap: {
            1: {
                name: 'JavaScript'
            }
        },
        personMap: {
            11: {
                name: 'Peter Gill',
                email: 'owo@nifganwu.ng',
                phone: '(464) 630-2937',
                skills: [
                    $ref('skillMap[1]')
                ],
                needs: [
                    $ref('needMap[101]'),
                    $ref('needMap[102]')
                ]
            }
        },
        companyMap: {
            61: {
                name: 'Apple'
            }
        }
    }
});