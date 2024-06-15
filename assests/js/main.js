const pokeContainer = document.querySelector ('.pokemons');
const pokemonCount = 51;
const colors = {
    fire: '#FF7F7F',
    grass: '#9BCD9B',   
    electric: '#FFD700',  
    water: '#6495ED',     
    ground: '#CD853F',
    rock: '#A9A9A9',
    fairy: '#FFB5C5',    
    poison: '#BA55D3',    
    bug: '#32CD32',       
    dragon: '#8470FF',    
    psychic: '#FF69B4',   
    flying: '#87CEEB',   
    fighting: '#CD5C5C',  
    normal: '#D3D3D3'     
};
const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();

    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add('pokemonCard');

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];

    card.style.backgroundColor = color;

    const popup = document.querySelector('.popup');
    const popupPokeImg = document.querySelector('.poke-img');
    const popupButton = document.getElementById('popup-close-button');
    const popupBackground = document.querySelector('.popup-background');

    const popupPokeName = document.querySelector('#popup-poke-name');
    const popupPokeType = document.querySelector('#popup-poke-type');

    

    const pokemonInnerHTML = 
    `<li class="pokemon" id="${name}">
        <span class="number">#${id}</span>
        <span class="nome">${name}</span>

        <div class="detalhes">
                <ol class="tipos">
                    <li class="tipo">${pokeTypes[0]}</li>
                    <li class="tipo">${pokeTypes[1]}</li>
                </ol>

            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name} imagem">
        </div>
            
    </li>`;

    card.addEventListener('click', () => {
        console.log(`Você clicou no Pokémon ${name}!`);
        // card info
        popup.classList.add('activate');
        popupBackground.classList.add('activate-background');
        popup.classList.remove('disable');
        popupBackground.classList.remove('disable');

        popup.style.backgroundColor = color;
        popupPokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`;
        popupPokeName.innerHTML = `${name}`;
        popupPokeType.innerHTML = `Tipo ${type}`;
        // popupPokeType.style.color = color;

    });
    
    popupButton.addEventListener('click', ()=>{
        popup.classList.add('disable');
        popup.classList.remove('activate');
        popupBackground.classList.add('disable');
        popupBackground.classList.remove('activate-background');
        
    });

    popupBackground.addEventListener('click', ()=> {
        popup.classList.add('disable');
        popup.classList.remove('activate');
        popupBackground.classList.add('disable');
        popupBackground.classList.remove('activate-background');
    });

    card.innerHTML = pokemonInnerHTML;

    pokeContainer.appendChild(card);
}

fetchPokemons();
