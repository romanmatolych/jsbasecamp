var createCalendar = function(ident) {

    this.ident = ident;
    this.daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Set the current month, year
    var date = new Date();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    this.currentDay = date.getDate();
};

// Goes to next month
createCalendar.prototype.nextMonth = function() {
    if (this.currentMonth == 11) {
        this.currentMonth = 0;
        this.currentYear = this.currentYear + 1;
    } else {
        this.currentMonth = this.currentMonth + 1;
    }
    return this.showCurrent();
};

// Goes to previous month
createCalendar.prototype.prevMonth = function() {
    if (this.currentMonth == 0) {
        this.currentMonth = 11;
        this.currentYear = this.currentYear - 1;
    } else {
        this.currentMonth = this.currentMonth - 1;
    }
    return this.showCurrent();
};

// Show current month
createCalendar.prototype.showCurrent = function() {
    this.showMonth(this.currentYear, this.currentMonth);
};

// Show month (year, month)
createCalendar.prototype.showMonth = function(year, month) {
    var date = new Date(),
        firstDayOfMonth = new Date(year, month, 1).getDay(),
        lastDayOfMonth = new Date(year, month + 1, 0).getDate(),
        lastDayOfLastMonth = month == 0 ? new Date(year - 1, 11, 0).getDate() : new Date(year, month, 0).getDate();

    var htmlTable = "<table>";

    htmlTable += "<thead><tr>";
    htmlTable += "<td class='titleMonth'  colspan='7'>" + this.Months[month] + " " + year + "</td>";
    htmlTable += "</tr></thead>";
    htmlTable += "<tr class='days'>";

    for (var i = 0; i < this.daysOfWeek.length; i++) {
        htmlTable += "<td>" + this.daysOfWeek[i] + "</td>";
    }

    htmlTable += "</tr>";

    // Write the days
    var i = 1;
    do { var dayWeek = new Date(year, month, i).getDay();

        // If Sunday, start new row
        if (dayWeek == 0) {
            htmlTable += "<tr>";
        }
        // If not Sunday but first day of the month, it will write the last days from the previous month
        else if (i == 1) {
            htmlTable += "<tr>";
            var notCurrDaysPrevM = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                htmlTable += "<td class='not-current'>" + notCurrDaysPrevM + "</td>";
                notCurrDaysPrevM++;
            }
        }

        // Write the current day in the loop
        var today = new Date();
        var todayYear = today.getFullYear();
        var todayMonth = today.getMonth();

        if (todayYear == this.currentYear && todayMonth == this.currentMonth && i == this.currentDay) {
            htmlTable += "<td class='today'>" + i + "<br>" + "<b class='todayWord'>today<b>" + "</td>";
        } else {
            htmlTable += "<td id='normalCell' onclick='changeCellColor(event)' class='normal'>" + i + "</td>";
        }
        // If Saturday, closes the row
        if (dayWeek == 6) {
            htmlTable += "</tr>";
        }
        // If not Saturday, but last day of the selected month, it will write the next few days from the next month
        else if (i == lastDayOfMonth) {
            var notCurrDaysNextM = 1;
            for (dayWeek; dayWeek < 6; dayWeek++) {
                htmlTable += "<td class='not-current'>" + notCurrDaysNextM + "</td>";
                notCurrDaysNextM++;
            }
        }
        i++;

    } while (i <= lastDayOfMonth);

    htmlTable += "</table>";
    document.getElementById(this.ident).innerHTML = htmlTable;
};

function changeCellColor(e) {
    var evt = window.event || e,
        obj = evt.srcElement || evt.target;
    if (obj.tagName == "TABLE") return;
    while (obj.tagName != "TD") obj = obj.parentNode;
    if (self.ActiveCell) ActiveCell.style.background = "";
    ActiveCell = obj;
    ActiveCell.style.background = "#c3d4d6";
}

window.onload = function() {

    var start = new createCalendar("idCalendar");
    start.showCurrent();

    getId("nextButton").onclick = function() {
        start.nextMonth();
    };
    getId("prevButton").onclick = function() {
        start.prevMonth();

    var trg = document.getElementById("normalCell")
    if (document.addEventListener) trg.addEventListener("click", changeCellColor);
    else if (document.attachEvent) trg.attachEvent("onclick", changeCellColor);
    else trg.onclick = changeCellColor;
    };
}

function getId(id) {
    return document.getElementById(id);
}