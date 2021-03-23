import React, { useState, useEffect } from 'react';
import PokemonList from './pokemonList';
import Pokemon from './pokemon';

export const Pokemons = () => {

    const defaultUrl = "https://pokeapi.co/api/v2/pokemon?limit=100";
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
    const [pokemonImage, setPokemonImage] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.results != null) {
                        setIsLoaded(true);
                        setPokemons(result.results); 
                    }
                    else {
                        setPokemons(null);
                        setIsLoaded(true);
                        setPokemon({
                            name: result.name, 
                            species: result.species.name, 
                            image: result.sprites.front_default,
                            weight: result.weight,
                            height: result.height
                        });
                        if (!pokemonImage.includes(result.id)) {
                            setPokemonImage(prevState => ([...prevState, result.id]));
                        }
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [url, pokemonImage])

    
    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    else if (pokemons != null) {
        return <PokemonList pokemons={pokemons} setUrl={setUrl} image={pokemonImage} />
    }
    else {
        return <Pokemon pokemon={pokemon} setUrl={() => setUrl(defaultUrl)} />
    }
}

export default Pokemons;