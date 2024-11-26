const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const tasks = document.getElementById('tasks');

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const taskItem = document.createElement('li');
  const taskContent = document.createElement('span');
  taskContent.textContent = taskText;

  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.onclick = () => taskItem.classList.toggle('completed');

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.onclick = () => tasks.removeChild(taskItem);

  taskItem.appendChild(taskContent);
  taskItem.appendChild(completeButton);
  taskItem.appendChild(deleteButton);

  tasks.appendChild(taskItem);
  taskInput.value = '';
}

addTaskButton.onclick = addTask;
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
