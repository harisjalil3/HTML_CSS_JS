const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const searchInput = document.getElementById('search-input');
const sortBySelect = document.getElementById('sort-by');
const themeToggleBtn = document.getElementById('theme-toggle');
const spotifyThemeLink = document.getElementById('spotify-theme');
const neonThemeLink = document.getElementById('neon-theme');

const clearAllButton = document.getElementById('clear-all-button');
const clearModal = document.getElementById('clear-modal');
const confirmClearButton = document.getElementById('confirm-clear-button');
const cancelClearButton = document.getElementById('cancel-clear-button');


let currentFilter = 'all';


function saveTasks() {
    
    const tasks = [];
    document.querySelectorAll('#task-list .task-item').forEach(li => {
        
        const textElement = li.querySelector('.task-text');
        const tagElement = li.querySelector('.task-tag');

        let taskText = textElement.textContent;
        let taskTag = tagElement ? tagElement.textContent.trim() : null;

        
        tasks.push({
            text: taskText,
            tag: taskTag,
            completed: li.classList.contains('checked')
        });
    });

    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function createTaskElement(taskData, isCompleted = false) {
    const taskText = taskData.text || taskData;
    const taskTag = taskData.tag || null;

    if (taskText.trim() === '') {
        return; 
    }

    
    const newTask = document.createElement('li');
    newTask.classList.add('task-item');
    if (isCompleted) {
        newTask.classList.add('checked');
    }

    
    const checkboxHtml = `
        <div class="checkbox-container">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
    `;
    newTask.insertAdjacentHTML('afterbegin', checkboxHtml);

    
    const textSpan = document.createElement('span');
    textSpan.classList.add('task-text');
    textSpan.textContent = taskText;
    textSpan.setAttribute('contenteditable', 'false'); 
    newTask.appendChild(textSpan);

    
    if (taskTag) {
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('task-tag');
        tagSpan.textContent = taskTag;
        newTask.appendChild(tagSpan);
    }

    
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';
    newTask.appendChild(closeBtn);

    
    taskList.appendChild(newTask);
}


function loadTasks() {
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    
    tasks.forEach(task => {
        createTaskElement(task, task.completed);
    });
    
    filterTasks(currentFilter);
}


function handleAddTask() {
    const fullText = taskInput.value.trim();
    if (fullText !== '') {
        let taskText = fullText;
        let taskTag = null;

        
        const tagMatch = fullText.match(/#(\w+)$/);
        if (tagMatch) {
            taskText = fullText.replace(tagMatch[0], '').trim();
            taskTag = tagMatch[0];
        }

        
        createTaskElement({ text: taskText, tag: taskTag });

        
        taskInput.value = '';

        
        saveTasks();

        
        filterTasks(currentFilter);
    }
}


function sortTasks() {
    const tasks = Array.from(document.querySelectorAll('.task-item'));
    const sortValue = sortBySelect.value;

    let sortedTasks;

    switch (sortValue) {
        case 'alphabetical':
            sortedTasks = tasks.sort((a, b) => {
                const textA = a.querySelector('.task-text').textContent.toLowerCase();
                const textB = b.querySelector('.task-text').textContent.toLowerCase();
                return textA.localeCompare(textB);
            });
            break;
        case 'newest':
            sortedTasks = tasks.reverse();
            break;
        case 'oldest':
        case 'default':
        default:
            sortedTasks = tasks;
            break;
    }

    
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    sortedTasks.forEach(task => taskList.appendChild(task));
}



function filterTasks(filterType) {
    currentFilter = filterType;
    const tasks = document.querySelectorAll('#task-list .task-item');

    
    filterButtons.forEach(button => {
        if (button.dataset.filter === filterType) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    tasks.forEach(task => {
        const isCompleted = task.classList.contains('checked');

        
        if (filterType === 'all') {
            task.style.display = 'flex';
        } else if (filterType === 'pending' && isCompleted) {
            task.style.display = 'none';
        } else if (filterType === 'completed' && !isCompleted) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    });
}


function searchTasks() {
    const searchText = searchInput.value.toLowerCase();
    const tasks = document.querySelectorAll('#task-list .task-item');

    tasks.forEach(task => {
        const taskText = task.querySelector('.task-text').textContent.toLowerCase();
        
        if (taskText.includes(searchText)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}



taskList.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const taskItem = clickedElement.closest('.task-item');

    
    if (!taskItem) {
        return;
    }

    
    if (clickedElement.classList.contains('close-btn')) {
        taskItem.remove();
        saveTasks();
        filterTasks(currentFilter);
    }
    
    else if (clickedElement.classList.contains('task-text') || clickedElement.closest('.checkbox-container')) {
        taskItem.classList.toggle('checked');
        saveTasks();
        filterTasks(currentFilter);
    }
});


taskList.addEventListener('dblclick', function(event) {
    const taskTextElement = event.target.closest('.task-text');
    if (taskTextElement) {
        taskTextElement.setAttribute('contenteditable', 'true');
        taskTextElement.focus();
    }
});


taskList.addEventListener('blur', function(event) {
    const taskTextElement = event.target.closest('.task-text');
    if (taskTextElement) {
        taskTextElement.setAttribute('contenteditable', 'false');
        saveTasks();
    }
}, true); 


document.querySelector('.filter-buttons').addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) {
        const filterType = button.dataset.filter;
        filterTasks(filterType);
    }
});



searchInput.addEventListener('keyup', searchTasks);



addButton.addEventListener('click', handleAddTask);


taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        handleAddTask();
    }
});


sortBySelect.addEventListener('change', sortTasks);


function toggleTheme() {
    const isSpotifyActive = !spotifyThemeLink.disabled;
    localStorage.setItem('currentTheme', isSpotifyActive ? 'neon' : 'spotify');
    location.reload(); 
}


function loadTheme() {
    const savedTheme = localStorage.getItem('currentTheme') || 'spotify';
    if (savedTheme === 'neon') {
        spotifyThemeLink.disabled = true;
        neonThemeLink.disabled = false;
    } else {
        spotifyThemeLink.disabled = false;
        neonThemeLink.disabled = true;
    }
}


themeToggleBtn.addEventListener('click', toggleTheme);

// Show the clear all confirmation modal
clearAllButton.addEventListener('click', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (tasks.length > 0) {
        clearModal.classList.add('show');
    }
});

// Clear all tasks
confirmClearButton.addEventListener('click', () => {
    localStorage.setItem('tasks', '[]');
    clearModal.classList.remove('show');
    location.reload(); // Reload the page to show a clean list
});

// Cancel clearing tasks
cancelClearButton.addEventListener('click', () => {
    clearModal.classList.remove('show');
});


document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadTasks();
});