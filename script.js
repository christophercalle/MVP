// FETCH: Get all tasks and display them
async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    
    const list = document.getElementById('taskList');
    list.innerHTML = ''; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        // Handle empty names from the database
        li.textContent = (task.name && task.name.trim() !== "") ? task.name : "Untitled Task";

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// CREATE: Send a new task
async function addTask() {
    const input = document.getElementById('taskInput');
    const taskName = input.value.trim(); // Clean up whitespace

    if (!taskName) {
        alert("Please enter a task!");
        return;
    }

    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName })
    });

    if (response.ok) {
        input.value = ''; 
        input.focus(); // Keep the cursor ready for the next task
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