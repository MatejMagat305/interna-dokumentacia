
/**
 * toto som čisto len testovacie dáta, náhradou za databázu
 */

export const employees = [{
  id: '1',
  name: 'Janko',
  job: 'Job1',
  complete: '70%'
}, {
  id: '2',
  name: 'Julka',
  job: 'Job2',
  complete: '100%'
}, {
  id: '3',
  name: 'Jaroslav',
  job: 'Job3',
  complete: '44%'
}, {
  id: '4',
  name: 'Jozef',
  job: 'Job4',
  complete: '53%'
}, {
  id: '5',
  name: 'Juraj',
  job: 'Job5',
  complete: '83%'
}, {
  id: '6',
  name: 'Janka',
  job: 'Job6',
  complete: '22%'
}];

const date = {
  Time: "2021-02-15T00:00:00Z",
  Valid: true
}

export const doc_form = {
  id: "",
  name: "xxx",
  link: "linka",
  order_number: 1,
  note: "noteska",
  release_date: date,
  deadline: date,
  version: "1",
  assigned_to: "1,1,1,1&2,2,2,2",
  type: 'A',
  require_superior: true
}

export const trn_form = {
  name: "name_46",
  agency: "Agency name_18",
  agenda: "Agenda Agenda AgendaAgendaAgenda Agenda Agenda Agenda",
  lector: "Simona",
  place: "Trnava",
  duration: 30,
  date: date,
  deadline: date,
  employees: '1,2'
}

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

export const combinations = [
  {
  branch: { value: 'A1', label: 'A1' },
  division: { value: 'D1', label: 'B2' },
  department: { value: 'D1', label: 'B2' },
  city: { value: 'C1', label: 'B2' },
},{
  branch: { value: 'A1', label: 'A1' },
  division: { value: 'Da1', label: 'B2' },
  department: { value: 'Da1', label: 'B2' },
  city: { value: 'C2', label: 'C2'},
},{
  branch: { value: 'B2', label: 'B2' },
  division: { value: 'D1', label: 'B2' },
  department: { value: 'D2', label: 'B2' },
  city: { value: 'C3', label: 'C3' },
},{
  branch: { value: 'B13', label: 'B1' },
  division: { value: 'D13', label: 'B2' },
  department: { value: 'D13', label: 'B2' },
  city: { value: 'C13', label: 'B2' },
},{
  branch: { value: 'B14', label: 'B1' },
  division: { value: 'D14', label: 'B2' },
  department: { value: 'D14', label: 'B2' },
  city: { value: 'C14', label: 'B2' }
}
];

export const types = ['A', 'B'];
export const branches = [...new Set(combinations.map(c => c.branch))];
export const divisions = [...new Set(combinations.map(c => c.division))];
export const departments = [...new Set(combinations.map(c => c.department))];
export const cities = [...new Set(combinations.map(c => c.city))];

