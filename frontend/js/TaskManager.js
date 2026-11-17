class TaskManager {
    constructor(storageAdapter = (typeof taskStorage !== 'undefined' ? taskStorage : null)) {
        this.tasks = [];
        this.currentId = 1;
        this.storageAdapter = storageAdapter;
    }

    save() {
        if (this.storageAdapter && typeof this.storageAdapter.save === 'function') {
            return this.storageAdapter.save(this.tasks, this.currentId);
        }
        return false;
    }

    load() {
        if (this.storageAdapter && typeof this.storageAdapter.load === 'function') {
            const data = this.storageAdapter.load();
            if (data && Array.isArray(data.tasks)) {
                this.tasks = data.tasks;
                this.currentId = Number(data.currentId) || 1;
                return true;
            }
        }
        return false;
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
        this.save();
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
        const wasDeleted = this.tasks.length < initialLength;
        if (wasDeleted) {
            this.save();
        }
        return wasDeleted;
    }

    updateTask(taskId, status) {
        const task = this.getTaskById(taskId);
        if (task) {
            task.estado = status;
            this.save();
            return task;
        }
        return null;
    }

    assignTask(taskId, assignee) {
        const task = this.getTaskById(taskId);
        if (task) {
            task.asignadoA = assignee;
            this.save();
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
