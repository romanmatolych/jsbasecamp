class Calendar {
    /**
     * @param  {String} elemID - Calendar container ID
     */
    constructor(elemID) {

        this.elemID = elemID;
        /**
         * Week days
         */
        this.weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        /**
         * Months
         */
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        /**
         * Set the current date
         */
        let date = new Date();

        this.currentDay = date.getDate();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();

        /**
         * Create table, which contains all date elements
         */
        this.table = document.createElement('table');
    }
    /**
     * Show current month
     */
    showCurrent() {
        this.showMonth(this.currentYear, this.currentMonth, this.currentDay);
    }
    /**
     * Goes to next month
     */
    nextMonth() {
        if (this.currentMonth == 11) {
            this.currentMonth = 0;
            this.currentYear += 1;
        } else {
            this.currentMonth += 1;
        }
        this.showCurrent();
    }
    /**
     * Goes to previous month
     */
    prevMonth() {
        if (this.currentMonth == 0) {
            this.currentMonth = 11;
            this.currentYear -= 1;
        } else {
            this.currentMonth -= 1;
        }
        this.showCurrent();
    }
    /**
     * @param  {Number} y - current year
     * @param  {Number} m - current month
     * @param  {Number} d - current day
     */
    showMonth(y, m, d) {
        let firstMonthDay = new Date(y, m, 1).getDay(), // first day of the month
            lastMonthDay = new Date(y, m + 1, 0).getDate(), // number of the day current month
            lastDayLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() + 1 : new Date(y, m, 0).getDate(); //number of the day previous month 

        let self = this;
        this.table.id = 'table';
       
        let content = ''; // Content of the table
        /**
         * Write selected month and year(title of the calendar)
         */
        function writeTitle() {
            content += `
            <thead>
                <tr>
                    <td class='title-calendar' colspan="7">
                    ${self.months[m]} ${y}
                    </td>
                </tr>
            </thead>
            <tr class="days">
            `;
            /**
             * Write name of week days
             */
            self.weekDays.forEach(item => {
                content += `
                    <td class='days'>
                        ${item}
                    </td>
                `;
            });

            content += '</tr>';
        }
        writeTitle();
        /**
         * Write the days
         */
        let i = 1;
        do {
            let dateOfWeek = new Date(y, m, i).getDay(); // Get number of week days

            daysBefore();
            daysCurrent(y, m, d);
            daysAfter();

            /************ Functions ******************/
            /**
             * @returns - Cells of days before current month
             */
            function daysBefore() {
                /**
                 * If Sunday, create new row
                 */
                if (dateOfWeek == 0) {
                    content += '<tr>';
                    /** 
                     * If not Sunday, but first day of the month, it will write the last days from previous month
                     */
                } else if (i == 1) {
                    content += '<tr>';
                    let remainingDays = lastDayLastMonth - firstMonthDay + 1;

                    for (let j = 0; j < firstMonthDay; j++) {
                        if (j == 0) {
                            content += `<td class='not-current weekEnd'>${remainingDays}</td>`;
                        } else {
                            content += `<td class='not-current'>${remainingDays}</td>`;
                        }

                        remainingDays++;
                    }
                }
            }
            // Write the current day
            /**
             * @param  {Number} y - current year
             * @param  {Number} m - current month
             * @param  {Number} d - current day
             * @returns - Cells of days current month
             */
            function daysCurrent(y, m, d) {
                let dateNow = new Date();
                let dateNowYear = dateNow.getFullYear();
                let dateNowMonth = dateNow.getMonth();

                if (dateNowYear == y && dateNowMonth == m && i == d) {
                    content += `<td class='today'>${i}</td>`;
                } else if (dateOfWeek == 0 || dateOfWeek == 6) {
                    content += `<td class='normal weekEnd'>${i}</td>`;
                } else {
                    content += `<td class='normal'>${i}</td>`;
                }
            }
            /**
             * @returns - Cells of days after current month
             */
            function daysAfter() {
                // If end of week, close the row
                if (dateOfWeek == 6) {
                    content += '</tr>';
                }
                // If not Saturday, but last day of the selected month, it will write the next few days from next month
                else if (i == lastMonthDay) {
                    let k = 1;
                    for (dateOfWeek; dateOfWeek < 6; dateOfWeek++) {
                        if (dateOfWeek == 5) {
                            content += `<td class='not-current weekEnd'>${k}</td>`;
                        } else {
                            content += `<td class='not-current'>${k}</td>`;
                        }
                        k++;
                    }
                }
            }
            i++;
        } while (i <= lastMonthDay);

        this.table.innerHTML = content;

        getId(this.elemID).appendChild(this.table);  // Insert HTML to purpose element

    }
}

window.onload = function () {
    let calendar = new Calendar('calendar'),
        next = getId('next'),
        prev = getId('prev');

    calendar.showCurrent();

    next.onclick = function () {
        calendar.nextMonth();
    };

    prev.onclick = function () {
        calendar.prevMonth();
    }
    let table = getId('table');
    /**
     * Set active class to selected cell
     */
    table.addEventListener('click', (e) => {
        deselectAll(table);
        let target = e.target;
        if (target.classList.contains('normal') || target.classList.contains('today')) {
            target.classList.add('active');
        }
    });

}
/**
 * @param  {String} id - ID of the DOM element
 * @returns - DOM element
 */
function getId(id) {
    return document.getElementById(id);
}
/**
 * @param  {Object} table - DOM element
 * @returns - Cells of the @table without selected class
 */
function deselectAll(table) {
    for (var r = 0; r < table.rows.length; r++) {
        for (var c = 0; c < table.rows[r].cells.length; c++) {
            if (table.rows[r].cells[c].classList.contains('active')) {
                table.rows[r].cells[c].classList.remove('active')
            }
        }
    }
}
