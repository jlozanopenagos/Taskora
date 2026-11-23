class TaskLocalStorageAdapter {
    constructor(tasksKey = 'tasks', currentIdKey = 'currentId') {
        this.tasksKey = tasksKey;
        this.currentIdKey = currentIdKey;
    }

    save(tasks, currentId) {
        if (typeof window === 'undefined' || !window.localStorage) {
            return false;
        }
        try {
            const tasksString = JSON.stringify(Array.isArray(tasks) ? tasks : []);
            window.localStorage.setItem(this.tasksKey, tasksString);
            window.localStorage.setItem(this.currentIdKey, String(Number(currentId) || 1));
            return true;
        } catch (error) {
            console.error('Error al guardar tareas en localStorage:', error);
            return false;
        }
    }

    load() {
        if (typeof window === 'undefined' || !window.localStorage) {
            return { tasks: [], currentId: 1 };
        }
        try {
            const rawTasks = window.localStorage.getItem(this.tasksKey);
            const rawId = window.localStorage.getItem(this.currentIdKey);

            // Fallback retrocompatible con la clave combinada previa
            if (!rawTasks && !rawId) {
                const legacy = window.localStorage.getItem('taskora_tasks_data');
                if (legacy) {
                    const parsedLegacy = JSON.parse(legacy);
                    return {
                        tasks: Array.isArray(parsedLegacy.tasks) ? parsedLegacy.tasks : [],
                        currentId: Number(parsedLegacy.currentId) || 1
                    };
                }
                return { tasks: [], currentId: 1 };
            }

            const tasks = rawTasks ? JSON.parse(rawTasks) : [];
            const currentId = rawId ? Number(rawId) : 1;

            return {
                tasks: Array.isArray(tasks) ? tasks : [],
                currentId: isNaN(currentId) ? 1 : currentId
            };
        } catch (error) {
            console.error('Error al cargar tareas desde localStorage:', error);
            return { tasks: [], currentId: 1 };
        }
    }

    clear() {
        if (typeof window === 'undefined' || !window.localStorage) {
            return false;
        }
        try {
            window.localStorage.removeItem(this.tasksKey);
            window.localStorage.removeItem(this.currentIdKey);
            window.localStorage.removeItem('taskora_tasks_data');
            return true;
        } catch (error) {
            console.error('Error al limpiar localStorage:', error);
            return false;
        }
    }
}

const defaultTaskStorage = new TaskLocalStorageAdapter();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TaskLocalStorageAdapter,
        taskStorage: defaultTaskStorage
    };
}
if (typeof window !== 'undefined') {
    window.TaskLocalStorageAdapter = TaskLocalStorageAdapter;
    window.taskStorage = defaultTaskStorage;
}
