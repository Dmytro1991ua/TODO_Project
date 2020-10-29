const runScript = () => {

   //select elements to work with
   const time = document.querySelector(".todo__header-time"),
      date = document.querySelector('.todo__header-date'),
      addTodoInput = document.querySelector(".todos__add-field-input"),
      addTodoBtn = document.querySelector(".todos__add-field-btn"),
      todoList = document.querySelector(".todo__list"),
      todoFilter = document.querySelector(".todo__filter"),
      todoToggleAll = document.querySelector(".todo__toggle-todo-label"),
      clearStorage = document.querySelector(".todo__header-icon");


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

         saveLocalTodos(addTodoInput.value); // add todo item(value of add todo input) to a local storage
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

   // toggle all todo items
   const toggleAll = () => {

      for (const todo of todoList.children) { // iterate over all <li> (todo items)
         if (!todo.matches(".crossed")) {
            todo.classList.add("crossed");
         } else {
            todo.classList.remove("crossed");
         }
         /*if (!todo.matches(".crossed")) { // if todo item isn't completed (doesn't have class ".crossed") then apply this class to all elements
            for (const todo of todoList.children) {
               todo.classList.add("crossed");
            }
         } else {
            for (const todo of todoList.children) { //remove class ".crossed" from all elements
               todo.classList.remove("crossed");
            }
         }*/
      }

   };

   // check whether there is a data in LocalStorageor not
   const checkLocalStorage = () => {
      let todos;
      // check if there is data in localStorage
      if (localStorage.getItem("todos") === null) { // if there is not any data in localStorage then we create an aempty array
         todos = [];
      } else { // if there is some data then convert from JSON text to Object  
         todos = JSON.parse(localStorage.getItem("todos"));
      }
   };

   // save toto item to a localStorage
   function saveLocalTodos(todo) {

      checkLocalStorage();

      todos.push(todo); // push addTodoInput.value (new input value) in to array

      localStorage.setItem("todos", JSON.stringify(todos)); // convert value from input to JSON format and store in localStorage
   }

   // update saved items from a LocalStorage on UI
   const updateStorageData = () => {

      if (localStorage.getItem("todos") === null) { // if there is not any data in localStorage then we create an aempty array
         todos = [];
      } else { // if there is some data then convert from JSON text to Object  
         todos = JSON.parse(localStorage.getItem("todos"));
      }

      todos.forEach(todo => { // todo refers to a value from a localStorage
         const html = `
                <li class="todo__item">
                   <div>
                     <i class="todo__item-icon todo__item-icon--colored toggle fas fa-check-circle"></i>
                   </div>
                   <p class="todo__item-text">${todo}</p>
                   <svg class="todo__item-icon todo__item-icon--trash-bin">
                         <use xlink:href="iconsprite/symbol-defs.svg#icon-trash-o"></use>
                   </svg >
                </li >`;

         const position = "beforeend";

         todoList.insertAdjacentHTML(position, html);
      });
   }

   // clear all items from a localStorage and reload the page
   const clearLocalStorage = () => {
      localStorage.clear();
      location.reload(); // reload the current URL
   };


   // Event listener
   addTodoInput.addEventListener("keydown", addTodoKeyPress); // add new todo when we press Enter
   addTodoBtn.addEventListener("click", addTodo);
   todoList.addEventListener("click", deleteTodo);
   todoList.addEventListener("click", checkTodo);
   todoFilter.addEventListener("click", toggleCompleated);
   todoToggleAll.addEventListener("click", toggleAll);
   clearStorage.addEventListener("click", clearLocalStorage);

   //call functions
   displayTime();
   displayDate();
   updateStorageData();
};

if (document.readyState = "loading") {
   document.addEventListener("DOMContentLoaded", runScript)
} else {
   runScript();
}