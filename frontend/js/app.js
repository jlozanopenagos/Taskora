const taskManager = new TaskManager();

if (typeof window !== 'undefined') {
    window.taskManager = taskManager;
}

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const tasksContainer = document.getElementById('tasks-container');
    const emptyState = document.getElementById('empty-state');
    const tasksCount = document.getElementById('tasks-count');

    const nameInput = document.getElementById('task-name');
    const descInput = document.getElementById('task-description');
    const assigneeInput = document.getElementById('task-assignee');
    const dueDateInput = document.getElementById('task-due-date');
    const statusInput = document.getElementById('task-status');

    function updateTasksView() {
        const allTasks = taskManager.getAllTasks();
        const count = allTasks.length;

        if (tasksCount) {
            tasksCount.textContent = count === 1 ? '1 tarea' : `${count} tareas`;
        }

        if (emptyState) {
            emptyState.style.display = count === 0 ? 'block' : 'none';
        }
    }

    if (taskForm) {
        // Enviar formulario y registrar la tarea
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!validateTaskForm()) {
                return;
            }

            const taskData = {
                nombre: nameInput.value.trim(),
                descripcion: descInput.value.trim(),
                asignadoA: assigneeInput.value.trim(),
                fechaDeEntrega: dueDateInput.value,
                estado: statusInput.value
            };

            const newTask = taskManager.addTask(taskData);
            const taskCardElement = createTaskCard(newTask);

            if (tasksContainer) {
                tasksContainer.appendChild(taskCardElement);
            }

            taskForm.reset();
            clearTaskFormErrors();
            updateTasksView();
        });

        // Limpiar errores visuales al resetear el formulario
        taskForm.addEventListener('reset', () => {
            setTimeout(clearTaskFormErrors, 0);
        });

        // Limpiar el mensaje de error del campo que se está editando
        [nameInput, descInput, assigneeInput, dueDateInput, statusInput].forEach((input) => {
            if (input) {
                const clearError = () => {
                    input.classList.remove('input-error');
                    const errorSpan = document.getElementById(`error-${input.id}`);
                    if (errorSpan) errorSpan.textContent = '';
                };

                input.addEventListener('input', clearError);
                input.addEventListener('change', clearError);
            }
        });
    }

    // Delegación de eventos para eliminar tareas
    if (tasksContainer) {
        tasksContainer.addEventListener('click', (event) => {
            const deleteButton = event.target.closest('.btn-delete');
            if (!deleteButton) return;

            const taskId = deleteButton.dataset.taskId;
            taskManager.deleteTask(taskId);

            const card = deleteButton.closest('.task-card');
            if (card) {
                card.remove();
            }

            updateTasksView();
        });
    }

    updateTasksView();
});
