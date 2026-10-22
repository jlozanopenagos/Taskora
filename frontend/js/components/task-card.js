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

function createTaskCard(task) {
    const card = document.createElement('article');
    card.className = 'task-card';
    card.setAttribute('data-task-id', task.id);

    const badgeClass = getStatusBadgeClass(task.estado);

    card.innerHTML = `
        <div class="task-card-header">
            <h3 class="task-card-title">${escapeHTML(task.nombre)}</h3>
            <span class="task-badge ${badgeClass}">${escapeHTML(task.estado)}</span>
        </div>
        <p class="task-card-description">${escapeHTML(task.descripcion)}</p>
        <div class="task-card-details">
            <div class="task-detail-item">
                <span class="detail-label">Asignado a:</span>
                <span class="detail-value">${escapeHTML(task.asignadoA)}</span>
            </div>
            <div class="task-detail-item">
                <span class="detail-label">Fecha de Entrega:</span>
                <span class="detail-value">${escapeHTML(task.fechaDeEntrega)}</span>
            </div>
        </div>
        <div class="task-card-actions">
            <button type="button" class="btn btn-delete" data-task-id="${task.id}">Eliminar</button>
        </div>
    `;

    return card;
}

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createTaskCard,
        getStatusBadgeClass,
        escapeHTML
    };
}
if (typeof window !== 'undefined') {
    window.createTaskCard = createTaskCard;
    window.getStatusBadgeClass = getStatusBadgeClass;
    window.escapeHTML = escapeHTML;
}
