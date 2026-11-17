class TaskLocalStorageAdapter {
    constructor(storageKey = 'taskora_tasks_data') {
        this.storageKey = storageKey;
    }

    save(tasks, currentId) {
        if (typeof window === 'undefined' || !window.localStorage) {
            return false;
        }
        try {
            const payload = JSON.stringify({
                tasks: Array.isArray(tasks) ? tasks : [],
                currentId: Number(currentId) || 1
            });
            window.localStorage.setItem(this.storageKey, payload);
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
            const raw = window.localStorage.getItem(this.storageKey);
            if (!raw) {
                return { tasks: [], currentId: 1 };
            }
            const parsed = JSON.parse(raw);
            return {
                tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
                currentId: Number(parsed.currentId) || 1
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
            window.localStorage.removeItem(this.storageKey);
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
