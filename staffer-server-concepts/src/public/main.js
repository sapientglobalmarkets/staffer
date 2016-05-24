var model = new falcor.Model({
    source: new falcor.HttpDataSource('/model.json')
});

var needId = 101;

model.get(['needMap', needId, ['startDate', 'endDate']])
.then(function(json) {
    console.log(JSON.stringify(json, null, 4));
    return 0;
});

// model.get([
//         'needs',
//         {from: 0, to: 100},
//         ['startDate', 'endDate', 'project', 'skill', 'person'],
//         ['name', 'email', 'phone']
//     ])
// .then(function(json) {
//     console.log(JSON.stringify(json, null, 4));
//     return 0;
// });
