import React from "react";

// Tables
export const recordType = (record) => Object.keys(record).includes('link') ? "document" : "training"
export const require_superior = (document) => document.require_superior
export const nonExpandableDocs = (documents) => {
  return documents.map(doc => {
      if (!require_superior(doc))
        return  doc.id
    }
  )
}

export const fitBtn = () => {
  return { width: '1%'}
}

export const orderBy = (field, order='asc') => {
  return [{ dataField: field, order: order }]
}


// Authentication
export const setUser = (user) => sessionStorage.setItem('user', JSON.stringify(user))
export const getUser = () => JSON.parse(sessionStorage.getItem('user'))
export const removeUser = () => sessionStorage.removeItem('user')
export const isAdmin = () => getUser() !== null && getUser().role === 'admin'


// Helpers
export const goodMsg = (body) => {
  return {
    variant: 'success',
    body: body
  }
}

export const badMsg = (body) => {
  return {
    variant: 'danger',
    body: body
  }
}

export const successResponse = (response) => 200 <= response.status && response.status <= 299
export const getLanguage = () => JSON.parse(sessionStorage.getItem('language'))
export const delay = ms => new Promise(res => setTimeout(res, ms));


// Add record forms
export const getSelectOptions = (field) => {
  return <>
        <option hidden value="">Select option ...</option>
        { field.map(value => <option>{value}</option>) }
      </>
}

export const setOf = (array) => {
  const set = []
  array.forEach(arr => {
    if (!set.find(res => res.value === arr.value)) set.push(arr)
  })
  return set // array of unique objects by their .value
}

export const getCombinationsLabels = (combinations) => { // TODO ME
  const c = combinations.split('&').map(e => e.split(','))
  console.log(c)
  // return c
  return [{
    branch: [{ value: 'A1', label: 'A1' }],
    division: [{ value: 'D1', label: 'B2' }],
    department: [{ value: 'D1', label: 'B2' }],
    city: [{ value: 'C1', label: 'B2' }],
  },{
    branch: [{ value: 'A1', label: 'A1' }],
    division: [{ value: 'Da1', label: 'B2' }],
    department: [{ value: 'Da1', label: 'B2' }],
    city: [{ value: 'C2', label: 'C2'}],
  }]
}

export const withId = (data) => {
  return Object.keys(data).includes('id')
}

export const prefillDocumentForm = (data) => {
  if (!data) return {}
  // if (withId(data)) {
  //   data = {...data, id: data.id}
  // }
  return {
    ...data,
    release_date: getDateString(data.release_date),
    deadline: getDateString(data.deadline),
  }
}

export const prefillTrainingForm = (data) => {
  if (!data) return {}
  // if (withId(data)) {
  //   data = {...data, id: data.id}
  // }
  return {
    ...data,
    date: getDateString(data.date),
    deadline: getDateString(data.deadline),
  }
}

export const correctTrainingFormData = (data, attendees) => {
  return {
    ...data,
    date: getDateObject(data.date),
    deadline: getDateObject(data.deadline),
    employees: attendees.map(a => a.id).join(',')
  }
}

export const correctDocumentFormData = (data, combinations) => {
  return {
    ...data,
    release_date: getDateObject(data.release_date),
    deadline: getDateObject(data.deadline),
    assigned_to: resolveCombinations(combinations)
  }
}

const getDateObject = (date) => {
  return {
    Time: date + 'T00:00:00Z',
    Valid: true
  }
}

const getDateString = (date) => date.Time.substr(0, 10)

const resolveCombinations = (combinations) => {
  let combs = flatBranch(combinations)
  combs = flatDivision(combs)
  combs = flatDepartment(combs)
  combs = flatCity(combs)
  return stringify(combs).join('&')
}

const flatBranch = (combs) => {
  const res = []
  combs.forEach(c => { if (!c.branch.length) res.push(c)
    c.branch.forEach(b => res.push({...c, branch: [b]}))
  })
  return res
}

const flatDivision = (combs) => {
  const res = []
  combs.forEach(c => { if (!c.division.length) res.push(c)
    c.division.forEach(f => res.push({...c, division: [f]}))
  })
  return res
}

const flatDepartment = (combs) => {
  const res = []
  combs.forEach(c => { if (!c.department.length) res.push(c)
    c.department.forEach(f => res.push({...c, department: [f]}))
  })
  return res
}

const flatCity = (combs) => {
  const res = []
  combs.forEach(c => { if (!c.city.length) res.push(c)
    c.city.forEach(f => res.push({...c, city: [f]}))
  })
  return res
}

const getID = (field) => {
  return field.length ? field[0].value : 'x'
}

const stringify = (combs) => {
  return combs.map(c => {
    return `${getID(c.branch)},${getID(c.city)},${getID(c.department)},${getID(c.division)}`
  })
}