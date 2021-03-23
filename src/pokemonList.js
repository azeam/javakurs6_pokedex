export const PokemonList = (props) => {
    return (
        <ul className="pokemonList" >
            {
                props.pokemons.map(pokemon => (
                    <li key={pokemon.name} onClick = {() => props.setUrl(pokemon.url)}>
                        <img src={props.image} alt={""} />
                        {pokemon.name}
                    </li>
                ))  
            }
        </ul>
    );
}

export default PokemonList;