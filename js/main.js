const runScript = () => {

   //select elements to work with
   const time = document.querySelector(".todo__header-time"),
      date = document.querySelector('.todo__header-date'),
      addTodoInput = document.querySelector(".todos__add-field-input"),
      addTodoBtn = document.querySelector(".todos__add-field-btn"),
      todoList = document.querySelector(".todo__list"),
      todoFilter = document.querySelector(".todo__filter");


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
                   <div>
                     <i class="todo__item-icon todo__item-icon--colored toggle fas fa-check-circle"></i>
                   </div>
                   <p class="todo__item-text">${addTodoInput.value}</p>
                   <svg class="todo__item-icon todo__item-icon--trash-bin">
                         <use xlink:href="iconsprite/symbol-defs.svg#icon-trash-o"></use>
                   </svg >
                </li >`;

         const position = "beforeend";

         todoList.insertAdjacentHTML(position, html);

      };
      addTodoInput.value = "";
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
   };

   // check todo item and toggle checked and unchecked icon
   const checkTodo = (event) => {
      const target = event.target;

      if (target.matches(".fa-check-circle")) {
         const todo = target.parentElement.parentElement; // get <li> parent
         todo.classList.toggle("crossed");
      }
   };

   // toggle conpleated todo items

   const toggleCompleated = (event) => {
      const target = event.target.value; // grab a specific value of clicked option
      const todoItems = Array.from(todoList.children); // grab all todo items

      todoItems.forEach(todo => {
         switch (target) {
            case "all":
               todo.style.display = "flex";
               break;
            case "completed":
               if (todo.classList.contains("crossed")) {
                  todo.style.display = "flex";
               } else {
                  todo.style.display = "none";
               }
               break;
            case "uncompleted":
               if (!todo.classList.contains("crossed")) {
                  todo.style.display = "flex";
               } else {
                  todo.style.display = "none";
               }
               break;
         }
      });
   };


   // Event listener
   addTodoInput.addEventListener("keydown", addTodoKeyPress); // add new todo when we press Enter
   addTodoBtn.addEventListener("click", addTodo);
   todoList.addEventListener("click", deleteTodo);
   todoList.addEventListener("click", checkTodo);
   todoFilter.addEventListener("click", toggleCompleated);

   //call functions
   displayTime();
   displayDate();
};

if (document.readyState = "loading") {
   document.addEventListener("DOMContentLoaded", runScript)
} else {
   runScript();
}