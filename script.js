const participants = ['Juan', 'Ana', 'Pedro', 'Maria', 'Luis'];
let editable = false;

const participantListEl = document.getElementById('participantList');
const winnerBoxEl = document.getElementById('winnerBox');
const winnerNameEl = document.getElementById('winnerName');
const drawButtonEl = document.getElementById('drawButton');

function renderParticipants() {
    participantListEl.innerHTML = '';
    participants.forEach((participant, index) => {
        const participantEl = document.createElement('div');
        participantEl.innerHTML = `
            <span>${participant}</span>
            ${editable ? `<button onclick="editParticipant(${index})">Editar</button><button onclick="deleteParticipant(${index})">Eliminar</button>` : ''}
        `;
        participantListEl.appendChild(participantEl);
    });
}

function editParticipant(index) {
    const newName = prompt('Editar nombre del participante:', participants[index]);
    if (newName) {
        participants[index] = newName;
        renderParticipants();
    }
}

function deleteParticipant(index) {
    participants.splice(index, 1);
    renderParticipants();
}

document.getElementById('editButton').addEventListener('click', () => {
    editable = !editable;
    renderParticipants();
});

document.getElementById('deleteOneButton').addEventListener('click', () => {
    const nameToDelete = prompt('Ingrese el nombre del participante que desea eliminar:');
    const index = participants.indexOf(nameToDelete);
    if (index !== -1) {
        participants.splice(index, 1);
        renderParticipants();
    } else {
        alert('Participante no encontrado.');
    }
});

document.getElementById('deleteAllButton').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres eliminar todos los participantes?')) {
        participants.length = 0;
        renderParticipants();
    }
});

drawButtonEl.addEventListener('click', () => {
    if (participants.length === 0) {
        alert('No hay participantes en el sorteo.');
        return;
    }

    // Elegir ganador
    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];

    // Mostrar el ganador
    winnerNameEl.textContent = winner;
    winnerBoxEl.style.display = 'block';

    // Cambiar el color del botón mientras se elige el ganador
    drawButtonEl.style.backgroundColor = 'green';
    drawButtonEl.style.color = 'black';

    // Después de un
