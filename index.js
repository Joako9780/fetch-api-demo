const IMAGE_URL = 'https://cdn.thesimpsonsapi.com/500';
/**
 * 
 * @param {number} id -// El id del personaje que se quiere obtener 
 * @returns {Promise<Object>}  // El objeto que retorna es una promesa que se resuelve a un objeto
 */

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // El max y el min son inclusivos
}

function getUniqueRandomInts() {
    const uniqueRandomIds = [];
    while (uniqueRandomIds.length < 6) {
        const id = getRandomInt(1, 20);
        if (!uniqueRandomIds.includes(id)) {
            uniqueRandomIds.push(id);
        }
    }
    return uniqueRandomIds;
}    

const fetchCharacter = async (id = 1) => {  //id = 1 es un default value por si id no recibe ningun valor
    const response = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`);  // String interpolation, con lo cual se puede escapar algo, y se pide que se resuelva a algo que puede ser resuelto en primitico
    const character = await response.json();
    return character;  
};

// IIFE Immediately Invoked Function Expression 
(async () => {
/*
    const character = await fetchCharacter(1);
    const characterElement = document.querySelector("#character");
    characterElement.textContent = JSON.stringify(character, null, 2); // El null y el 2 son para que se vea bonito el JSON, 2 es el nivel de indentacion
*/

    const imageElements = [
        document.querySelector('#character-image1'),
        document.querySelector('#character-image2'),
        document.querySelector('#character-image3'),
        document.querySelector('#character-image4'),
        document.querySelector('#character-image5'),
        document.querySelector('#character-image6')
    ];

    const nameElements = [
        document.querySelector('#character-name1'),
        document.querySelector('#character-name2'),
        document.querySelector('#character-name3'),
        document.querySelector('#character-name4'),
        document.querySelector('#character-name5'),
        document.querySelector('#character-name6')
    ];

    let uniqueRandomIds = getUniqueRandomInts();
    const characters = await Promise.all(uniqueRandomIds.map(id => fetchCharacter(id)));
    
    characters.forEach((character, index) => {
        imageElements[index].src = `${IMAGE_URL}${character.portrait_path}`;
        imageElements[index].alt = character.name || 'Character Image';
        if (nameElements[index]) nameElements[index].textContent = character.name || '';
    });
    // const imageElement = document.querySelector('#character-image');
    // imageElement.src = `${IMAGE_URL}${character.portrait_path}`;

    // Ocultar el spinner
    const spinnerElement = document.querySelector(".loader");
    spinnerElement.style.display = 'none';

    const buttonElement = document.querySelector('#fetch-button');
    buttonElement.disabled = false; // Habilitar el boton

    buttonElement.addEventListener('click', async () => {
        buttonElement.disabled = true; // Deshabilitar el boton
        spinnerElement.style.display = 'block'; // Mostrar el spinner
        uniqueRandomIds = getUniqueRandomInts();

        // Clear current images/names while loading
        imageElements.forEach(img => { img.src = ''; img.alt = ''; });
        nameElements.forEach(n => { if (n) n.textContent = ''; });

        const characters = await Promise.all(uniqueRandomIds.map(id => fetchCharacter(id)));

        characters.forEach((character, index) => {
            imageElements[index].src = `${IMAGE_URL}${character.portrait_path}`;
            imageElements[index].alt = character.name || 'Character Image';
            if (nameElements[index]) nameElements[index].textContent = character.name || '';
        });

        spinnerElement.style.display = 'none'; // Ocultar el spinner
        buttonElement.disabled = false; // Habilitar el boton
    });
})();

// fetchCharacter(1).then(character => console.log(character));  // Asi se consume una promesa, con .then, y el argumento que recibe es el valor que resuelve la promesa