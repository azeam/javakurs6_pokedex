import React, { useState, useEffect } from 'react';

const defaultUrl = "https://pokeapi.co/api/v2/pokemon?limit=100";

export const Pokemons = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [url, setUrl] = useState(defaultUrl);
    const [pokemons, setPokemons] = useState([]);
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [pokemonImages, setPokemonImages] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setIsLoaded(true);
                    if (result.results != null) {
                        setPokemons(result.results);
                    }
                    else {
                        setPokemons(null);
                        setPokemonDetails(result);
                        setPokemonImages(result.sprites);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [url])

    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    else if (pokemons != null) {
        return (
        <ul className="pokemonList" >
            {
                pokemons.map(pokemon => (
                    <li key={pokemon.name} onClick = {() => setUrl(pokemon.url)}>
                        {pokemon.name}
                    </li>
                ))  
            }
        </ul>
        );
    }
    else {
        return (
            <div>  
                <span className="linkSpan" onClick={() => setUrl(defaultUrl)}>All Pokémons</span>              
                <h2>{pokemonDetails.name}</h2>
                <img src={pokemonImages.front_default} alt={pokemonDetails.name} />
            </div>
        );
    }
}

export default Pokemons;