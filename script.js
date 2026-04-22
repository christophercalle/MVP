// FETCH: Get all tasks and display them
async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    
    const list = document.getElementById('taskList');
    list.innerHTML = ''; 

    tasks.forEach(task => {
        console.log("Task object from DB:", task);

        const li = document.createElement('li');
        // CHANGED: Using task.title instead of task.name
        li.textContent = (task.title && task.title.trim() !== "") ? task.title : "Untitled Task";

        const taskId = task.id;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = "10px";
        
        if (taskId) {
            deleteBtn.onclick = () => deleteTask(taskId);
        }

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// CREATE: Send a new task
async function addTask() {
    const input = document.getElementById('taskInput');
    const taskTitle = input.value.trim();

    if (!taskTitle) {
        alert("Please enter a task!");
        return;
    }

    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // CHANGED: Sending "title" to match your database schema
        body: JSON.stringify({ title: taskTitle })
    });

    if (response.ok) {
        input.value = ''; 
        input.focus(); 
        getTasks(); 
    }
}

// DELETE: Remove a task
async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        getTasks(); 
    }
}

// INITIALIZE
getTasks();