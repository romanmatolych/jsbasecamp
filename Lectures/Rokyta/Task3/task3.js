//'use strict'

const currDate = new Date();
let nextDate = new Date();
let prevDate = new Date();

window.onload = () => createTable(currDate);

document.getElementById('nextButton').onclick = nextMonth;
document.getElementById('previousButton').onclick = previousMonth;

/**
    Displays previous month
*/
function previousMonth() {
    removeTbody();
    createTable(prevDate);
}

/**
    Displays next month
*/
function nextMonth() {
    removeTbody();
    createTable(nextDate);
}
/**
    Deletes table body
*/

function removeTbody() {
    document.querySelector('tbody').remove();
}

/**
    Displays month and year
    @param {Date}
*/
function setCalendarHeaderMonth(date) {
    const calendarMonth = document.getElementById('calendar-month');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    calendarMonth.textContent = `${months[date.getMonth()]} ${date.getFullYear()}`; 
}

/**
    Sets down next date (next month)
    @param {Date}
*/
function setNextDate(date) {
     nextDate = new Date(date.getFullYear(), date.getMonth());
}

/**
    Sets down previous date (previous month)
    @param {Date}
*/
function setPreviousDate(date) {
    prevDate = new Date(date.getFullYear(), date.getMonth() - 2);
}

/**
    Finds name of first months day and position at row
    @param {Date}
    @return {Object}
*/
function findFirstDayPosition(date) {                  
                 
    const firstDayName = date.toDateString().substring(0, 3);                      // Find first day name of current month
    const namesOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDayIndex = namesOfWeek.indexOf(firstDayName);
    
    return firstDayIndex;
}

/**
    Finds the first day of current month
    @param {Date}
*/
function findStartDate(date) {
    return new Date(date.getFullYear(), date.getMonth());
    
}

/**
    Creates table body and fills by days of month
    @param {Date}
   
*/
function createTable(date) {
    
    let startDate = new Date();
    if(date.getDate() > 1)
         startDate = findStartDate(date)
    else {
        startDate = date;
    }
    
    const firstDayIndex = findFirstDayPosition(startDate);
    setCalendarHeaderMonth(startDate);                                              //Display name of month
    
    const currentMonthInTable = startDate.getMonth();                                  //Specifies active month
        
    const table = document.getElementById('table');
    const tbody = document.createElement('tbody');
    let dateInTable = new Date(startDate.getFullYear(), startDate.getMonth());
   
    dateInTable.setDate((startDate.getDate() - firstDayIndex) - 1);                //Specifies first date in the calendar
    console.log(dateInTable.toDateString());
    
    const countOfRows = 6;
    const countOfCol = 7;
    for(let row = 0; row < countOfRows; row++){
        const tr = document.createElement('tr');
        
        for(let col = 0; col < countOfCol; col++){
            const td = document.createElement('td');
            td.classList.add('active');
            td.classList.add('highlighted');
            
            dateInTable.setDate(dateInTable.getDate() + 1);
            td.textContent = dateInTable.getDate();
            
            if(dateInTable.getMonth() === currentMonthInTable)
                td.classList.add('activeDay');
            else {
                td.classList.add('inactiveDay');
            }
        
            if( dateInTable.getFullYear() === currDate.getFullYear()&&
                dateInTable.getMonth() === currDate.getMonth() && 
                dateInTable.getDate() === currDate.getDate()
              )
                    td.classList.add('currentDay');
            
            if(col === 0){
                td.classList.add('sundey');
            } 
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    
    setNextDate(dateInTable);
    setPreviousDate(dateInTable);
}

