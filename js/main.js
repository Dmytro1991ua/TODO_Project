const runScript = () => {
   
   //select elements to work with
   const time = document.querySelector(".todo__header-time");
   const date = document.querySelector('.todo__header-date');
   

   //add zero to a seconds and minutes
   const addZero = (num) => {
      return (parseInt(num, 10) < 10 ? "0" : "") + num;
   };

   // display current time
   const displayTime = () => {
      let today = new Date(),
         hours = today.getHours(),
         minutes = today.getMinutes(),
         seconds = today.getSeconds();
      const showAmPm = true;

      const amPm = hours >= 12 ? "PM" : "AM"; //figure either it is AM or PM
      hours = hours % 12 || hours;// getting a 12 hours format
      time.innerHTML = `${hours}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)} ${showAmPm ? amPm : ""}`;  //display time on a screen

      setTimeout(displayTime, 1000);
   };

   // display current date
   const displayDate = () => {
      const dateToday = new Date();
      const options = {
         weekday: 'long',
         year: "numeric",
         month: 'short',
         day: 'numeric',
      };
      date.textContent = dateToday.toLocaleDateString("en-US", options); // convert the date (date object) into a readable string, using locale conventions
   };
   

   //call functions
   displayTime();
   displayDate();
};

if (document.readyState = "loading") {
   document.addEventListener("DOMContentLoaded", runScript)
} else {
   runScript();
}