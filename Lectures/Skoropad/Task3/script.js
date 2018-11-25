function buildInit() {
  let body = document.getElementById('tableMonth')
  let tbl = document.createElement('table')
  tbl.style.width = '250px'
  tbl.style.height = '200px'
  tbl.style.border = '1px solid black'
  let id = 1
  for (let i = 0; i < 5; i++) {
    let tr = tbl.insertRow()
    for (let j = 0; j < 7; j++) {
      let td = tr.insertCell()
      td.style['background-color'] = 'white'
      td.style.border = '1px solid black'
      td.style.padding = '8px'
      td.id = `${id}`
      id++
    }
  }
  tbl.id = 'tbl'
  body.appendChild(tbl)
}

function tableContent(date) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const daysThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const header = document.getElementById('header')
  if(!header.childNodes[0])
    header.appendChild(document.createTextNode(monthNames[date.getMonth()] + '  ' + date.getFullYear()), header.childNodes[0])
  else
    header.replaceChild(document.createTextNode(monthNames[date.getMonth()] + '  ' + date.getFullYear()), header.childNodes[0])
  const firstDay = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-01').getDay()
  let k = firstDay - 1
  for (let i = 0; i < 7; i++) {
    if (k < 0) k = 6
    if (k > 6) k = 0
    let node = document.getElementById(`day${i+1}`)
    if (!node.childNodes[0]) node.appendChild(document.createTextNode(`${daysOfWeek[k]}`), node.childNodes[0])
    else node.replaceChild(document.createTextNode(`${daysOfWeek[k]}`), node.childNodes[0])
    k++
  }
  let id = 1
  let day = 1
  let nextMonth = false
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 7; j++) {
      let dayNode = document.getElementById(`${id}`)
      let clone = dayNode.cloneNode(true)
      dayNode.parentNode.replaceChild(clone, dayNode)
      dayNode = document.getElementById(`${id}`)
      dayNode.clicked = false
      dayNode.today = false
      dayNode.nextMonth = false
      if (day > daysThisMonth) {
        nextMonth = true
        day = 1
      }
      function listener() {
        if (!dayNode.clicked) {
          dayNode.clicked = true
          dayNode.style['background-color'] = '#3399ff'
          dayNode.style.color = 'white'
        } else {
          if(dayNode.nextMonth)
            dayNode.style['background-color'] = 'grey'
          else
            dayNode.style['background-color'] = 'white'

          if (dayNode.today){
            dayNode.style.color = 'blue'
          }
          else if (firstDay + j === 7 || firstDay + j === 0) {

            dayNode.style.color = 'red'
          } 
          else {
            dayNode.style.color = 'black'
          }
          dayNode.clicked = false
        }
      }
      dayNode.addEventListener('click', listener, false)
      if (!dayNode.childNodes[0]) {
        dayNode.appendChild(document.createTextNode(`${day}`), dayNode.childNodes[0])
      } else dayNode.replaceChild(document.createTextNode(`${day}`), dayNode.childNodes[0])
      day++
      id++
      if (nextMonth){
        dayNode.style['background-color'] = 'grey'
        dayNode.nextMonth = true
      }
      else
        dayNode.style['background-color'] = 'white'
      if (firstDay + j === 7 || firstDay + j === 0) {
        dayNode.style.color = 'red'
      } else {
        dayNode.style.color = 'black'
      }
      if (monthNow === date.getFullYear() && yearNow === date.getMonth() && dayNow === day - 1){
        dayNode.style.color = 'blue'
        dayNode.today = true
      }
    }
  }
}
const now = new Date()
const monthNow = now.getFullYear()
const yearNow = now.getMonth()
const dayNow = now.getDate()
let newDate = new Date()
let clicked = true
let next = document.getElementById('next')
next.addEventListener('click', function() {
  if (newDate.getMonth() === 11) {
    newDate = new Date(newDate.getFullYear() + 1, 0)
    tableContent(newDate)
  } else {
    newDate = new Date(newDate.getFullYear(), (newDate.getMonth() + 1))
    tableContent(newDate)
  }
})
let prev = document.getElementById('prev')
prev.addEventListener('click', function() {
  if (newDate.getMonth() === 0) {
    newDate = new Date(newDate.getFullYear() - 1, 11)
    tableContent(newDate)
  } else {
    newDate = new Date(newDate.getFullYear(), (newDate.getMonth() - 1))
    tableContent(newDate)
  }
})
buildInit()
tableContent(newDate)