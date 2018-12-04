const WEEKS = 6; //weeks in showed calendar
const DAYS = 7; //days in the week

Date.prototype.monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};

// Class which will create a table with array Calendar 
class Calendar {
    /**
    * Creating Calendar
    * @param {tbody} tbodyToDisplay - Element (tag tbody), where callendar will show
    */
    constructor (tbodyToDisplay) {
    this.currentDate = new Date();
    this.displayedDate = new Date(this.currentDate);
    this.parentTbody = tbodyToDisplay;
    this.updateCalendar();
    }
    
    // switches the previous or next months of the calendar
    prevMonth() {
        this.displayedDate.setMonth(this.displayedDate.getMonth() - 1);
        this.updateCalendar();
    }
    nextMonth() {
        this.displayedDate.setMonth(this.displayedDate.getMonth() + 1);
        this.updateCalendar();
    }
      
    // updating the calendar
    updateCalendar() {
        var tbody = this.parentTbody;
        var table = tbody.parentNode;
        table.removeChild(tbody);
        
        var updatedTbody = document.createElement('tbody');
        var nodeList = this.creatingNodes();
      
        for (var node of nodeList) {
            updatedTbody.appendChild(node);
        }
        table.appendChild(updatedTbody);
        this.parentTbody = updatedTbody;
    }
     
    /**
    * creating nodes for updatedTbody of Calendar
    * @returns {Array} calendar body size 6 * 7;
    */
   creatingNodes() {
        var currentDate = this.currentDate;
        var displayedMonth = this.displayedDate.getMonth();
        var displayedYear = this.displayedDate.getFullYear();
        var counter = new Date(displayedYear,displayedMonth);
        counter.setDate(counter.getDate()-counter.getDay()); //setting date counter to zero position
        var NodeList = [];
            for(var i = 0; i < WEEKS; i++) {
                var tr = document.createElement('tr');
                tr.className = "namesOfDays"; 
                for(var j = 0; j < DAYS; j++) {
                    var td = document.createElement("td");
                    td.className = "day";
                    td.textContent = counter.getDate();
                    if(counter.getMonth() == displayedMonth) {                
                        td.classList.add('displayedMonth');// days of displayedMonth
                        //selecting day and remoming old selections
                        td.onclick = function() { 
                            var selectedDay = document.querySelector(".selected");
                            if(selectedDay) {
                                selectedDay.classList.remove('selected'); 
                            }
                            this.classList.add("selected");
                            }
                    }
                    if(counter.getDay() == 0 || counter.getDay() == 6) {
                        td.classList.add('weekends');
                    }           
                    if(counter.getFullYear() == currentDate.getFullYear() && counter.getMonth() == currentDate.getMonth() && counter.getDate() == currentDate.getDate()) {
                        td.classList.add('currentDay');
                    }                        
                        tr.appendChild(td);
                        counter.setDate(counter.getDate() + 1);
                    }
                        NodeList.push(tr);
                    }
                return NodeList;
            }
}

var tbody = document.querySelector("#calendar tbody");
var calendar = new Calendar(tbody); 
document.querySelector('#monthYear').textContent = calendar.currentDate.getMonthName() + " " + calendar.currentDate.getFullYear(); //show current month&year in headline

function prevBtn() {
    var headlineDate = calendar.displayedDate;
    calendar.prevMonth();
    document.querySelector('#monthYear').textContent = headlineDate.getMonthName() + " " + headlineDate.getFullYear();
}
function nextBtn() {
    var headlineDate = calendar.displayedDate;
    calendar.nextMonth();
    document.querySelector('#monthYear').textContent = headlineDate.getMonthName() + " " + headlineDate.getFullYear();
}