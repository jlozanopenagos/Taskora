class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 1;
    }

    getAllTasks() {
        return this.tasks;
    }

    getTasksWithStatus(status) {
        return this.tasks.filter(task => task.estado === status);
    }

    addTask(taskData) {
        const newTask = {
            id: taskData.id ? Number(taskData.id) : this.currentId++,
            nombre: taskData.nombre,
            descripcion: taskData.descripcion,
            asignadoA: taskData.asignadoA,
            fechaDeEntrega: taskData.fechaDeEntrega,
            estado: taskData.estado
        };

        // Mantener el contador sincronizado si se recibe un ID manual
        if (newTask.id >= this.currentId) {
            this.currentId = newTask.id + 1;
        }

        this.tasks.push(newTask);
        return newTask;
    }

    getTaskById(taskId) {
        const numericId = Number(taskId);
        return this.tasks.find(task => task.id === numericId) || null;
    }

    deleteTask(taskId) {
        const numericId = Number(taskId);
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== numericId);
        return this.tasks.length < initialLength;
    }

    updateTask(taskId, status) {
        const task = this.getTaskById(taskId);
        if (task) {
            task.estado = status;
            return task;
        }
        return null;
    }

    assignTask(taskId, assignee) {
        const task = this.getTaskById(taskId);
        if (task) {
            task.asignadoA = assignee;
            return task;
        }
        return null;
    }

    render(container = (typeof document !== 'undefined' ? document.getElementById('tasks-container') : null)) {
        if (!container || typeof document === 'undefined') return;
        if (typeof container.replaceChildren === 'function') {
            container.replaceChildren();
        } else {
            container.innerHTML = '';
        }
        this.tasks.forEach(task => {
            if (typeof createTaskCard === 'function') {
                container.appendChild(createTaskCard(task));
            }
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TaskManager;
}
if (typeof window !== 'undefined') {
    window.TaskManager = TaskManager;
}
