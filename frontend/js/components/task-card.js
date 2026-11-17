function getStatusBadgeClass(status) {
    switch (status) {
        case 'POR HACER':
            return 'status-todo';
        case 'EN PROCESO':
            return 'status-in-progress';
        case 'REVISIÓN':
            return 'status-review';
        case 'HECHO':
            return 'status-done';
        default:
            return 'status-todo';
    }
}

function createDetailItem(label, value) {
    const item = document.createElement('div');
    item.className = 'task-detail-item';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'detail-label';
    labelSpan.textContent = label;

    const valueSpan = document.createElement('span');
    valueSpan.className = 'detail-value';
    valueSpan.textContent = value || '';

    item.append(labelSpan, valueSpan);
    return item;
}

function createCardHeader(title, status) {
    const header = document.createElement('div');
    header.className = 'task-card-header';

    const titleEl = document.createElement('h3');
    titleEl.className = 'task-card-title';
    titleEl.textContent = title || '';

    const badge = document.createElement('span');
    badge.className = `task-badge ${getStatusBadgeClass(status)}`;
    badge.textContent = status || '';

    header.append(titleEl, badge);
    return header;
}

function createCardDetails(assignee, dueDate) {
    const details = document.createElement('div');
    details.className = 'task-card-details';

    details.append(
        createDetailItem('Asignado a:', assignee),
        createDetailItem('Fecha de Entrega:', dueDate)
    );
    return details;
}

function createCardActions(taskId, isDone) {
    const actions = document.createElement('div');
    actions.className = 'task-card-actions';

    const doneButton = document.createElement('button');
    doneButton.type = 'button';
    doneButton.className = 'btn btn-done done-button';
    doneButton.setAttribute('data-task-id', taskId);

    if (isDone) {
        doneButton.disabled = true;
        doneButton.textContent = 'Completada';
    } else {
        doneButton.textContent = 'Marcar como hecha';
    }

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-delete';
    deleteButton.setAttribute('data-task-id', taskId);
    deleteButton.textContent = 'Eliminar';

    actions.append(doneButton, deleteButton);
    return actions;
}

function createTaskCard(task) {
    const card = document.createElement('article');
    card.className = 'task-card';
    card.setAttribute('data-task-id', task.id);

    const isDone = task.estado === 'HECHO';

    const header = createCardHeader(task.nombre, task.estado);

    const description = document.createElement('p');
    description.className = 'task-card-description';
    description.textContent = task.descripcion || '';

    const details = createCardDetails(task.asignadoA, task.fechaDeEntrega);
    const actions = createCardActions(task.id, isDone);

    card.append(header, description, details, actions);
    return card;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createTaskCard,
        getStatusBadgeClass,
        createDetailItem,
        createCardHeader,
        createCardDetails,
        createCardActions
    };
}
if (typeof window !== 'undefined') {
    window.createTaskCard = createTaskCard;
    window.getStatusBadgeClass = getStatusBadgeClass;
    window.createDetailItem = createDetailItem;
    window.createCardHeader = createCardHeader;
    window.createCardDetails = createCardDetails;
    window.createCardActions = createCardActions;
}
