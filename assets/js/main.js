const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const popup = document.getElementById('popup')

const maxRecords = 151
const limit = 151
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li onclick="teste(this.id)" id="${pokemon.number}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types?.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"alt="${pokemon.name}">
            </div>
        </li>
    `
}

pokemonList.addEventListener('click', function (e) {
    return idPokemon = e.target.id
})

function loadPopup(idPokemon) {
    var armz = parseInt(idPokemon)
    console.log(armz)

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml2 = convertPokemonToPopup(pokemons[armz - 1])
        popup.innerHTML = newHtml2
    }
    )
}

function convertPokemonToPopup(pokemon) {
    window.scrollTo(0, 0)
    return `
            <div class="popup ${pokemon.type}" id="popup">
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
                <img class="imgPokemon" src="${pokemon.photo}">
            </div>
            <div class="hab_alt">
                <div class="habilidades">
                ${pokemon.Abilities.map((ability) => `<h3>Tipo: ${ability}</h3>`).join('')}
                </div>
                <div class="altura_peso">
                    <h3>Altura: ${pokemon.Height} M</h3>
                    <h3>Peso: ${pokemon.Weight} KG</h3>
                </div>
            </div>
            </div>
    `
}

function teste(id) {
    loadPopup(id)
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        console.log("pokemons iniciais", pokemons)

        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    }
    )
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage > maxRecords) {
        console.log("entrou no if e carregou mais")
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit + 10)

    } else {
        console.log("sem adicionar")
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
})