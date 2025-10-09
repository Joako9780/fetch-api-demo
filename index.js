// https://cdn.thesimpsonsapi.com/500
const IMAGE_URL = 'https://cdn.thesimpsonsapi.com/500';
/**
 * 
 * @param {number} id -// El id del personaje que se quiere obtener 
 * @returns {Promise<Object>}  // El objeto que retorna es una promesa que se resuelve a un objeto
 */

const fetchCharacter = async (randomValue) => {  //id = 1 es un default value por si id no recibe ningun valor
    const response = await fetch(`https://thesimpsonsapi.com/api/characters/${randomValue}`);  // String interpolation, con lo cual se puede escapar algo, y se pide que se resuelva a algo que puede ser resuelto en primitico
    const character = await response.json();
    return character;  
};

// IIFE
(async () => {
    const character = await fetchCharacter(1);
    // Ocultar el spinner
    const spinnerElement = document.querySelector(".loader");
    spinnerElement.style.display = 'none';
    const characterElement = document.querySelector("#character");
    characterElement.textContent = JSON.stringify(character, null, 2); // El null y el 2 son para que se vea bonito el JSON, 2 es el nivel de indentacion
    const imageElement = document.querySelector('#character-image');
    imageElement.src = `${IMAGE_URL}${character.portrait_path}`;
    const buttonElement = document.querySelector('#fetch-button');
    buttonElement.disabled = false; // Habilitar el boton
    buttonElement.addEventListener('click', async () => {
        buttonElement.disabled = true; // Deshabilitar el boton
        spinnerElement.style.display = 'block'; // Mostrar el spinner

        let randomValue = 0;
        do {
           randomValue = Math.floor(Math.random() * 100) + 1; // 1 - 100
        } while (randomValue > 20); // Asi nos aseguramos que el id este entre 1 y 20, porque solo hay 20 personajes

        const character = await fetchCharacter(randomValue);
        spinnerElement.style.display = 'none'; // Ocultar el spinner
        characterElement.textContent = JSON.stringify(character, null, 2); // El null y el 2 son para que se vea bonito el JSON, 2 es el nivel de indentacion
        imageElement.src = `${IMAGE_URL}${character.portrait_path}`;
        buttonElement.disabled = false; // Habilitar el boton
    });
})();

// fetchCharacter(1).then(character => console.log(character));  // Asi se consume una promesa, con .then, y el argumento que recibe es el valor que resuelve la promesa