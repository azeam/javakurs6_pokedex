import { cap } from './helper';

export const PokemonCard = (props) => {

    const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    return (<div key={props.pokemon.name} className="card" onClick = {() => props.setUrl(props.pokemon.url)}>                
                <div className="container">
                    <h4><b>{cap(props.pokemon.name)}</b></h4>    
                </div>
                <img 
                    src={props.image.includes(props.pokemon.name) ? baseUrl + (props.pokemon.url.split('/')[6]) + ".png" : "#"} 
                    alt={props.image.includes(props.pokemon.name) ? cap(props.pokemon.name) : ""} 
                />
            </div>
        );
}

export default PokemonCard;