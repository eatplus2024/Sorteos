let participants = JSON.parse(localStorage.getItem('participants')) || [];

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

        // Botón para editar participante
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => editParticipant(index);

        // Botón para eliminar participante
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.onclick = () => deleteParticipant(index);

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
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

    const interval = setInterval(() => {
        digitalBoard.textContent = participants[currentIndex];
        currentIndex = (currentIndex + 1) % participants.length;
    }, speed);

    setTimeout(() => {
        clearInterval(interval);
        const winnerIndex = Math.floor(Math.random() * participants.length);
        digitalBoard.textContent = `¡El ganador es: ${participants[winnerIndex]}!`;
        digitalBoard.classList.add('winner');
    }, duration);
}

// Actualiza la lista de participantes al cargar la página
window.onload = updateParticipantsList;
