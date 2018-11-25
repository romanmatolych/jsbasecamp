const ZERO = 0;
const ONE = 1;
const DAYS = 7;
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
let data = new Date();
let firstDay = new Date(data.getFullYear(), data.getMonth(), ONE);
/**
 * launches functions
 */
window.onload = () => {
  let containerCld = document.getElementById('calendar');
  drawCalendar(containerCld);
  fillCalendar(firstDay, data.getDate());
  let btnLeft = document.getElementById('cld-left');
  btnLeft.addEventListener('click', moveCldLeft);
  let btnRight = document.getElementById('cld-right');
  btnRight.addEventListener('click', moveCldRight);
};
/**
 *draws calendar without days
 * @param {DOM element} container
 */
function drawCalendar(container) {
  let cld = document.createElement('div');
  cld.className += 'cld';
  cld.id += 'cld';
  let header = document.createElement('div');
  header.className += 'cld-header';
  header.innerHTML = '<button id="cld-left" class="cld-left" ><</button>';
  header.innerHTML += '<span id="cld-month-year" class="cld-month-year"></span>';
  header.innerHTML += '<button id="cld-right" class="cld-right">></button>';
  cld.appendChild(header);
  let table = document.createElement('table');
  table.className += 'cld-table';
  table.innerHTML =
    '<thead><tr><th>sun</th><th>mon</th><th>tues</th><th>wed</th><th>thur</th><th>fri</th><th>sat</th></tr></thead>';
  table.innerHTML += '<tbody id="cld-tbody" class="cld-tbody"></tbody>';
  cld.appendChild(table);
  container.appendChild(cld);
  let addTasks = document.createElement('div');
  addTasks.id += 'addTasks';
  addTasks.className += 'addTasks';
  addTasks.setAttribute('hidden', 'true');
  addTasks.innerHTML = '<textarea name="task" id="task" class="task"></textarea>';
  addTasks.innerHTML += '<button id="remove" class="remove">remove</button>';
  addTasks.innerHTML += '<button id="save" class="save">save</button>';
  container.appendChild(addTasks);
}
/**
 *fills days into calendar
 * @param {date} dates
 * @param {number} today
 */
function fillCalendar(dates, today) {
  let aDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let head = document.getElementById('cld-month-year');
  let year = dates.getFullYear();
  let month = dates.getMonth();
  head.innerHTML = `${MONTHS[month]} ${year}`;
  let strFirstDay = dates.toDateString().substring(ZERO, ONE + ONE + ONE);
  let indexFirstDay = aDays.indexOf(strFirstDay);
  let numberDays = new Date(year, month + ONE, ZERO).getDate();
  let numberDaysPreviousMonth = new Date(year, month, ZERO).getDate();
  let tbody = document.getElementById('cld-tbody');
  tbody.innerHTML = '';
  let tr = document.createElement('tr');
  for (let i = 0; i < indexFirstDay; i++) {
    let td = document.createElement('td');
    td.className += 'cld-days ';
    td.innerHTML = `<button class="cld-day cld-dis" disabled>${numberDaysPreviousMonth - i}</button>`;
    tr.prepend(td);
  }
  for (let i = 1; i <= DAYS - indexFirstDay; i++) {
    let td;
    if (i === today) {
      td = document.createElement('td');
      td.className += 'cld-days';
      td.innerHTML = `<button class="cld-day cld-act cld-today">${i}<div>TODAY<div></button>`;
    } else {
      td = document.createElement('td');
      td.className += 'cld-days';
      td.innerHTML = `<button class="cld-day cld-act">${i}</button>`;
    }
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
  let start = DAYS - indexFirstDay + ONE;
  let newStart = ONE;
  while (start <= numberDays) {
    let tr = document.createElement('tr');
    for (let i = 0; i < DAYS; i++) {
      let td;
      if (start === today) {
        td = document.createElement('td');
        td.className += 'cld-days';
        td.innerHTML = `<button class="cld-day cld-act cld-today">${start}<div>TODAY<div></button>`;
      } else if (start <= numberDays) {
        td = document.createElement('td');
        td.className += 'cld-days';
        td.innerHTML = `<button  class="cld-day cld-act">${start}</button>`;
      } else {
        td = document.createElement('td');
        td.className += 'cld-days';
        td.innerHTML = `<button class="cld-day cld-dis" disabled>${newStart}</button>`;
        newStart++;
      }
      tr.appendChild(td);
      start++;
    }
    tbody.appendChild(tr);
  }
  let actDays = document.getElementsByClassName('cld-act');
  let length = actDays.length;
  for (let i = 0; i < length; i++) {
    actDays[i].addEventListener('click', addTask);
  }
  let sunDays = document.querySelectorAll(".cld-day");
  length = sunDays.length;
  for (let i = 0; i < length; i += DAYS) {
    sunDays[i].style.color = "#B24F5C";
  }
}
/**
 * move calendar back
 */
function moveCldLeft() {
  firstDay.setMonth(firstDay.getMonth() - ONE);
  firstDay.getMonth() === data.getMonth() && firstDay.getFullYear() === data.getFullYear()
    ? fillCalendar(firstDay, data.getDate())
    : fillCalendar(firstDay, ZERO);
}
/**
 * move calendar forward
 */
function moveCldRight() {
  firstDay.setMonth(firstDay.getMonth() + ONE);
  firstDay.getMonth() === data.getMonth() && firstDay.getFullYear() === data.getFullYear()
    ? fillCalendar(firstDay, data.getDate())
    : fillCalendar(firstDay, ZERO);
}
/**
 * show textarea for today's tasks input
 * save task in localStorage
 * remove task from localStorage
 * @param {event} e
 */
function addTask(e) {
  let elem = e.currentTarget;
  elem.className += ' change';
  let addTasks = document.getElementById('addTasks');
  addTasks.removeAttribute('hidden');
  let id = '' + firstDay.getFullYear() + firstDay.getMonth() + parseInt(e.currentTarget.innerText);
  let task = addTasks.firstElementChild;
  if (localStorage.getItem(id) !== null) {
    task.value = localStorage.getItem(id);
  } else {
    task.value = '';
  }
  let btnSave = document.getElementById('save');
  btnSave.onclick = function() {
    localStorage.setItem(id, task.value);
    addTasks.setAttribute('hidden', 'true');
    elem.classList.toggle('change');
  };
  let btnRemove = document.getElementById('remove');
  btnRemove.onclick = function() {
    localStorage.removeItem(id);
    addTasks.setAttribute('hidden', 'true');
    elem.classList.toggle('change');
  };
}
