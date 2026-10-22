function validateTaskForm(taskData) {
    let values;

    // Permite validar desde un objeto de prueba o directamente desde los campos del DOM
    if (taskData) {
        values = taskData;
    } else if (typeof document !== 'undefined') {
        const nameInput = document.getElementById('task-name');
        const descInput = document.getElementById('task-description');
        const assigneeInput = document.getElementById('task-assignee');
        const dueDateInput = document.getElementById('task-due-date');
        const statusInput = document.getElementById('task-status');

        values = {
            nombre: nameInput ? nameInput.value : '',
            descripcion: descInput ? descInput.value : '',
            asignadoA: assigneeInput ? assigneeInput.value : '',
            fechaDeEntrega: dueDateInput ? dueDateInput.value : '',
            estado: statusInput ? statusInput.value : ''
        };
    } else {
        values = {};
    }

    let isValid = true;
    const errors = {};

    const cleanNombre = (values.nombre || '').trim();
    if (cleanNombre.length === 0) {
        errors.nombre = 'El nombre no puede estar en blanco.';
        isValid = false;
    } else if (cleanNombre.length <= 8) {
        errors.nombre = 'El nombre debe tener más de 8 caracteres.';
        isValid = false;
    }

    const cleanDesc = (values.descripcion || '').trim();
    if (cleanDesc.length === 0) {
        errors.descripcion = 'La descripción no puede estar en blanco.';
        isValid = false;
    } else if (cleanDesc.length <= 15) {
        errors.descripcion = 'La descripción debe tener más de 15 caracteres.';
        isValid = false;
    }

    const cleanAssignee = (values.asignadoA || '').trim();
    if (cleanAssignee.length === 0) {
        errors.asignadoA = 'El asignado a no puede estar en blanco.';
        isValid = false;
    } else if (cleanAssignee.length <= 8) {
        errors.asignadoA = 'El asignado a debe tener más de 8 caracteres.';
        isValid = false;
    }

    const cleanDueDate = (values.fechaDeEntrega || '').trim();
    if (cleanDueDate.length === 0) {
        errors.fechaDeEntrega = 'Debes seleccionar una fecha de entrega.';
        isValid = false;
    }

    const validStates = ['POR HACER', 'EN PROCESO', 'REVISIÓN', 'HECHO'];
    const cleanStatus = (values.estado || '').trim();
    if (cleanStatus.length === 0 || !validStates.includes(cleanStatus)) {
        errors.estado = 'Debes seleccionar un estado válido.';
        isValid = false;
    }

    if (typeof document !== 'undefined') {
        renderFieldValidation('task-name', errors.nombre);
        renderFieldValidation('task-description', errors.descripcion);
        renderFieldValidation('task-assignee', errors.asignadoA);
        renderFieldValidation('task-due-date', errors.fechaDeEntrega);
        renderFieldValidation('task-status', errors.estado);
    }

    return isValid;
}

function renderFieldValidation(fieldId, errorMessage) {
    if (typeof document === 'undefined') return;

    const inputElement = document.getElementById(fieldId);
    const errorElement = document.getElementById('error-' + fieldId);

    if (errorMessage) {
        if (inputElement) inputElement.classList.add('input-error');
        if (errorElement) errorElement.textContent = errorMessage;
    } else {
        if (inputElement) inputElement.classList.remove('input-error');
        if (errorElement) errorElement.textContent = '';
    }
}

function clearTaskFormErrors() {
    if (typeof document === 'undefined') return;
    const fieldIds = ['task-name', 'task-description', 'task-assignee', 'task-due-date', 'task-status'];
    fieldIds.forEach(id => renderFieldValidation(id, undefined));
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateTaskForm,
        renderFieldValidation,
        clearTaskFormErrors
    };
}
if (typeof window !== 'undefined') {
    window.validateTaskForm = validateTaskForm;
    window.renderFieldValidation = renderFieldValidation;
    window.clearTaskFormErrors = clearTaskFormErrors;
}
