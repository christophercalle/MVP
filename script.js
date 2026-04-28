// FETCH: Read all tasks from the server
async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    
    const list = document.getElementById('taskList');
    list.innerHTML = ''; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;

        // Create a delete button for each task
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// POST: Send a new task to the server
async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();

    if (!title) return;

    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    input.value = '';
    getTasks(); // Refresh the UI
}

// DELETE: Remove a task by ID
async function deleteTask(id) {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    });
    getTasks(); // Refresh the UI
}

// INITIALIZE: Load tasks when the page opens
getTasks();