
let timer = $('#current-day');

$(function () {
  let timer = $('#currentDay');
  let rowEl = $(".row");
  let container = $(".container-lg")
  
  let savedEvent = JSON.parse(localStorage.getItem('ScheculeEvent'));
  console.log(savedEvent);
  rowEl.on('click','.saveBtn',saveSchedule )

  //save tasks to the local config
  function saveSchedule(){
    
    let selectedRow = $(this).parent().attr('id');
    console.log(selectedRow);
    
    let task = $(this).siblings('.description').val().trim();
    console.log(task);
    let newEvent = selectedRow + '--' + task;
    if( savedEvent == null){ //if no local storage found, replace with empty array and add new event
      savedEvent = [];
      
    }else{ // else, loop through array and check for existing event at this time
      for (let index = 0; index < savedEvent.length; index++) {
        let savedEventrow = savedEvent[index].split('--');
        console.log(savedEventrow[0]);
        
        if(savedEventrow[0] == selectedRow ){// if found remove the event from array
          console.log('existing event found in index '+ index)
          savedEvent.splice(index, 1);
        }                             
      }
    }
    savedEvent.push(newEvent); 
    localStorage.setItem('ScheculeEvent', JSON.stringify(savedEvent));
  }


  //update the rows color depending on the time, past grey, present red future green
  function updateColor(hour){
    let rowChildren = container.children('.row');
    
    for (let index = 0; index < rowChildren.length; index++) {
      let elToArray = rowChildren[index].id.split('-'); // take the row id, remove the 'hour' 
      let parsedTime = parseInt(elToArray[1]); // parsed from string to int
      

      if(parsedTime < hour){
        $(rowChildren[index]).addClass('past');
      }else if(parsedTime == hour){
        $(rowChildren[index]).addClass('present');
      }else{
        $(rowChildren[index]).addClass('future');
      }
      
    }
  }

  //retrieve the event from the local storage and add them to the correct row
   function retrieveSchedule(){
    console.log('inside the retrievingSchedule')
    
    if(savedEvent !== null){
      for (let index = 0; index < savedEvent.length; index++) {
        let hourArray = savedEvent[index].split('--');
        let row = '#'+ hourArray[0];        //Get the ID from the stored event then  add # and use it as Id.
        console.log(row);
        let task = hourArray[1];
        console.log(task);
        $(row).children('.description').val(task);
        
      }
    }
  }
  
  //display time at the top of page
  function displayTime(){
    timer.text(dayjs().format('ddd MMM YYYY - h:mma'));
  }

  setInterval(() => {
    displayTime();
  }, 1000);

  retrieveSchedule();

  let currentHour = parseInt(dayjs().format('H')); //set the current hour 
  console.log('Current hour is '+ currentHour);

  updateColor(13); // to test function over time simply replace the 'currentHour' by a time of your choice (24h system)
                            //ie: 14 for 2pm

  


  
  
  
});

