/**
 * toto som čisto len testovacie dáta, náhradou za databázu
 */

export const proxy = "http://localhost:7777"

export const employees = [{
  anet_id: '1',
  name: 'Janko',
  pass: 'ja',
  job: 'Job1',
  complete: '70%'
}, {
  anet_id: '2',
  name: 'Julka',
  pass: 'ty',
  job: 'Job2',
  complete: '100%'
}, {
  anet_id: '3',
  name: 'Jaroslav',
  pass: 'on',
  job: 'Job3',
  complete: '44%'
}, {
  anet_id: '4',
  name: 'Jozef',
  pass: 'ty',
  job: 'Job4',
  complete: '53%'
}, {
  anet_id: '5',
  name: 'Juraj',
  pass: 'on',
  job: 'Job5',
  complete: '83%'
}, {
  anet_id: '6',
  name: 'Janka',
  pass: 'on',
  job: 'Job6',
  complete: '22%'
}];

export const docs = [{
    id: '1',
    name: 'Document1',
    release: '1.7.2020',
    deadline: '15.1.2000',
    sign: '1.7.2020',
    type: 'T',
    division: 'D',
    department: 'D',
    city: 'Zilina',
    record_type: 'training-document',
    state: '75%',
    sub: [{
        anet_id: '1',
        name: 'Employee1',
        sign: '1.7.2020'
      }, {
        anet_id: '2',
        name: 'Employee2',
        sign: '1.7.2020'
      }, {
        anet_id: '3',
        name: 'Employee3',
        sign: '1.7.2020'
      }]
  }, {
    id: '2',
    name: 'Document2',
    release: '15.1.2019',
    deadline: '15.1.2019',
    sign: '1.7.2020',
    type: 'T',
    division: 'D',
    department: 'D',
    city: 'Zilina, Martin',
    record_type: 'document',
    state: '80%',
  }, {
    id: '3',
    name: 'Document3',
    release: '15.1.2018',
    deadline: '15.1.2021',
    sign: '1.7.2020',
    type: 'T',
    division: 'D',
    department: 'D',
    city: 'Bratislava',
    record_type: 'online-training',
    state: '100%',
  }
];

export const dbdocs = [
  {
    assigned_to: "3; 4; 1; 4",
    deadline: {Time: "2017-03-14T00:00:00Z", Valid: true},
    id: 46,
    name: "name_46",
    agency: "Agency name_18",
    agenda: "Agenda Agenda AgendaAgendaAgenda Agenda Agenda Agenda",
    lector: "Simona",
    place: "Trnava",
    duration: 30,
    release_date: {Time: "2017-06-24T00:00:00Z", Valid: true},
    require_superior: true,
    version: "v3"
  },
  {
    assigned_to: "5; 4; 2; 2",
    deadline: {Time: "2017-04-23T00:00:00Z", Valid: true},
    id: 18,
    name: "name_18",
    agency: "Agency name_18",
    agenda: "Agenda Agenda AgendaAgendaAgenda Agenda Agenda Agenda",
    lector: "Laura",
    place: "Banska bystrica",
    duration: 120,
    prev_version_id: 0,
    release_date: {Time: "2017-10-23T00:00:00Z", Valid: true},
    require_superior: false
  },
  {
    assigned_to: "5; 4; 2; 2",
    deadline: {Time: "2013-03-11T00:00:00Z", Valid: true},
    id: 1,
    link: "www.google.com",
    name: "name_1",
    agency: "Agency name_18",
    agenda: "Agenda Agenda AgendaAgendaAgenda Agenda Agenda Agenda",
    lector: "Marek",
    place: "Ruzomberok",
    duration: 60,
    release_date: {Time: "2017-10-23T00:00:00Z", Valid: true},
    require_superior: false
  }
];

export const pobocky = ["prva pobocka", "druha pobocka", "tretia pobocka"]

export const sm_data = [
  {
    id: 1,
    name: 'Document1',
    type: 'A',
    deadline: new Date("2021/3/16"),
    employees: [{
      anet_id: '1',
      state: '_'
    }, {
      anet_id: '2',
        state: '_'
    }, {
      anet_id: '3',
        state: '_'
    }, {
      anet_id: '4',
        state: '_'
    }, {
      anet_id: '5',
        state: '_'
    }, {
      anet_id: '6',
        state: '_'
    }]
  }, {
    id: 2,
    name: 'Document2',
    type: 'B',
    deadline: new Date("2021/1/16"),
    employees: [{
      anet_id: '1',
      state: '-'
    }, {
      anet_id: '2',
      state: ''
    }, {
      anet_id: '3',
      state: ''
    }, {
      anet_id: '4',
      state: 's'
    }, {
      anet_id: '5',
      state: '-'
    }, {
      anet_id: '6',
      state: 'es'
    }]
  }, {
    id: 3,
    name: 'Document3',
    type: 'B',
    deadline: new Date("2021/1/16"),
    employees: [{
      anet_id: '1',
      state: ''
    }, {
      anet_id: '2',
      state: 's'
    }, {
      anet_id: '3',
      state: 'es'
    }, {
      anet_id: '4',
      state: 's'
    }, {
      anet_id: '5',
      state: 'es'
    }, {
      anet_id: '6',
      state: ''
    }]
  }
];

export const allInOne = {
  types: ["A", "B", "C"],
  branches: ["B1", "B2", "B3"],
  divisions: ["D1", "D2", "D3"],
  departments: ["Dep1", "Dep2", "Dep3"],
  cities: ["C1", "C2", "C3"]
};

export const combinations = [
  {
    type: "A",
    branch: "A1",
    city: "C1"
  },{
    type: "A",
    branch: "A2",
    city: "C1"
  },{
    type: "B",
    branch: "B2",
    city: "C2"
  },{
    type: "B",
    branch: "B2",
    city: "C1"
  }];

export const types = [...new Set(combinations.map(c => c.type))];
export const branches = [...new Set(combinations.map(c => c.branch))];
export const cities = [...new Set(combinations.map(c => c.city))];
export const divisions = ["D1", "D2", "D3"];
export const departments = ["Dep1", "Dep2", "Dep3"];

