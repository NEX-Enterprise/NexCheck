// Equipo y especialidades
const teamMembers = [
  { name: "Kevin", specialties: ["frontend", "UI/UX"] },
  { name: "Brian", specialties: ["backend", "databases"] },
  { name: "Yaisel", specialties: ["testing", "frontend"] },
  { name: "Owen", specialties: ["testing", "frontend"] },
];

// Listas de tareas y asignaciones
const tasks = [];
let assignments = {};

// Referencias del DOM
const taskInput = document.getElementById("taskInput");
const taskCategory = document.getElementById("taskCategory");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("tasks");
const assignmentsContainer = document.getElementById("assignmentsContainer");

// Agregar tarea
addTaskButton.addEventListener("click", () => {
  const description = taskInput.value.trim();
  const category = taskCategory.value;

  if (description) {
    // Agregar tarea al array
    tasks.push({ description, category });
    updateTaskList();
    assignTasks();
    taskInput.value = "";
  }
});

// Actualizar lista de tareas
function updateTaskList() {
  taskList.innerHTML = tasks
    .map(
      (task, index) =>
        `<li>${task.description} (${task.category})</li>`
    )
    .join("");
}

// Asignar tareas
function assignTasks() {
  assignments = {}; // Reiniciar asignaciones

  // Inicializar asignaciones para cada miembro
  teamMembers.forEach((member) => {
    assignments[member.name] = [];
  });

  // Asignar tareas según especialización
  tasks.forEach((task) => {
    const bestMatch = teamMembers.find((member) =>
      member.specialties.includes(task.category)
    );

    if (bestMatch) {
      assignments[bestMatch.name].push(task);
    }
  });

  updateAssignments();
}

// Actualizar visualización de asignaciones
function updateAssignments() {
  assignmentsContainer.innerHTML = Object.entries(assignments)
    .map(
      ([member, tasks]) => `
      <div class="assignment-card">
        <h3>${member}</h3>
        <ul>
          ${tasks
            .map((task) => `<li>${task.description} (${task.category})</li>`)
            .join("")}
        </ul>
      </div>
    `
    )
    .join("");
}

// Agregar tarea con botones de acción
function updateTaskList() {
  taskList.innerHTML = tasks
    .map(
      (task, index) => `
      <li class="${task.completed ? "completed" : ""}">
        ${task.description} (${task.category})
        <div class="task-buttons">
          <button onclick="toggleComplete(${index})" title="Marcar como completada">
            <i class="fas ${task.completed ? "fa-undo" : "fa-check"}"></i>
          </button>
          <button onclick="deleteTask(${index})" title="Eliminar tarea">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </li>
    `
    )
    .join("");
}

// Marcar tarea como completada o deshacer
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
}

// Eliminar tarea
function deleteTask(index) {
  tasks.splice(index, 1); // Quitar la tarea de la lista
  updateTaskList(); // Actualizar visualmente
  assignTasks(); // Reasignar tareas
}
