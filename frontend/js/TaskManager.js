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

    deleteTask(taskId) {
        const numericId = Number(taskId);
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== numericId);
        return this.tasks.length < initialLength;
    }

    updateTask(taskId, status) {
        const numericId = Number(taskId);
        const task = this.tasks.find(t => t.id === numericId);
        if (task) {
            task.estado = status;
            return task;
        }
        return null;
    }

    assignTask(taskId, assignee) {
        const numericId = Number(taskId);
        const task = this.tasks.find(t => t.id === numericId);
        if (task) {
            task.asignadoA = assignee;
            return task;
        }
        return null;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TaskManager;
}
if (typeof window !== 'undefined') {
    window.TaskManager = TaskManager;
}
