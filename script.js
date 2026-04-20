// FETCH: Get all tasks from the database and display them
async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    
    const list = document.getElementById('taskList');
    list.innerHTML = ''; // Clear the list before redrawing to prevent duplicates

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;
        list.appendChild(li);
    });
}

// CREATE: Send a new task to the server
async function addTask() {
    const input = document.getElementById('taskInput');
    const taskName = input.value;

    if (!taskName) return; // Prevent empty tasks

    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName })
    });

    if (response.ok) {
        input.value = ''; // Clear the input field
        console.log("Task added!");
        getTasks(); // Refresh the list so the new task appears immediately
    }
}

// INITIALIZE: Load the tasks as soon as the page opens
getTasks();