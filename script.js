async function getTasks() {

const response = await fetch('http://localhost:3000/tasks');

const tasks = await response.json();


const list = document.getElementById('taskList');

list.innerHTML = ''; // Clear the list before rebuilding



tasks.forEach(task => {

const li = document.createElement('li');

li.textContent = task.title || "Untitled Task"; // Use title from DB schema

list.appendChild(li);

});

}



// Call it immediately to test the connection

getTasks();