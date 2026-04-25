async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    console.log("Tasks from server:", tasks);
}

// Call it immediately to test the connection
getTasks();