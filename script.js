// Fungsi untuk menghapus semua todo
function deleteAllTodos() {
    if (todos.length === 0) {
        alert('Tidak ada tugas untuk dihapus.');
        return;
    }
    if (confirm('Apakah Anda yakin ingin menghapus semua tugas?')) {
        todos = [];
        editIndex = null;
        renderTodos(filterInput.value);
    }
}
// To Do List App with CRUD, filter, and validation

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dueDateInput = document.getElementById('due-date');
const todoList = document.getElementById('todo-list');
const filterInput = document.getElementById('filter-input');

let todos = [];
let editIndex = null;

function renderTodos(filter = '') {
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
        if (
            todo.text.toLowerCase().includes(filter.toLowerCase()) ||
            (todo.dueDate && todo.dueDate.includes(filter))
        ) {
            const li = document.createElement('li');
            li.className = 'todo-item';
            if (todo.completed) {
                li.style.opacity = '0.6';
                li.style.textDecoration = 'line-through';
            }

            if (editIndex === idx) {
                // Edit mode
                const input = document.createElement('input');
                input.type = 'text';
                input.value = todo.text;
                input.className = 'todo-edit-input';
                li.appendChild(input);

                const dateInput = document.createElement('input');
                dateInput.type = 'date';
                dateInput.value = todo.dueDate || '';
                dateInput.className = 'todo-edit-date';
                li.appendChild(dateInput);

                const actions = document.createElement('div');
                actions.className = 'todo-actions';

                const saveBtn = document.createElement('button');
                saveBtn.textContent = 'Save';
                saveBtn.className = 'save';
                saveBtn.onclick = () => saveEdit(idx, input.value, dateInput.value);
                actions.appendChild(saveBtn);

                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = 'Cancel';
                cancelBtn.className = 'cancel';
                cancelBtn.onclick = () => {
                    editIndex = null;
                    renderTodos(filterInput.value);
                };
                actions.appendChild(cancelBtn);

                li.appendChild(actions);
            } else {
                // Normal mode
                const span = document.createElement('span');
                span.className = 'todo-text';
                span.textContent = todo.text + (todo.dueDate ? ' (Deadline: ' + todo.dueDate + ')' : '');
                li.appendChild(span);

                const actions = document.createElement('div');
                actions.className = 'todo-actions';

                // Selesai button
                const doneBtn = document.createElement('button');
                doneBtn.textContent = todo.completed ? 'Undo' : 'Selesai';
                doneBtn.className = 'done';
                doneBtn.onclick = () => toggleComplete(idx);
                actions.appendChild(doneBtn);

                // Info button
                const infoBtn = document.createElement('button');
                infoBtn.textContent = 'Info';
                infoBtn.className = 'info';
                infoBtn.onclick = () => showInfo(idx);
                actions.appendChild(infoBtn);

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.className = 'edit';
                editBtn.onclick = () => {
                    editIndex = idx;
                    renderTodos(filterInput.value);
                };
                actions.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'delete';
                deleteBtn.onclick = () => deleteTodo(idx);
                actions.appendChild(deleteBtn);

                li.appendChild(actions);
            }
            todoList.appendChild(li);
        }
    });
}

function addTodo(text, dueDate) {
    if (!text.trim()) {
        alert('Tugas tidak boleh kosong!');
        return;
    }
    if (!dueDate) {
        alert('Tanggal deadline harus diisi!');
        return;
    }
    todos.push({ text, dueDate, completed: false });
    renderTodos(filterInput.value);
}

function deleteTodo(idx) {
    todos.splice(idx, 1);
    if (editIndex === idx) editIndex = null;
    renderTodos(filterInput.value);
}

function saveEdit(idx, newText, newDueDate) {
    if (!newText.trim()) {
        alert('Tugas tidak boleh kosong!');
        return;
    }
    if (!newDueDate) {
        alert('Tanggal deadline harus diisi!');
        return;
    }
    todos[idx].text = newText;
    todos[idx].dueDate = newDueDate;
    editIndex = null;
    renderTodos(filterInput.value);
}

function toggleComplete(idx) {
    todos[idx].completed = !todos[idx].completed;
    renderTodos(filterInput.value);
}

function showInfo(idx) {
    const todo = todos[idx];
    let info = `Tugas: ${todo.text}\nDeadline: ${todo.dueDate}`;
    info += `\nStatus: ${todo.completed ? 'Selesai' : 'Belum selesai'}`;
    alert(info);
}


todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo(todoInput.value, dueDateInput.value);
    todoInput.value = '';
    dueDateInput.value = '';
});

filterInput.addEventListener('input', function() {
    renderTodos(filterInput.value);
});

// Initial render

renderTodos();

// Event listener untuk tombol Delete All
const deleteAllBtn = document.getElementById('delete-all');
if (deleteAllBtn) {
    deleteAllBtn.addEventListener('click', deleteAllTodos);
}

