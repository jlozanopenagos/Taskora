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

    function renderTasks() {
        if (typeof taskManager.render === 'function' && tasksContainer) {
            taskManager.render(tasksContainer);
        }
        updateTasksView();
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

            taskManager.addTask(taskData);
            renderTasks();

            taskForm.reset();
            clearTaskFormErrors();
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

    // Delegación de eventos para acciones en la lista de tareas
    if (tasksContainer) {
        tasksContainer.addEventListener('click', (event) => {
            // Verificar si el clic fue en el botón de completar tarea
            const doneButton = event.target.closest('.done-button');
            if (doneButton && !doneButton.disabled) {
                // Usar recorrido del DOM para encontrar el elemento contenedor de la tarea
                const taskElement = doneButton.closest('.task-card') || doneButton.parentElement;
                if (!taskElement) return;

                // Obtener el id desde el atributo de datos y convertirlo a Number
                const taskId = Number(taskElement.dataset.taskId);

                // Buscar la tarea por su id y actualizar su estado a HECHO
                const task = taskManager.getTaskById(taskId);
                if (task) {
                    task.estado = 'HECHO';
                    renderTasks();
                }
                return;
            }

            // Verificar si el clic fue en el botón de eliminar tarea
            const deleteButton = event.target.closest('.btn-delete');
            if (deleteButton) {
                const taskElement = deleteButton.closest('.task-card') || deleteButton.parentElement;
                if (!taskElement) return;

                const taskId = Number(taskElement.dataset.taskId);
                taskManager.deleteTask(taskId);
                renderTasks();
            }
        });
    }

    renderTasks();
});
