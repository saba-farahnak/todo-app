document.addEventListener('DOMContentLoaded', function() {
    getTasks();
});

function getTasks() {
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `${task.content} <button onclick="deleteTask(${task.id})">Delete</button>`;
            taskList.appendChild(li);
        });
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const content = taskInput.value.trim();
    if (content !== '') {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: content })
        })
        .then(response => response.json())
        .then(data => {
            taskInput.value = '';
            getTasks();
        });
    }
}

function deleteTask(id) {
    fetch(`/tasks/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        getTasks();
    });
}
