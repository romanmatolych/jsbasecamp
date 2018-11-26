class Calendar {

    constructor(dateToShow) {

        this.dateToShow = dateToShow;
        this.currentDate = new Date;
    }

    getDaysArray() {

        let daysInWeek = 7;
        let weeksInGrid = 6;

        let week = [];
        let grid = [];

        let startingDate = new Date(this.dateToShow.getFullYear(), this.dateToShow.getMonth(), 1);
        let date = startingDate;

        while (date.getDay() !== 1) {

            date.setDate(date.getDate() - 1);
        }

        for (let i = 0; i < weeksInGrid; i++) {

            for (let j = 0; j < daysInWeek; j++) {

                let dayOfMonth = date.getDate();
                let isActive = false;
                let isCurrent = false;
                let isWeekend = false;

                if (date.getMonth() === this.dateToShow.getMonth()) {

                    isActive = true;
                }

                if (date.toDateString() === this.currentDate.toDateString()) {

                    isCurrent = true;
                }

                if (date.getDay() === 0 || date.getDay() === 6) {

                    isWeekend = true;
                }

                week.push(new Day(dayOfMonth, isActive, isCurrent, isWeekend));

                date.setDate(date.getDate() + 1);
            }

            grid.push(week);
            week = [];
        }

        return grid;
    }
}