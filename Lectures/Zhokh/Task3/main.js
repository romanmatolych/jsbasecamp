window.onload = function(){
    //rendering main container
    var cal = document.getElementById('cal');
    cal.setAttribute('class', 'cal-container');
    cal.innerHTML = "<div class=\"header\">\
                        <span class=\"left button\" id=\"prev\"> &lang; </span>\
                        <span class=\"month-year\" id=\"label\"></span>\
                        <span class=\"right button\" id=\"next\"> &rang; </span>\
                     </div>\
                     <table class=\"days-container\" id=\"days\"></table>\
                     <div class=\"cal-frame-container\" id=\"cal-frame\"></div>";

    // declaration of main variables
    var date = new Date();
    var year = date.getFullYear();    
    var month = date.getMonth();
    var currMonth = month;
    var currYear = year;
    var currentDate = date.getDate();

    var firstDate = months[month] + " " + 1 + " " + year;
    var firstDay = new Date(firstDate).toDateString();
    firstDay = days.indexOf(firstDay.substring(0, 3));
    var lastDay = new Date(year, month+1, 0).getDate();
    
    var switchPrev = document.getElementById('prev');
    var switchNext = document.getElementById('next');
    var week = document.getElementById('days');        
    var calFrame = document.getElementById('cal-frame');

    //Rendering current calendar of current month and date.
    renderLabel(month, year);
    reanderDaysOfWeek(days, week);
    renderDates(firstDay, lastDay, calFrame, currentDate, month, currMonth, year, currYear);
    dateSwitcher();

    var calendar = document.getElementById('curr');
    var tr = calendar.getElementsByTagName('tr');
    redDay(tr);

/**
 * function wich display previous month when user click on left arrow.
 */
    switchPrev.addEventListener('click', function(event){
        month = month - 1;
        if(month < 0){
            month = 11;
            year = year - 1;
        }

        var firstDatePrev = months[month] + " " + 1 + " " + year;
        var firstDayPrev = new Date(firstDatePrev).toDateString();
        firstDayPrev = days.indexOf(firstDayPrev.substring(0, 3));
        var lastDayPrev = new Date(year, month+1, 0).getDate();

        calFrame.innerHTML='';

        renderLabel(month, year);
        renderDates(firstDayPrev, lastDayPrev, calFrame, currentDate, month, currMonth, year, currYear);
        dateSwitcher();
        var calendarPrev = document.getElementById('curr');
        var trPrev = calendarPrev.getElementsByTagName('tr');
        redDay(trPrev);
    });

/**
 * function wich display next month when user click on right arrow.
 */
    switchNext.addEventListener('click', function(event){
        month = month + 1;
        if(month > 11){
            month = 0;
            year = year + 1;
        }

        var firstDateNext = months[month] + " " + 1 + " " + year;
        var firstDayNext = new Date(firstDateNext).toDateString();
        firstDayNext = days.indexOf(firstDayNext.substring(0, 3));
        var lastDayNext = new Date(year, month+1, 0).getDate();

        calFrame.innerHTML = '';

        renderLabel(month, year);
        renderDates(firstDayNext, lastDayNext, calFrame, currentDate, month, currMonth, year, currYear);
        dateSwitcher();
        var calendarNext = document.getElementById('curr');
        var trNext = calendarNext.getElementsByTagName('tr');
        redDay(trNext);
    });
}

/**
 * 
 * @param {HTMLTableRowElement} tr - list of rows of calendar
 */
function redDay(tr) {
    for (let index = 0; index < tr.length; index++) {
        const td = tr[index].getElementsByTagName('td');
        if(tr[index].children.length == 0){
            return false;
        }
        if (td[0].className == 'nil') {
            td[0].className = td[0].className + " " + "weekend-no-active";
        }
        else{
            td[0].className = td[0].className + " " + "weekend";
        }        
    }
}

/**
 * 
 * @param {HTMLTableRowElement} tr -  last row of calendar
 */
function nextMonthDateRendering(tr) {
    var arr = Array.prototype.slice.call( tr.getElementsByTagName('td') );
    if(arr.length == 0){
        return false;
    }

    var count = 1;
    for(var i = 0; i<=6; i++){        
        if(!tr.getElementsByTagName('td')[i]){
            var td = document.createElement('td');
            td.setAttribute('class', 'nil');
            td.innerHTML = count;            
            count++;            
            tr.appendChild(td);
        }
    }
}

/**
 * function wich execute onclick, when user select some date in table, and change color of this date by adding css class 'checked'.
 */
function dateSwitcher(){
    var table = document.getElementById('cal-frame');
    var selectedTd;
    
    table.onclick = function(event){
        var target = event.target;
        if(target.tagName != 'TD') return;

        highlight(target);       
    };


function highlight(node) {
    if (selectedTd) {
      selectedTd.classList.remove('checked');
    }
    selectedTd = node;
    selectedTd.classList.add('checked');
  }
}

/**
 * Render month and year in header of calendar
 * @param {number} month - contain information about month to render
 * @param {number} year - contain information about year to render
 */
function renderLabel(month, year) {
    var label = document.getElementById('label');

    label.innerHTML = months[month] + " " + year;
}

/**
 * Render first row wich contain names of weeks day.
 * @param {arr string} daysOfWeek - contain list names of days of week.
 * @param {HTMLElement} week - HTML element table with id 'days'.
 */
function reanderDaysOfWeek(daysOfWeek, week) {
    for(var i = 0; i <= 6; i++){
        var td = document.createElement('td');
        td.innerHTML = daysOfWeek[i];
        week.appendChild(td);
    }    
}

/**
 * 
 * @param {number} firstDay - contain the index of first day month.
 * @param {number} lastDay - contain value of the last day of month.
 * @param {HTMLElement} calFrame - contain div container with table of dates.
 * @param {number} currentDate - contain current date.
 * @param {number} month - contain index of month wich will be displayed.
 * @param {number} currMonth - contain index of current month.
 * @param {number} year - contain value of year wich will be displayed.
 * @param {number} currYear - contain value of currenr year.
 */
function renderDates(firstDay, lastDay, calFrame, currentDate, month, currMonth, year, currYear){
    var lastDayPrevM = new Date(year, month, 0).getDate();
    var table = document.createElement('table');
    table.setAttribute('id', 'curr');
    calFrame.appendChild(table);

    //crete 1 row
    var tr = document.createElement('tr');
    var i;
    var daysPrevMonth = lastDayPrevM-firstDay+1;
    for(i = 0; i<=6; i++){
        if(i == firstDay){
            break;
        }
        else{
            var td = document.createElement('td');
            td.setAttribute('class', 'nil')
            td.innerHTML = daysPrevMonth;
            tr.appendChild(td);
            
            daysPrevMonth = daysPrevMonth + 1;
        }
    }

    var count = 1;
    for(; i<=6; i++){
        var td = document.createElement('td');
        if((count == currentDate) && (month == currMonth) && (year == currYear)){
            td.setAttribute('class', 'today');
        }
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //create rest date rows
    for(var i = 2; i<=6; i++){
        var tr = document.createElement('tr');
        for(var c = 0; c <= 6; c++){
            if(count > lastDay){
                nextMonthDateRendering(tr)
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            if((count == currentDate) && (month == currMonth) && (year == currYear)){
                td.setAttribute('class', 'today');
            }
            td.innerHTML = count;
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


