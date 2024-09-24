let participants = JSON.parse(localStorage.getItem('participants')) || [];
let editMode = false;
let deleteMode = false;

function addParticipant() {
    const name = document.getElementById('name').value;
    if (name) {
        participants.push(name);
        updateParticipantsList();
        saveParticipants();
        document.getElementById('name').value = '';
    } else {
        alert("Por favor, ingresa un nombre.");
    }
}

function updateParticipantsList() {
    const list = document.getElementById('participantsList');
    list.innerHTML = '';

    participants.forEach((participant, index) => {
        const li = document.createElement('li');
        li.textContent = participant;

        if (editMode) {
            // Botón de edición
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.onclick = () => editParticipant(index);
            li.appendChild(editBtn);
        }

        if (deleteMode) {
            // Botón de eliminación
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.onclick = () => deleteParticipant(index);
            li.appendChild(deleteBtn);
        }

        list.appendChild(li);
    });
}

function saveParticipants() {
    localStorage.setItem('participants', JSON.stringify(participants));
}

function editParticipant(index) {
    const newName = prompt("Editar nombre del participante:", participants[index]);
    if (newName) {
        participants[index] = newName;
        updateParticipantsList();
        saveParticipants();
    }
}

function deleteParticipant(index) {
    participants.splice(index, 1);
    updateParticipantsList();
    saveParticipants();
}

function clearParticipants() {
    if (confirm("¿Estás seguro de borrar todos los participantes?")) {
        participants = [];
        updateParticipantsList();
        saveParticipants();
    }
}

// Modo de edición
function toggleEditMode() {
    editMode = !editMode;
    updateParticipantsList();
    document.getElementById('editBtn').textContent = editMode ? "Desactivar Edición" : "Activar Edición";
}

// Modo de eliminación
function toggleDeleteMode() {
    deleteMode = !deleteMode;
    updateParticipantsList();
    document.getElementById('deleteBtn').textContent = deleteMode ? "Desactivar Eliminar" : "Eliminar Participante";
}

function pickWinner() {
    if (participants.length === 0) {
        alert("No hay participantes para el sorteo.");
        return;
    }

    const digitalBoard = document.getElementById('digitalBoard');
    let currentIndex = 0;
    const speed = 100; // Velocidad de cambio de nombre en milisegundos
    const duration = 5000; // Duración total del efecto en milisegundos

    digitalBoard.classList.remove('winner');

    // Cambiar color del botón al ser presionado
    const pickWinnerBtn = document.getElementById('pickWinnerBtn');
    pickWinnerBtn.style.backgroundColor = 'green';
    pickWinnerBtn.style.color = 'black';

    const interval = setInterval(() => {
        digitalBoard.textContent = participants[currentIndex];
        currentIndex = (currentIndex + 1) % participants.length;
    }, speed);

    setTimeout(() => {
        clearInterval(interval);
        const winnerIndex = Math.floor(Math.random() * participants.length);
        digitalBoard.textContent = `¡El ganador es: ${participants[winnerIndex]}!`;
        digitalBoard.classList.add('winner');

        // Restaurar el color original del botón
        pickWinnerBtn.style.backgroundColor = '#333';
        pickWinnerBtn.style.color = 'white';
    }, duration);
}

// Actualiza la lista de participantes al cargar la página
window.onload = updateParticipantsList;
