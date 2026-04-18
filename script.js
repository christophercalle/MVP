async function addTask() {
    const input = document.getElementById('taskInput');
    const taskName = input.value;

    if (!taskName) return; 

    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName })
    });

    if (response.ok) {
        input.value = ''; 
        console.log("Task added!");
    }
}