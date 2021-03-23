import React, { useState, useEffect } from 'react';
import PokemonList from './pokemonList';
import Pokemon from './pokemon';


const defaultUrl = "https://pokeapi.co/api/v2/pokemon?limit=100";

export const Pokemons = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [url, setUrl] = useState(defaultUrl);
    const [pokemons, setPokemons] = useState([]);
    const [pokemon, setPokemon] = useState({
        name: "",
        species: "",
        image: "",
        height: "",
        weight: ""
    });

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.results != null) {
                        console.log(result);
                        setIsLoaded(true);
                        setPokemons(result.results);    
                    }
                    else {
                        console.log(result);
                        setPokemons(null);
                        setIsLoaded(true);
                        setPokemon({
                            name: result.name, 
                            species: result.species.name, 
                            image: result.sprites.front_default,
                            weight: result.weight,
                            height: result.height
                        });
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
        return <PokemonList pokemons={pokemons} setUrl={setUrl} />
    }
    else {
        return <Pokemon pokemon={pokemon} setUrl={() => setUrl(defaultUrl)} />
    }
}

export default Pokemons;