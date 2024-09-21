const API_URL = 'http://localhost:3000/api/characters';
const characterTableBody = document.getElementById('characterTableBody');
const characterForm = document.getElementById('characterForm');

// Función para cargar personajes
async function loadCharacters() {
    try {
        const response = await fetch(API_URL);
        const characters = await response.json();
        displayCharacters(characters);
    } catch (error) {
        console.error('Error al cargar personajes:', error);
    }
}

// Función para mostrar personajes en la tabla
function displayCharacters(characters) {
    characterTableBody.innerHTML = '';
    characters.forEach(character => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${character.name}</td>
            <td>${character.race || 'Desconocida'}</td>
            <td>${character.gender || 'Desconocido'}</td>
            <td>${character.ki || 'Desconocido'}</td>
            <td>
                <button onclick="editCharacter(${character.id})">Editar</button>
                <button onclick="deleteCharacter(${character.id})">Eliminar</button>
            </td>
        `;
        characterTableBody.appendChild(row);
    });
}

// Función para agregar un nuevo personaje
characterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('characterName').value;
    const race = document.getElementById('characterRace').value;
    const gender = document.getElementById('characterGender').value;
    const ki = document.getElementById('characterKi').value;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, race, gender, ki }),
        });
        if (response.ok) {
            loadCharacters();
            characterForm.reset();
        }
    } catch (error) {
        console.error('Error al agregar personaje:', error);
    }
});

// Función para editar un personaje
async function editCharacter(id) {
    const name = prompt('Nuevo nombre del personaje:');
    const race = prompt('Nueva raza del personaje:');
    const gender = prompt('Nuevo género del personaje:');
    const ki = prompt('Nuevo ki del personaje:');
    
    if (name && race && gender && ki) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, race, gender, ki }),
            });
            if (response.ok) {
                loadCharacters();
            }
        } catch (error) {
            console.error('Error al editar personaje:', error);
        }
    }
}

// Función para eliminar un personaje
async function deleteCharacter(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este personaje?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                loadCharacters();
            }
        } catch (error) {
            console.error('Error al eliminar personaje:', error);
        }
    }
}

// Cargar personajes al iniciar la página
loadCharacters();