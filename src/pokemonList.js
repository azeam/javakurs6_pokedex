import { cap } from './helper';

export const PokemonList = (props) => {

    const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    
    return (
        <div>
            {
                props.pokemons.map((pokemon) => (
                    <div key={pokemon.name} className="card" onClick = {() => props.setUrl(pokemon.url)}>
                        
                        <div className="container">
                            <h4><b>{cap(pokemon.name)}</b></h4>    
                        </div>
                        <img 
                            src={props.image.includes(pokemon.name) ? baseUrl + (pokemon.url.split('/')[6]) + ".png" : "#"} 
                            alt={props.image.includes(pokemon.name) ? cap(pokemon.name) : ""} 
                        />
                    </div>
                ))  
            }
        </div>
    );
}

export default PokemonList;