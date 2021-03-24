export const PokemonList = (props) => {

    const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    
    return (
        <div>
            {
                props.pokemons.map((pokemon) => (
                    <div key={pokemon.name} className="card" onClick = {() => props.setUrl(pokemon.url)}>
                        <img 
                            src={props.image.includes(pokemon.name) ? baseUrl + (pokemon.url.split('/')[6]) + ".png" : "#"} 
                            alt={props.image.includes(pokemon.name) ? pokemon.name : ""} 
                        />
                        <div className="container">
                            <h4><b>{pokemon.name}</b></h4>
                            <button onClick={(e) => {
                                e.stopPropagation(); 
                                props.handleRemove(pokemon.name)
                            }}>
                                Remove
                            </button>
                            
                        </div>
                    </div>
                ))  
            }
        </div>
    );
}

export default PokemonList;