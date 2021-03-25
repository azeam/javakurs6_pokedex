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
        weight: "",
        abilities: [],
        forms: []
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
                        // compare list with pokemons to remove and show only non matches
                        const pokemonList = result.results.filter((item) => !pokemonsToRemove.includes(item.name));
                        setPokemons(pokemonList);
                    }
                    else {
                        setIsLoaded(true);
                        console.log(result);
                        setPokemonDetails({
                            name: result.name, 
                            species: result.species.name, 
                            image: result.sprites.front_default,
                            weight: result.weight,
                            height: result.height,
                            abilities: result.abilities,
                            forms: result.forms
                        });
                        // make list of images to show (names of visited pokemons)
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

    // add to array of pokemons to remove
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
    // show single pokemon
    else if (pokemonDetails !== null) {
        return <Pokemon 
                    setUrl={() => setUrl(defaultUrl)}
                    pokemon={pokemonDetails} 
                    handleRemove={removePokemon} 
                />
    }
    // show all pokemons
    else {
        return <PokemonList 
                    pokemons={pokemons} 
                    setUrl={setUrl} 
                    image={pokemonImage} 
                />        
    }
}

export default Pokemons;