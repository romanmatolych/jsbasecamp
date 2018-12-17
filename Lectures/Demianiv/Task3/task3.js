'use strict';

Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function () {
    return this.getMonthName().substr(0, 3);
};



const WEEKS_COUNT=6;//weeks shown in calendar
const DAYS_COUNT=7;//days in week



/** Class representing a Calendar. */
class Calendar{
     /**
     * Creates a Calendar.
     * @param {tbody} tbodyToDisplay - Element with tagName tbody,where callendar will be displayed.
     */
    constructor(tbodyToDisplay){
    this.currentDate=new Date();
    this.displayedDate=new Date(this.currentDate);
    this.parentTbody=tbodyToDisplay;
    this.refresh();
    }
    
    /**
     * switches the next month of the calendar
     */
    nextMonth(){
        this.displayedDate.setMonth(this.displayedDate.getMonth()+1);
        this.refresh();
    }
     /**
     * switches the previous month of the calendar
     */
    previousMonth(){
        this.displayedDate.setMonth(this.displayedDate.getMonth()-1);
        this.refresh();
    }
    
    
     /**
     * refreshes calendar , removes old tbody and creates new
     */
    refresh(){
        let tbody=this.parentTbody;
        let table=tbody.parentNode;
        table.removeChild(tbody);
        
        let newtbody=document.createElement('tbody');

        let nodeList=this.createCalendarNodes();
      
        for (let node of nodeList){
            newtbody.appendChild(node);
        }
        table.appendChild(newtbody);
        this.parentTbody=newtbody;
    }

    
    /**
     * creates nodes for calendar
     * @returns {Array} which contains 6 tr nodes filled with tds;
     */
    createCalendarNodes(){
     let currentDate=this.currentDate;
     let displayedMonth=this.displayedDate.getMonth();
     let displayedYear=this.displayedDate.getFullYear();

     let dateIterator=new Date(displayedYear,displayedMonth);
     dateIterator.setDate(dateIterator.getDate()-dateIterator.getDay());//setting date iterator to star of first week position

     let NodeList=[];
     for(let i=0;i<WEEKS_COUNT;i++){
         let tr=document.createElement('tr');
         tr.className="daysRow"; 
         for(let j=0;j<DAYS_COUNT;j++){
             let td=document.createElement("td");
             td.className="day";
             td.textContent=dateIterator.getDate();
             if(dateIterator.getMonth()==displayedMonth){
                
                td.classList.add('displayedMonth');// days of displayedMonth
                td.onclick=function(){//selects day
                    let selectedDay=document.querySelector(".selected");
                    if(selectedDay){
                        selectedDay.classList.remove('selected');//remove old selection
                    }
             
                    this.classList.add("selected");
                }
               
             }

             if(dateIterator.getDay()==0){
                td.classList.add('weekend');
            }
           
             if(dateIterator.getFullYear()==currentDate.getFullYear()
                &&dateIterator.getMonth()==currentDate.getMonth()
                &&dateIterator.getDate()==currentDate.getDate()){
                 td.classList.add('currentDay');
             }                        
             tr.appendChild(td);
             dateIterator.setDate(dateIterator.getDate()+1);
         }
         NodeList.push(tr);
     }

     return NodeList;
    }
}


let tbody=document.querySelector("#calendar tbody");
let calendar=new Calendar(tbody);//creating calendar

document.querySelector('#calendarInfo').textContent=calendar.currentDate.getMonthName()+
' '+calendar.currentDate.getFullYear().toString();//displaying current month and year

document.querySelector('#prevButton').onclick=function(){
    let date=calendar.displayedDate;
    
    calendar.previousMonth();
    document.querySelector('#calendarInfo').textContent=date.getMonthName()+' '+date.getFullYear().toString();
   
}
document.querySelector('#nextButton').onclick=function(){
    let date=calendar.displayedDate;
    calendar.nextMonth();
    document.querySelector('#calendarInfo').textContent=date.getMonthName()+' '+date.getFullYear().toString();
   
}
      
