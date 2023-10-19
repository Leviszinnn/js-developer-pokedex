const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const popup = document.getElementById('popup')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    console.log(pokemon)
    return `
        <li onclick="teste(this.id)" id="${pokemon.name}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"alt="${pokemon.name}">
            </div>
        </li>
    `
}


function convertPokemonToPopup(pokemon) {
    return `
            <div class="cabecalho">
                <div class="nome_tipo">
                    <h2>Nome: ${pokemon.name}</h2>
                    ${pokemon.types.map((type) => `<h3>Tipo: ${type}</h3>`).join('')}
                </div>
                <div class="n_pokedex">
                    <h3>Numero da Pokedex: ${pokemon.number}</h3>
                </div>
            </div>
            <div class="img_pokedex">
                <img src="${pokemon.photo}">
            </div>
            <div class="hab_alt">
                <div class="habilidades">

                </div>
                <div class="altura_peso">
                    <h3>Altura: ${pokemon.Height}</h3>
                    <h3>Peso: ${pokemon.Weight}</h3>
                </div>
            </div>
    `
}

function loadPopup() {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml2 = pokemons.map((pokemon) => convertPokemonToPopup(pokemon)).join('')
        
        popup.innerHTML += newHtml2
    }
    )
}

function teste() {
    loadPopup()
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    }
    )
}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})