document.addEventListener('DOMContentLoaded', function() {
    getTasks();
});

function getTasks() {
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        renderTasks(tasks);
    });
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        const createdTime = new Date(task.created_at).toLocaleString();
        console.log(task.created_at)

        li.innerHTML = `
            <span>${task.content}</span>
            <span>: ${createdTime}</span>
            <button onclick="toggleTaskStatus(${task.id}, ${task.is_done})">${task.is_done ? 'Undone' : 'Done'}</button>
            <button onclick="showUpdateForm(${task.id}, '${task.content}')">Update</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        if (task.is_done) {
            li.classList.add('done');
        }
        taskList.appendChild(li);
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

function toggleTaskStatus(id, isDone) {
    const updatedStatus = !isDone;
    fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_done: updatedStatus })
    })
    .then(response => response.json())
    .then(data => {
        getTasks();
    });
}

function sortTasks() {
    const sortBy = document.getElementById('sortBy').value;
    const sortDir = document.getElementById('sortDir').value; // Get selected sorting direction
    fetch(`/tasks?sort_by=${sortBy}&sort_dir=${sortDir}`) // Pass sort_dir to the backend
    .then(response => response.json())
    .then(tasks => {
        renderTasks(tasks);
    });
}

function searchTasks() {
    const keyword = document.getElementById('searchKeyword').value.trim();
    if (keyword !== '') {
        fetch(`/tasks?keyword=${keyword}`)
        .then(response => response.json())
        .then(tasks => {
            renderTasks(tasks);
        });
    } else {
        getTasks();
    }
}

function showUpdateForm(id, content) {
    const newContent = prompt('Enter updated content:', content);
    if (newContent !== null) {
        updateTask(id, newContent);
    }
}

function updateTask(id, content) {
    fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content })
    })
    .then(response => response.json())
    .then(data => {
        getTasks();
    });
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