import { cap } from './helper';

const PokemonDetails = (props) => {

    // add to array of pokemons to remove and update url to default (list all)
    function remove(name) {
        props.handleRemove(name); 
        props.setUrl();
    }

    return (
        <div>  
            <span className="linkSpan" onClick={props.setUrl}>&#8592; Back to Pokémon list</span> 
            <br /><br />
            <div className="singlePokemon">
                <h2>{cap(props.pokemon.name)}</h2>
                <img src={props.pokemon.image} alt={cap(props.pokemon.name)} />
                <br />
                <b>Height:</b> {props.pokemon.height}
                <br /> 
                <b>Weight:</b> {props.pokemon.weight}
                <br /><br />
                <b>Abilities:</b> <ul>{
                        props.pokemon.abilities.map((abilites, index) => (
                            <li key={index}>{cap(abilites.ability.name)}</li>    
                        ))  
                    }
                </ul>
                <br />
                <b>Forms:</b> <ul>{
                        props.pokemon.forms.map((form, index) => (
                            <li key={index}>{cap(form.name)}</li>    
                        ))  
                    }
                </ul>
                <br /><br />
                <button className="button" onClick={() => remove(props.pokemon.name)}>Delete</button>
            </div>
        </div>
    );
}

export default PokemonDetails;