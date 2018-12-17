const WEEK = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let currentDate =  new Date();
let nowDate = new Date();
let thatDay = currentDate.getDate();
currentDate.setDate(1);

let root = document.getElementById("root");
let month_year_text;
let tableLines;
let cellHeight = " 50px ";


// crete array includes all days that will show for current month
function createDateArray(currDate){
    let currentMounth = currDate.getMonth();
    let currentYear = currDate.getFullYear();
    let dayOfWeek = currDate.getDay();
    let curAmountOfDays = daysAmount(currentMounth, currentYear);
    let prevAmountOfDays = daysAmount(...toPrev(currentMounth, currentYear));
    let isCurrDate = (nowDate.getDate() === thatDay && nowDate.getMonth() === currentMounth && nowDate.getFullYear() === currentYear);
    month_year_text = `${MONTHS[currentMounth]}  ${currentYear}`;

    // create empty two-dimentional Array m x n 
    tableLines = Math.ceil((dayOfWeek + curAmountOfDays) / 7);
    let monthArr = new Array(parseInt(tableLines));
    for (let j = 0; j < monthArr.length; j++) {
        monthArr[j] = new Array(7);
    }


    // add leading not active days from previous month if they are 
    let counterPrev = prevAmountOfDays - dayOfWeek +1 ;
    for (let i = 0; i < dayOfWeek; i++){
        monthArr[0][i] = [counterPrev++, "not_active"];
    }

    // add active days and after again not_active days;
    let counterActive = 1;
    let counterNext = 1
    for (let i = 0; i < monthArr.length; i++){
        for (let j = 0; j<7; j++){

            if (!monthArr[i][j] && counterActive <=curAmountOfDays){
                if (isCurrDate && counterActive === thatDay){
                    monthArr[i][j] = [counterActive++, "today"];
                }else if(j === 0){
                    monthArr[i][j] = [counterActive++, "weekend"];
                } else{
                monthArr[i][j] = [counterActive++, "active"];
                }
            };
            
            if(!monthArr[i][j] && counterActive > curAmountOfDays ){
                monthArr[i][j] = [counterNext++, "not_active"];
            };
        };
    };
    return monthArr;
};
let monthArray = createDateArray(currentDate);


// render calendar for current month from "arr"
function drawCalendar(arr){
    root.innerHTML= '';
    root.style.gridTemplateRows = "auto auto " + `${cellHeight.repeat(tableLines)}`

    let fragment = document.createDocumentFragment();
    let btnNext = document.createElement("button");
    let btnPrev = document.createElement("button");
    let month_year = document.createElement("div");
    let nav = document.createElement("div");

    btnNext.addEventListener("click", renderNextMonth);
    btnPrev.addEventListener("click", renderPrevMonth);

    btnNext.setAttribute("id", "next");
    btnPrev.setAttribute("id", "prev");
    month_year.setAttribute("id", "month-year");
    nav.setAttribute("id", "root__nav");
    btnNext.innerText = ">";
    btnPrev.innerText = "<";
    
    month_year.innerText = month_year_text;
    nav.appendChild(btnPrev);
    nav.appendChild(month_year);
    nav.appendChild(btnNext);
    fragment.appendChild(nav);
    fragment.appendChild(createWeekDays());

    // crate cells of date 
    arr.forEach(element => {
        element.forEach(innerElement => {
            let cell = document.createElement("div");
            cell.classList.add("days")
            cell.innerText = innerElement[0];
            cell.addEventListener("click", highlight)
            switch(innerElement[1]){
                case "not_active":
                    cell.classList.add("not_active");
                    break;
                case "weekend":
                    cell.classList.add("weekend");
                    break;
                case "active":
                    cell.classList.add("active");
                    break;
                case "today":
                    cell.classList.add("today");
                    break;
            }
            fragment.appendChild(cell)
        })

    });
    root.appendChild(fragment);
}


// initial render
drawCalendar(monthArray);


// return prevoius Month from month "currentM" in year "currentY"
function toNext(currentM, currentY){
    let nextM = currentM + 1 < 12 ? currentM + 1 : 0;   
    let nextY = currentM + 1 < 12 ? currentY : currentY + 1;
    return [nextM, nextY];
}


// return next Month from month "currentM" in year "currentY"
function toPrev(currentM, currentY){
    let prevM = currentM - 1 > -1 ? currentM - 1 : 11;
    let prevY = currentM - 1 > -1 ? currentY : currentY - 1;
    return [prevM, prevY];
}


// calculate days amount for month "m" and year "y"
function daysAmount(m, y){
    return 32 - new Date(y, m, 32).getDate();
}


// render click of  "next" button  - ">"
function renderNextMonth(){
    let newM = currentDate.getMonth();
    let newY = currentDate.getFullYear();
    let [m, y] = toNext(newM, newY);
    currentDate = new Date(y, m, 1);
    drawCalendar(createDateArray(currentDate));
};


// render click of "prev" button  - "<"
function renderPrevMonth(){
    let newM = currentDate.getMonth();
    let newY = currentDate.getFullYear();
    let [m, y] = toPrev(newM, newY);
    currentDate = new Date(y, m, 1);
    drawCalendar(createDateArray(currentDate));
};


// render highlight
function highlight(e){
    e.target.classList.toggle("highlight");
}


// create week elements
function createWeekDays(){
    let week_fragment = document.createDocumentFragment();
    WEEK.forEach(elem => {
        let week_day = document.createElement("div");
        week_day.classList.add("days-of-week");
        week_day.innerText = elem;
        week_fragment.appendChild(week_day);
    });
    return week_fragment
}