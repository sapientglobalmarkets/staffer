var model = new falcor.Model({
    source: new falcor.HttpDataSource('/model.json')
});

model.get([
        'needs',
        {from: 0, to: 100},
        ['id', 'startDate', 'endDate', 'project', 'skill', 'person'],
        ['name', 'email', 'phone']
    ])
.then(function(response) {
    console.log(JSON.stringify(response, null, 4));

    Object.keys(response.json.needs).forEach(function(key) {
        var need = response.json.needs[key];

        console.log(
            need.skill.name + ', ' +
            need.project.name + ', ' +
            need.startDate + ', ' +
            need.endDate + ', ' +
            (need.person ? need.person.name : '-'));
    });

    return 0;
});
