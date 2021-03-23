export const PokemonList = (props) => {

    const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    
    return (
        <ul className="pokemonList" >
            {
                props.pokemons.map((pokemon, index) => (
                    <li key={pokemon.name} onClick = {() => props.setUrl(pokemon.url)}>
                        {pokemon.name}
                        <img 
                            src={props.image.includes(index) ? baseUrl + index + ".png" : ""} 
                            alt={props.image.includes(index) ? pokemon.name : ""} 
                        />
                    </li>
                ))  
            }
        </ul>
    );
}

export default PokemonList;