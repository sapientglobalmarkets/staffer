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
    needs: [
        101,
        102
    ],
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

var model_full_data = new falcor.Model({
    cache: {
        skillMap: {
            1: {
                id: 1,
                name: 'HTML/CSS/JavaScript'
            },
            2: {
                id: 2,
                name: 'Node.js'
            },
            3: {
                id: 3,
                name: 'Java'
            },
            4: {
                id: 4,
                name: '.NET'
            },
            5: {
                id: 5,
                name: 'PHP'
            },
            6: {
                id: 6,
                name: 'Ruby'
            },
            7: {
                id: 7,
                name: 'Project Management'
            },
            8: {
                id: 8,
                name: 'Information Architect'
            },
            9: {
                id: 9,
                name: 'Visual Designer'
            },
            10: {
                id: 10,
                name: 'Business Consultant'
            }
        },
        personMap: {
            11: {
                id: 11,
                name: 'Betty Buchanan',
                email: 'taemi@sohlew.in',
                phone: '(932) 564-7917',
                skills: [
                    $ref('skillMap[2]'),
                    $ref('skillMap[4]')
                ],
                needs: []
            },
            12: {
                id: 12,
                name: 'Brandon Fitzgerald',
                email: 'jo@dolizo.ao',
                phone: '(723) 917-1054',
                skills: [
                    $ref('skillMap[7]'),
                    $ref('skillMap[10]')
                ],
                needs: []
            },
            13: {
                id: 13,
                name: 'Gene Tran',
                email: 'vobohkob@gehtub.bn',
                phone: '(982) 731-4798',
                skills: [
                    $ref('skillMap[1]'),
                    $ref('skillMap[10]')
                ],
                needs: []
            },
            14: {
                id: 14,
                name: 'Jane Andrews',
                email: 'diepjid@ven.uy',
                phone: '(949) 523-8885',
                skills: [
                    $ref('skillMap[3]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            },
            15: {
                id: 15,
                name: 'Eliza Morales',
                email: 'dowgew@fibif.is',
                phone: '(354) 222-3143',
                skills: [
                    $ref('skillMap[4]'),
                    $ref('skillMap[1]')
                ],
                needs: []
            },
            16: {
                id: 16,
                name: 'Matthew Castro',
                email: 'irned@tuubi.sa',
                phone: '(534) 432-3032',
                skills: [
                    $ref('skillMap[3]'),
                    $ref('skillMap[3]')
                ],
                needs: []
            },
            17: {
                id: 17,
                name: 'Nora Jennings',
                email: 'foniweme@rerfi.mn',
                phone: '(752) 325-9886',
                skills: [
                    $ref('skillMap[6]'),
                    $ref('skillMap[5]')
                ],
                needs: []
            },
            18: {
                id: 18,
                name: 'Shane Flowers',
                email: 'hehub@ke.lk',
                phone: '(904) 883-1447',
                skills: [
                    $ref('skillMap[8]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            },
            19: {
                id: 19,
                name: 'Della McKinney',
                email: 'habboob@lorew.mk',
                phone: '(738) 985-3364',
                skills: [
                    $ref('skillMap[2]'),
                    $ref('skillMap[2]')
                ],
                needs: []
            },
            20: {
                id: 20,
                name: 'Georgie Curtis',
                email: 'umuvumfu@nit.cn',
                phone: '(706) 752-4116',
                skills: [
                    $ref('skillMap[2]'),
                    $ref('skillMap[8]')
                ],
                needs: []
            },
            21: {
                id: 21,
                name: 'Ada Mann',
                email: 'irke@nocjoow.es',
                phone: '(529) 419-9518',
                skills: [
                    $ref('skillMap[10]'),
                    $ref('skillMap[7]')
                ],
                needs: []
            },
            22: {
                id: 22,
                name: 'Alberta Paul',
                email: 'ravowef@wubtomil.gp',
                phone: '(352) 779-4993',
                skills: [
                    $ref('skillMap[7]'),
                    $ref('skillMap[8]')
                ],
                needs: []
            },
            23: {
                id: 23,
                name: 'Nellie Lane',
                email: 'fajo@sefwidow.nu',
                phone: '(461) 829-3061',
                skills: [
                    $ref('skillMap[9]'),
                    $ref('skillMap[4]')
                ],
                needs: []
            },
            24: {
                id: 24,
                name: 'Essie Watkins',
                email: 'nicur@bir.gf',
                phone: '(507) 342-6491',
                skills: [
                    $ref('skillMap[10]'),
                    $ref('skillMap[5]')
                ],
                needs: []
            },
            25: {
                id: 25,
                name: 'Lawrence Allen',
                email: 'kic@lidfu.co.uk',
                phone: '(774) 497-8817',
                skills: [
                    $ref('skillMap[5]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            },
            26: {
                id: 26,
                name: 'Etta Torres',
                email: 'buvuro@zo.gi',
                phone: '(682) 984-6645',
                skills: [
                    $ref('skillMap[7]'),
                    $ref('skillMap[6]')
                ],
                needs: []
            },
            27: {
                id: 27,
                name: 'Sadie Hall',
                email: 'fet@fihkoh.ma',
                phone: '(247) 462-9394',
                skills: [
                    $ref('skillMap[6]'),
                    $ref('skillMap[7]')
                ],
                needs: []
            },
            28: {
                id: 28,
                name: 'Aiden Paul',
                email: 'bu@deicu.kr',
                phone: '(621) 624-7451',
                skills: [
                    $ref('skillMap[3]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            },
            29: {
                id: 29,
                name: 'Bernard Hart',
                email: 'ipfal@bufuc.sx',
                phone: '(505) 498-5162',
                skills: [
                    $ref('skillMap[10]'),
                    $ref('skillMap[4]')
                ],
                needs: []
            },
            30: {
                id: 30,
                name: 'Ina Nelson',
                email: 'nuw@niz.cg',
                phone: '(555) 397-2710',
                skills: [
                    $ref('skillMap[4]'),
                    $ref('skillMap[2]')
                ],
                needs: []
            },
            31: {
                id: 31,
                name: 'Brandon Evans',
                email: 'wikdujin@cezvebeco.gr',
                phone: '(627) 268-2458',
                skills: [
                    $ref('skillMap[6]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            },
            32: {
                id: 32,
                name: 'Roy Allen',
                email: 'cobwi@pa.bo',
                phone: '(949) 532-3026',
                skills: [
                    $ref('skillMap[7]'),
                    $ref('skillMap[7]')
                ],
                needs: []
            },
            33: {
                id: 33,
                name: 'Loretta Wagner',
                email: 'rewnah@reed.lb',
                phone: '(223) 910-4370',
                skills: [
                    $ref('skillMap[2]'),
                    $ref('skillMap[6]')
                ],
                needs: []
            },
            34: {
                id: 34,
                name: 'Rose Harrison',
                email: 'foca@bag.sv',
                phone: '(283) 774-3243',
                skills: [
                    $ref('skillMap[1]'),
                    $ref('skillMap[2]')
                ],
                needs: []
            },
            35: {
                id: 35,
                name: 'Henrietta Jordan',
                email: 'saw@ijari.it',
                phone: '(935) 398-5060',
                skills: [
                    $ref('skillMap[1]'),
                    $ref('skillMap[3]')
                ],
                needs: []
            },
            36: {
                id: 36,
                name: 'Fannie Barnes',
                email: 'vume@iboze.td',
                phone: '(554) 961-4380',
                skills: [
                    $ref('skillMap[9]'),
                    $ref('skillMap[6]')
                ],
                needs: []
            },
            37: {
                id: 37,
                name: 'Herman Sanchez',
                email: 'dehosuli@fubit.kp',
                phone: '(242) 715-1702',
                skills: [
                    $ref('skillMap[4]'),
                    $ref('skillMap[2]')
                ],
                needs: []
            },
            38: {
                id: 38,
                name: 'Olga Patrick',
                email: 'muw@ulola.gw',
                phone: '(931) 710-2323',
                skills: [
                    $ref('skillMap[5]'),
                    $ref('skillMap[8]')
                ],
                needs: []
            },
            39: {
                id: 39,
                name: 'Vincent Wise',
                email: 'imu@imaedakir.gu',
                phone: '(367) 769-4419',
                skills: [
                    $ref('skillMap[3]'),
                    $ref('skillMap[3]')
                ],
                needs: []
            },
            40: {
                id: 40,
                name: 'Loretta Wong',
                email: 'ogfa@hiz.eh',
                phone: '(501) 546-6226',
                skills: [
                    $ref('skillMap[7]'),
                    $ref('skillMap[5]')
                ],
                needs: []
            },
            41: {
                id: 41,
                name: 'Maude Torres',
                email: 'komew@edhuh.bb',
                phone: '(961) 973-3423',
                skills: [
                    $ref('skillMap[9]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            },
            42: {
                id: 42,
                name: 'Glen Sanchez',
                email: 'duzur@gazunmi.cc',
                phone: '(258) 687-8482',
                skills: [
                    $ref('skillMap[9]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            },
            43: {
                id: 43,
                name: 'Bess Hicks',
                email: 'faw@itub.na',
                phone: '(430) 466-3202',
                skills: [
                    $ref('skillMap[9]'),
                    $ref('skillMap[10]')
                ],
                needs: []
            },
            44: {
                id: 44,
                name: 'Willie Sanchez',
                email: 'gufov@fotodjuk.ae',
                phone: '(745) 901-6423',
                skills: [
                    $ref('skillMap[7]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            },
            45: {
                id: 45,
                name: 'Betty Gibson',
                email: 'seapis@wecam.kr',
                phone: '(742) 450-7673',
                skills: [
                    $ref('skillMap[4]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            },
            46: {
                id: 46,
                name: 'Bobby Sparks',
                email: 'kutow@nez.sh',
                phone: '(876) 370-1758',
                skills: [
                    $ref('skillMap[7]'),
                    $ref('skillMap[8]')
                ],
                needs: []
            },
            47: {
                id: 47,
                name: 'Madge Barrett',
                email: 'pe@ifetaw.bz',
                phone: '(582) 728-7090',
                skills: [
                    $ref('skillMap[4]'),
                    $ref('skillMap[1]')
                ],
                needs: []
            },
            48: {
                id: 48,
                name: 'Bobby Cobb',
                email: 'kuvaw@tonuv.mc',
                phone: '(764) 446-5568',
                skills: [
                    $ref('skillMap[9]'),
                    $ref('skillMap[3]')
                ],
                needs: []
            },
            49: {
                id: 49,
                name: 'Jose McKenzie',
                email: 'wi@co.ly',
                phone: '(362) 563-2590',
                skills: [
                    $ref('skillMap[5]'),
                    $ref('skillMap[3]')
                ],
                needs: []
            },
            50: {
                id: 50,
                name: 'Christina Austin',
                email: 'ihutivu@duj.zm',
                phone: '(571) 479-6636',
                skills: [
                    $ref('skillMap[8]'),
                    $ref('skillMap[2]')
                ],
                needs: []
            },
            51: {
                id: 51,
                name: 'Ricky Sharp',
                email: 'mebargo@bov.lv',
                phone: '(315) 363-1157',
                skills: [
                    $ref('skillMap[6]'),
                    $ref('skillMap[7]')
                ],
                needs: []
            },
            52: {
                id: 52,
                name: 'Viola Carter',
                email: 'nakose@sagarebe.su',
                phone: '(875) 724-3576',
                skills: [
                    $ref('skillMap[10]'),
                    $ref('skillMap[2]')
                ],
                needs: []
            },
            53: {
                id: 53,
                name: 'Lulu Rogers',
                email: 'vevuk@teb.tf',
                phone: '(369) 704-6269',
                skills: [
                    $ref('skillMap[2]'),
                    $ref('skillMap[3]')
                ],
                needs: []
            },
            54: {
                id: 54,
                name: 'Bertha Curtis',
                email: 'ka@cuvodah.ck',
                phone: '(666) 355-3793',
                skills: [
                    $ref('skillMap[10]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            },
            55: {
                id: 55,
                name: 'Winnie Dawson',
                email: 'je@caewiwe.de',
                phone: '(725) 499-1424',
                skills: [
                    $ref('skillMap[5]'),
                    $ref('skillMap[6]')
                ],
                needs: []
            },
            56: {
                id: 56,
                name: 'Cole Walters',
                email: 'jig@cu.lt',
                phone: '(528) 405-1496',
                skills: [
                    $ref('skillMap[3]'),
                    $ref('skillMap[4]')
                ],
                needs: []
            },
            57: {
                id: 57,
                name: 'Cordelia Armstrong',
                email: 'montefak@ara.sn',
                phone: '(924) 417-7685',
                skills: [
                    $ref('skillMap[8]'),
                    $ref('skillMap[10]')
                ],
                needs: []
            },
            58: {
                id: 58,
                name: 'Ruby Bowers',
                email: 'or@nupbite.ke',
                phone: '(408) 281-6757',
                skills: [
                    $ref('skillMap[9]'),
                    $ref('skillMap[8]')
                ],
                needs: []
            },
            59: {
                id: 59,
                name: 'Nell Jennings',
                email: 'suvu@za.as',
                phone: '(650) 439-5570',
                skills: [
                    $ref('skillMap[8]'),
                    $ref('skillMap[1]')
                ],
                needs: []
            },
            60: {
                id: 60,
                name: 'Linnie McBride',
                email: 'moluw@bi.kz',
                phone: '(469) 413-8754',
                skills: [
                    $ref('skillMap[7]'),
                    $ref('skillMap[9]')
                ],
                needs: []
            }
        },
        companyMap: {
            61: {
                id: 61,
                name: 'Apple'
            },
            62: {
                id: 62,
                name: 'Google'
            },
            63: {
                id: 63,
                name: 'eBay'
            },
            64: {
                id: 64,
                name: 'Netflix'
            },
            65: {
                id: 65,
                name: 'Facebook'
            },
            66: {
                id: 66,
                name: 'Microsoft'
            },
            67: {
                id: 67,
                name: 'Amazon'
            },
            68: {
                id: 68,
                name: 'Github'
            },
            69: {
                id: 69,
                name: 'Sapient'
            },
            70: {
                id: 70,
                name: 'Uber'
            }
        },
        projectMap: {
            71: {
                id: 71,
                name: 'Cheerful Planet',
                company: $ref('companyMap[61]')
            },
            72: {
                id: 72,
                name: 'Star Rainbow',
                company: $ref('companyMap[65]')
            },
            73: {
                id: 73,
                name: 'Brave Mountain',
                company: $ref('companyMap[69]')
            },
            74: {
                id: 74,
                name: 'Electron',
                company: $ref('companyMap[67]')
            },
            75: {
                id: 75,
                name: 'Locomotive',
                company: $ref('companyMap[66]')
            },
            76: {
                id: 76,
                name: 'Compass',
                company: $ref('companyMap[65]')
            },
            77: {
                id: 77,
                name: 'Plutonium',
                company: $ref('companyMap[70]')
            },
            78: {
                id: 78,
                name: 'Jupiter',
                company: $ref('companyMap[63]')
            },
            79: {
                id: 79,
                name: 'Scoreboard',
                company: $ref('companyMap[64]')
            },
            80: {
                id: 80,
                name: 'Zeus',
                company: $ref('companyMap[70]')
            },
            81: {
                id: 81,
                name: 'Gamma',
                company: $ref('companyMap[69]')
            },
            82: {
                id: 82,
                name: 'Winter',
                company: $ref('companyMap[68]')
            },
            83: {
                id: 83,
                name: 'Helium',
                company: $ref('companyMap[68]')
            },
            84: {
                id: 84,
                name: 'Orange Fox',
                company: $ref('companyMap[69]')
            },
            85: {
                id: 85,
                name: 'Star Burst',
                company: $ref('companyMap[64]')
            },
            86: {
                id: 86,
                name: 'Puppet',
                company: $ref('companyMap[63]')
            },
            87: {
                id: 87,
                name: 'Eastern Railroad',
                company: $ref('companyMap[62]')
            },
            88: {
                id: 88,
                name: 'April Showers',
                company: $ref('companyMap[65]')
            },
            89: {
                id: 89,
                name: 'Dinosaur',
                company: $ref('companyMap[65]')
            },
            90: {
                id: 90,
                name: 'Elastic Cloud',
                company: $ref('companyMap[66]')
            },
            91: {
                id: 91,
                name: 'Rare Jazz',
                company: $ref('companyMap[69]')
            },
            92: {
                id: 92,
                name: 'Tungsten',
                company: $ref('companyMap[63]')
            },
            93: {
                id: 93,
                name: 'Sapphire',
                company: $ref('companyMap[64]')
            },
            94: {
                id: 94,
                name: 'Golden Viper',
                company: $ref('companyMap[67]')
            },
            95: {
                id: 95,
                name: 'Pink Floyd',
                company: $ref('companyMap[66]')
            },
            96: {
                id: 96,
                name: 'Aerosmith',
                company: $ref('companyMap[62]')
            },
            97: {
                id: 97,
                name: 'Stones',
                company: $ref('companyMap[63]')
            },
            98: {
                id: 98,
                name: 'Zeppelin',
                company: $ref('companyMap[66]')
            },
            99: {
                id: 99,
                name: 'Eagles',
                company: $ref('companyMap[69]')
            },
            100: {
                id: 100,
                name: 'Maroon Five',
                company: $ref('companyMap[68]')
            }
        },
        needMap: {
            101: {
                id: 101,
                startDate: '2016-07-04T04:00:00.000Z',
                endDate: '2016-10-22T03:59:59.999Z',
                project: $ref('projectMap[87]'),
                skill: $ref('skillMap[3]'),
                person: null
            },
            102: {
                id: 102,
                startDate: '2016-07-18T04:00:00.000Z',
                endDate: '2016-09-24T03:59:59.999Z',
                project: $ref('projectMap[80]'),
                skill: $ref('skillMap[5]'),
                person: null
            },
            103: {
                id: 103,
                startDate: '2016-10-17T04:00:00.000Z',
                endDate: '2017-02-04T04:59:59.999Z',
                project: $ref('projectMap[96]'),
                skill: $ref('skillMap[1]'),
                person: null
            },
            104: {
                id: 104,
                startDate: '2016-08-08T04:00:00.000Z',
                endDate: '2016-11-19T04:59:59.999Z',
                project: $ref('projectMap[80]'),
                skill: $ref('skillMap[8]'),
                person: null
            },
            105: {
                id: 105,
                startDate: '2016-09-26T04:00:00.000Z',
                endDate: '2017-01-28T04:59:59.999Z',
                project: $ref('projectMap[98]'),
                skill: $ref('skillMap[1]'),
                person: null
            },
            106: {
                id: 106,
                startDate: '2016-08-15T04:00:00.000Z',
                endDate: '2016-11-26T04:59:59.999Z',
                project: $ref('projectMap[89]'),
                skill: $ref('skillMap[2]'),
                person: null
            },
            107: {
                id: 107,
                startDate: '2016-07-11T04:00:00.000Z',
                endDate: '2016-10-08T03:59:59.999Z',
                project: $ref('projectMap[100]'),
                skill: $ref('skillMap[2]'),
                person: null
            },
            108: {
                id: 108,
                startDate: '2016-08-01T04:00:00.000Z',
                endDate: '2017-01-14T04:59:59.999Z',
                project: $ref('projectMap[77]'),
                skill: $ref('skillMap[3]'),
                person: null
            },
            109: {
                id: 109,
                startDate: '2016-06-20T04:00:00.000Z',
                endDate: '2016-07-30T03:59:59.999Z',
                project: $ref('projectMap[74]'),
                skill: $ref('skillMap[9]'),
                person: null
            },
            110: {
                id: 110,
                startDate: '2016-09-19T04:00:00.000Z',
                endDate: '2016-10-29T03:59:59.999Z',
                project: $ref('projectMap[99]'),
                skill: $ref('skillMap[9]'),
                person: null
            },
            111: {
                id: 111,
                startDate: '2016-08-08T04:00:00.000Z',
                endDate: '2016-11-12T04:59:59.999Z',
                project: $ref('projectMap[94]'),
                skill: $ref('skillMap[6]'),
                person: null
            },
            112: {
                id: 112,
                startDate: '2016-09-12T04:00:00.000Z',
                endDate: '2016-12-03T04:59:59.999Z',
                project: $ref('projectMap[96]'),
                skill: $ref('skillMap[3]'),
                person: null
            },
            113: {
                id: 113,
                startDate: '2016-06-06T04:00:00.000Z',
                endDate: '2016-08-13T03:59:59.999Z',
                project: $ref('projectMap[97]'),
                skill: $ref('skillMap[4]'),
                person: null
            },
            114: {
                id: 114,
                startDate: '2016-07-25T04:00:00.000Z',
                endDate: '2017-01-07T04:59:59.999Z',
                project: $ref('projectMap[77]'),
                skill: $ref('skillMap[6]'),
                person: null
            },
            115: {
                id: 115,
                startDate: '2016-05-23T04:00:00.000Z',
                endDate: '2016-10-01T03:59:59.999Z',
                project: $ref('projectMap[100]'),
                skill: $ref('skillMap[7]'),
                person: null
            },
            116: {
                id: 116,
                startDate: '2016-09-26T04:00:00.000Z',
                endDate: '2017-03-04T04:59:59.999Z',
                project: $ref('projectMap[99]'),
                skill: $ref('skillMap[4]'),
                person: null
            },
            117: {
                id: 117,
                startDate: '2016-09-12T04:00:00.000Z',
                endDate: '2017-01-14T04:59:59.999Z',
                project: $ref('projectMap[87]'),
                skill: $ref('skillMap[5]'),
                person: null
            },
            118: {
                id: 118,
                startDate: '2016-10-31T04:00:00.000Z',
                endDate: '2017-03-18T03:59:59.999Z',
                project: $ref('projectMap[74]'),
                skill: $ref('skillMap[4]'),
                person: null
            },
            119: {
                id: 119,
                startDate: '2016-11-21T05:00:00.000Z',
                endDate: '2016-12-31T04:59:59.999Z',
                project: $ref('projectMap[83]'),
                skill: $ref('skillMap[8]'),
                person: null
            },
            120: {
                id: 120,
                startDate: '2016-10-17T04:00:00.000Z',
                endDate: '2016-12-03T04:59:59.999Z',
                project: $ref('projectMap[89]'),
                skill: $ref('skillMap[9]'),
                person: null
            },
            121: {
                id: 121,
                startDate: '2016-09-12T04:00:00.000Z',
                endDate: '2017-02-11T04:59:59.999Z',
                project: $ref('projectMap[75]'),
                skill: $ref('skillMap[4]'),
                person: null
            },
            122: {
                id: 122,
                startDate: '2016-09-26T04:00:00.000Z',
                endDate: '2016-11-19T04:59:59.999Z',
                project: $ref('projectMap[86]'),
                skill: $ref('skillMap[7]'),
                person: null
            },
            123: {
                id: 123,
                startDate: '2016-09-26T04:00:00.000Z',
                endDate: '2016-10-22T03:59:59.999Z',
                project: $ref('projectMap[92]'),
                skill: $ref('skillMap[9]'),
                person: null
            },
            124: {
                id: 124,
                startDate: '2016-08-29T04:00:00.000Z',
                endDate: '2017-01-28T04:59:59.999Z',
                project: $ref('projectMap[80]'),
                skill: $ref('skillMap[8]'),
                person: null
            },
            125: {
                id: 125,
                startDate: '2016-10-17T04:00:00.000Z',
                endDate: '2017-01-28T04:59:59.999Z',
                project: $ref('projectMap[97]'),
                skill: $ref('skillMap[9]'),
                person: null
            },
            126: {
                id: 126,
                startDate: '2016-08-22T04:00:00.000Z',
                endDate: '2016-11-19T04:59:59.999Z',
                project: $ref('projectMap[87]'),
                skill: $ref('skillMap[4]'),
                person: null
            },
            127: {
                id: 127,
                startDate: '2016-05-30T04:00:00.000Z',
                endDate: '2016-10-08T03:59:59.999Z',
                project: $ref('projectMap[90]'),
                skill: $ref('skillMap[8]'),
                person: null
            },
            128: {
                id: 128,
                startDate: '2016-08-15T04:00:00.000Z',
                endDate: '2016-09-03T03:59:59.999Z',
                project: $ref('projectMap[83]'),
                skill: $ref('skillMap[4]'),
                person: null
            },
            129: {
                id: 129,
                startDate: '2016-09-12T04:00:00.000Z',
                endDate: '2016-09-24T03:59:59.999Z',
                project: $ref('projectMap[72]'),
                skill: $ref('skillMap[10]'),
                person: null
            },
            130: {
                id: 130,
                startDate: '2016-09-05T04:00:00.000Z',
                endDate: '2016-10-15T03:59:59.999Z',
                project: $ref('projectMap[90]'),
                skill: $ref('skillMap[2]'),
                person: null
            },
            131: {
                id: 131,
                startDate: '2016-09-19T04:00:00.000Z',
                endDate: '2016-11-12T04:59:59.999Z',
                project: $ref('projectMap[82]'),
                skill: $ref('skillMap[10]'),
                person: null
            },
            132: {
                id: 132,
                startDate: '2016-05-30T04:00:00.000Z',
                endDate: '2016-10-15T03:59:59.999Z',
                project: $ref('projectMap[78]'),
                skill: $ref('skillMap[4]'),
                person: null
            },
            133: {
                id: 133,
                startDate: '2016-08-29T04:00:00.000Z',
                endDate: '2017-02-18T04:59:59.999Z',
                project: $ref('projectMap[89]'),
                skill: $ref('skillMap[6]'),
                person: null
            },
            134: {
                id: 134,
                startDate: '2016-10-24T04:00:00.000Z',
                endDate: '2016-12-17T04:59:59.999Z',
                project: $ref('projectMap[82]'),
                skill: $ref('skillMap[9]'),
                person: null
            },
            135: {
                id: 135,
                startDate: '2016-10-31T04:00:00.000Z',
                endDate: '2017-04-01T03:59:59.999Z',
                project: $ref('projectMap[72]'),
                skill: $ref('skillMap[5]'),
                person: null
            },
            136: {
                id: 136,
                startDate: '2016-06-06T04:00:00.000Z',
                endDate: '2016-08-13T03:59:59.999Z',
                project: $ref('projectMap[99]'),
                skill: $ref('skillMap[8]'),
                person: null
            },
            137: {
                id: 137,
                startDate: '2016-10-31T04:00:00.000Z',
                endDate: '2017-03-04T04:59:59.999Z',
                project: $ref('projectMap[80]'),
                skill: $ref('skillMap[2]'),
                person: null
            },
            138: {
                id: 138,
                startDate: '2016-05-30T04:00:00.000Z',
                endDate: '2016-11-12T04:59:59.999Z',
                project: $ref('projectMap[73]'),
                skill: $ref('skillMap[6]'),
                person: null
            },
            139: {
                id: 139,
                startDate: '2016-09-05T04:00:00.000Z',
                endDate: '2016-10-01T03:59:59.999Z',
                project: $ref('projectMap[87]'),
                skill: $ref('skillMap[2]'),
                person: null
            },
            140: {
                id: 140,
                startDate: '2016-07-18T04:00:00.000Z',
                endDate: '2016-11-26T04:59:59.999Z',
                project: $ref('projectMap[77]'),
                skill: $ref('skillMap[2]'),
                person: null
            },
            141: {
                id: 141,
                startDate: '2016-05-30T04:00:00.000Z',
                endDate: '2016-10-29T03:59:59.999Z',
                project: $ref('projectMap[77]'),
                skill: $ref('skillMap[7]'),
                person: null
            },
            142: {
                id: 142,
                startDate: '2016-09-05T04:00:00.000Z',
                endDate: '2016-12-10T04:59:59.999Z',
                project: $ref('projectMap[99]'),
                skill: $ref('skillMap[7]'),
                person: null
            },
            143: {
                id: 143,
                startDate: '2016-07-11T04:00:00.000Z',
                endDate: '2016-08-20T03:59:59.999Z',
                project: $ref('projectMap[77]'),
                skill: $ref('skillMap[2]'),
                person: null
            },
            144: {
                id: 144,
                startDate: '2016-08-15T04:00:00.000Z',
                endDate: '2016-11-26T04:59:59.999Z',
                project: $ref('projectMap[82]'),
                skill: $ref('skillMap[10]'),
                person: null
            },
            145: {
                id: 145,
                startDate: '2016-11-14T05:00:00.000Z',
                endDate: '2016-12-31T04:59:59.999Z',
                project: $ref('projectMap[85]'),
                skill: $ref('skillMap[9]'),
                person: null
            },
            146: {
                id: 146,
                startDate: '2016-10-17T04:00:00.000Z',
                endDate: '2017-03-18T03:59:59.999Z',
                project: $ref('projectMap[80]'),
                skill: $ref('skillMap[7]'),
                person: null
            },
            147: {
                id: 147,
                startDate: '2016-08-29T04:00:00.000Z',
                endDate: '2017-01-28T04:59:59.999Z',
                project: $ref('projectMap[94]'),
                skill: $ref('skillMap[5]'),
                person: null
            },
            148: {
                id: 148,
                startDate: '2016-06-13T04:00:00.000Z',
                endDate: '2016-11-12T04:59:59.999Z',
                project: $ref('projectMap[89]'),
                skill: $ref('skillMap[2]'),
                person: null
            },
            149: {
                id: 149,
                startDate: '2016-11-21T05:00:00.000Z',
                endDate: '2016-12-17T04:59:59.999Z',
                project: $ref('projectMap[91]'),
                skill: $ref('skillMap[3]'),
                person: null
            },
            150: {
                id: 150,
                startDate: '2016-07-18T04:00:00.000Z',
                endDate: '2016-10-08T03:59:59.999Z',
                project: $ref('projectMap[92]'),
                skill: $ref('skillMap[2]'),
                person: null
            }
        },
        skills: [
            $ref('skillMap[1]'),
            $ref('skillMap[2]'),
            $ref('skillMap[3]'),
            $ref('skillMap[4]'),
            $ref('skillMap[5]'),
            $ref('skillMap[6]'),
            $ref('skillMap[7]'),
            $ref('skillMap[8]'),
            $ref('skillMap[9]'),
            $ref('skillMap[10]')
        ],
        people: [
            $ref('personMap[11]'),
            $ref('personMap[12]'),
            $ref('personMap[13]'),
            $ref('personMap[14]'),
            $ref('personMap[15]'),
            $ref('personMap[16]'),
            $ref('personMap[17]'),
            $ref('personMap[18]'),
            $ref('personMap[19]'),
            $ref('personMap[20]'),
            $ref('personMap[21]'),
            $ref('personMap[22]'),
            $ref('personMap[23]'),
            $ref('personMap[24]'),
            $ref('personMap[25]'),
            $ref('personMap[26]'),
            $ref('personMap[27]'),
            $ref('personMap[28]'),
            $ref('personMap[29]'),
            $ref('personMap[30]'),
            $ref('personMap[31]'),
            $ref('personMap[32]'),
            $ref('personMap[33]'),
            $ref('personMap[34]'),
            $ref('personMap[35]'),
            $ref('personMap[36]'),
            $ref('personMap[37]'),
            $ref('personMap[38]'),
            $ref('personMap[39]'),
            $ref('personMap[40]'),
            $ref('personMap[41]'),
            $ref('personMap[42]'),
            $ref('personMap[43]'),
            $ref('personMap[44]'),
            $ref('personMap[45]'),
            $ref('personMap[46]'),
            $ref('personMap[47]'),
            $ref('personMap[48]'),
            $ref('personMap[49]'),
            $ref('personMap[50]'),
            $ref('personMap[51]'),
            $ref('personMap[52]'),
            $ref('personMap[53]'),
            $ref('personMap[54]'),
            $ref('personMap[55]'),
            $ref('personMap[56]'),
            $ref('personMap[57]'),
            $ref('personMap[58]'),
            $ref('personMap[59]'),
            $ref('personMap[60]')
        ],
        companies: [
            $ref('companyMap[61]'),
            $ref('companyMap[62]'),
            $ref('companyMap[63]'),
            $ref('companyMap[64]'),
            $ref('companyMap[65]'),
            $ref('companyMap[66]'),
            $ref('companyMap[67]'),
            $ref('companyMap[68]'),
            $ref('companyMap[69]'),
            $ref('companyMap[70]')
        ],
        projects: [
            $ref('projectMap[71]'),
            $ref('projectMap[72]'),
            $ref('projectMap[73]'),
            $ref('projectMap[74]'),
            $ref('projectMap[75]'),
            $ref('projectMap[76]'),
            $ref('projectMap[77]'),
            $ref('projectMap[78]'),
            $ref('projectMap[79]'),
            $ref('projectMap[80]'),
            $ref('projectMap[81]'),
            $ref('projectMap[82]'),
            $ref('projectMap[83]'),
            $ref('projectMap[84]'),
            $ref('projectMap[85]'),
            $ref('projectMap[86]'),
            $ref('projectMap[87]'),
            $ref('projectMap[88]'),
            $ref('projectMap[89]'),
            $ref('projectMap[90]'),
            $ref('projectMap[91]'),
            $ref('projectMap[92]'),
            $ref('projectMap[93]'),
            $ref('projectMap[94]'),
            $ref('projectMap[95]'),
            $ref('projectMap[96]'),
            $ref('projectMap[97]'),
            $ref('projectMap[98]'),
            $ref('projectMap[99]'),
            $ref('projectMap[100]')
        ],
        needs: [
            $ref('needMap[101]'),
            $ref('needMap[102]'),
            $ref('needMap[103]'),
            $ref('needMap[104]'),
            $ref('needMap[105]'),
            $ref('needMap[106]'),
            $ref('needMap[107]'),
            $ref('needMap[108]'),
            $ref('needMap[109]'),
            $ref('needMap[110]'),
            $ref('needMap[111]'),
            $ref('needMap[112]'),
            $ref('needMap[113]'),
            $ref('needMap[114]'),
            $ref('needMap[115]'),
            $ref('needMap[116]'),
            $ref('needMap[117]'),
            $ref('needMap[118]'),
            $ref('needMap[119]'),
            $ref('needMap[120]'),
            $ref('needMap[121]'),
            $ref('needMap[122]'),
            $ref('needMap[123]'),
            $ref('needMap[124]'),
            $ref('needMap[125]'),
            $ref('needMap[126]'),
            $ref('needMap[127]'),
            $ref('needMap[128]'),
            $ref('needMap[129]'),
            $ref('needMap[130]'),
            $ref('needMap[131]'),
            $ref('needMap[132]'),
            $ref('needMap[133]'),
            $ref('needMap[134]'),
            $ref('needMap[135]'),
            $ref('needMap[136]'),
            $ref('needMap[137]'),
            $ref('needMap[138]'),
            $ref('needMap[139]'),
            $ref('needMap[140]'),
            $ref('needMap[141]'),
            $ref('needMap[142]'),
            $ref('needMap[143]'),
            $ref('needMap[144]'),
            $ref('needMap[145]'),
            $ref('needMap[146]'),
            $ref('needMap[147]'),
            $ref('needMap[148]'),
            $ref('needMap[149]'),
            $ref('needMap[150]')
        ]
    }
});
