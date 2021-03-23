export const Pokemon = (props) => {

    return (
        <div>  
            <span className="linkSpan" onClick={props.setUrl}>All Pokémons</span>              
            <h2>{props.pokemon.name}</h2>
            <img src={props.pokemon.image} alt={props.pokemon.name} />
            <br />
            Height: {props.pokemon.height}
            <br /> 
            Weight: {props.pokemon.weight}
            <button>Remove</button>
        </div>
    );
}

export default Pokemon;