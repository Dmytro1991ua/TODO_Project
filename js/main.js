const runScript = () => {

   //select elements to work with
   const time = document.querySelector(".todo__header-time"),
      date = document.querySelector('.todo__header-date'),
      addTodoInput = document.querySelector(".todos__add-field-input"),
      addTodoBtn = document.querySelector(".todos__add-field-btn"),
      todoList = document.querySelector(".todo__list");

   // todoCheckedBtn = document.querySelector(".todo__item-icon--colored"),
   //todoTrashBinBtn = document.querySelector(".todo__item-icon--trash-bin");

   let todos = [];

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

   // add todo
   const addTodo = () => {
      if (addTodoInput.value) { // add new item only if there is a value inside <input>
         const html = `
                <li class="todo__item">
                   <svg class="todo__item-icon todo__item-icon--unchecked">
                         <use xlink:href="iconsprite/symbol-defs.svg#icon-radio-unchecked"></use>
                   </svg>
                   <svg class="todo__item-icon todo__item-icon--colored hide">
                         <use xlink:href="iconsprite/symbol-defs.svg#icon-check-circle"></use>
                   </svg >
                   <p class="todo__item-text">${addTodoInput.value}</p>
                   <svg class="todo__item-icon todo__item-icon--trash-bin">
                         <use xlink:href="iconsprite/symbol-defs.svg#icon-trash-o"></use>
                   </svg >
                </li >`;

         const position = "beforeend";

         todoList.insertAdjacentHTML(position, html);

      };
      addTodoInput.value = "";

      //create <li>
      /* const li = document.createElement("li");
       li.classList.add("todo__item")
 
       // create unchecked btn
       const btnUnchecked = document.createElement("svg");
       btnUnchecked.classList.add("todo__item-icon", "todo__item-icon--unchecked")
       btnUnchecked.innerHTML = `<use xlink:href="iconsprite/symbol-defs.svg#icon-radio-unchecked"></use>`
       li.appendChild(btnUnchecked);
 
       //create checked btn
       const btnChecked = document.createElement("svg");
       btnChecked.classList.add("todo__item-icon", "todo__item-icon--colored", "hide");
       btnChecked.innerHTML = `<use xlink:href="iconsprite/symbol-defs.svg#icon-check-circle"></use>`;
       li.appendChild(btnChecked);
 
       // create <p>
       const todoText = document.createElement("p");
       todoText.classList.add("todo__item-text");
       todoText.innerHTML = addTodoInput.value;
       li.appendChild(todoText);
 
       // create trash btn
       const btnTrash = document.createElement("svg");
       btnTrash.classList.add("todo__item-icon", "todo__item-icon--trash-bin");
       btnTrash.innerHTML = `<use xlink:href="iconsprite/symbol-defs.svg#icon-trash-o"></use>`;
       li.appendChild(btnTrash);
 
       //append <li> to <ul>
       todoList.appendChild(li);
 
 
       console.log(todoList); */
   };

   // add todo when we press Enter key
   const addTodoKeyPress = (event) => {

      if (event.code === "Enter") {
         const addInputValue = addTodoInput.value; // store a value of add input input

         if (addInputValue) {
            addTodo(addInputValue);
         }
         addTodoInput.value = ""; // clear input field when a Enter is pressed
      }
   };

   //delete Todo item
   const deleteTodo = (event) => {
      const target = event.target;

      if (target.matches(".todo__item-icon--trash-bin")) {
         const li = target.parentElement;
         //add animation while deleting totdo item
         li.classList.add("animated");
         li.addEventListener("transitionend", () => { // completely remove a todo item when animation is compleated
            li.remove();
         }); 
      }
   }


   // Event listener
   addTodoInput.addEventListener("keydown", addTodoKeyPress); // add new todo when we press Enter
   addTodoBtn.addEventListener("click", addTodo);
   todoList.addEventListener("click", deleteTodo);

   //call functions
   displayTime();
   displayDate();
};

if (document.readyState = "loading") {
   document.addEventListener("DOMContentLoaded", runScript)
} else {
   runScript();
}