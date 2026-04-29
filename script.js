// FETCH: Read all tasks from the server
async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    
    const list = document.getElementById('taskList');
    list.innerHTML = ''; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.style.marginLeft = '10px';
        editBtn.onclick = () => editTask(task.id, task.title);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// POST: Send a new task to the server with validation
async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();

    // Prevent empty tasks
    if (!title) {
        alert("Please enter a task title.");
        return;
    }

    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    input.value = '';
    getTasks(); 
}

// PUT: Edit a task
async function editTask(id, currentTitle) {
    const newTitle = prompt("Edit task:", currentTitle);
    if (!newTitle || newTitle === currentTitle) return;

    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
    });
    getTasks();
}

// DELETE: Remove a task by ID
async function deleteTask(id) {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    });
    getTasks(); 
}

// INITIALIZE
getTasks();