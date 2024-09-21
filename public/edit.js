const API_URL = 'http://localhost:3000/api/characters';
const editForm = document.getElementById('editForm');
const characterId = document.getElementById('characterId');
const editName = document.getElementById('editName');
const editRace = document.getElementById('editRace');
const editGender = document.getElementById('editGender');
const editKi = document.getElementById('editKi');

// Cargar datos del personaje
async function loadCharacter() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const character = await response.json();
            
            characterId.value = character.id;
            editName.value = character.name;
            editRace.value = character.race || '';
            editGender.value = character.gender || '';
            editKi.value = character.ki || '';
        } catch (error) {
            console.error('Error al cargar el personaje:', error);
        }
    }
}

// Manejar el envío del formulario de edición
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = characterId.value;
    const name = editName.value;
    const race = editRace.value;
    const gender = editGender.value;
    const ki = editKi.value;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, race, gender, ki }),
        });
        
        if (response.ok) {
            alert('Personaje actualizado con éxito');
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error al actualizar el personaje:', error);
    }
});

// Cargar los datos del personaje al abrir la página
loadCharacter();