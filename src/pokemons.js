import React, { useState, useEffect } from 'react';
import PokemonList from './pokemonList';
import Pokemon from './pokemon';

export const Pokemons = () => {

    const defaultUrl = "https://pokeapi.co/api/v2/pokemon?limit=100";
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [url, setUrl] = useState(defaultUrl);
    const [pokemons, setPokemons] = useState([]);
    const [pokemonDetails, setPokemonDetails] = useState({
        name: "",
        species: "",
        image: "",
        height: "",
        weight: ""
    });
    const [pokemonImage, setPokemonImage] = useState([]);
    const [pokemonsToRemove, setPokemonsToRemove] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.results != null) {
                        setIsLoaded(true);
                        setPokemonDetails(null); 
                        const newList = result.results.filter((item) => !pokemonsToRemove.includes(item.name));
                        setPokemons(newList);
                    }
                    else {
                        setIsLoaded(true);
                        setPokemonDetails({
                            name: result.name, 
                            species: result.species.name, 
                            image: result.sprites.front_default,
                            weight: result.weight,
                            height: result.height
                        });
                        if (!pokemonImage.includes(result.name)) {
                            setPokemonImage(prevState => ([...prevState, result.name]));
                        }
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [url, pokemonImage, pokemonsToRemove])

    function removePokemon(name) {
        if (!pokemonsToRemove.includes(name)) {
            setPokemonsToRemove(prevState => ([...prevState, name]));
        }
    } 
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    else if (pokemonDetails !== null) {
        return <Pokemon 
                    setUrl={() => setUrl(defaultUrl)}
                    pokemon={pokemonDetails} 
                />
    }
    else {
        return <PokemonList 
                    handleRemove={removePokemon} 
                    pokemons={pokemons} 
                    setUrl={setUrl} 
                    image={pokemonImage} 
                />        
    }
}

export default Pokemons;