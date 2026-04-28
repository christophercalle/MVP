async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    
    const list = document.getElementById('taskList');
    list.innerHTML = ''; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title || "Untitled Task";
        list.appendChild(li);
    });
}

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
    getTasks(); // Refresh the list
}

// Initial load
getTasks();