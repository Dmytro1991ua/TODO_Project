const runScript = () => {
   //select elements to work with
   const time = document.querySelector(".todo__header-time");

   //add zero to a seconds and minutes
   const addZero = (num) => {
      return (parseInt(num, 10) < 10 ? "0" : "") + num;
   };

   //function to display current time
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



   //call functions
   displayTime();
};

if (document.readyState = "loading") {
   document.addEventListener("DOMContentLoaded", runScript)
} else {
   runScript();
}