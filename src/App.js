import './index.css';
import React, { useEffect, useState } from 'react';
import Pokedex from "pokedex-promise-v2";
import { useNavigate } from 'react-router-dom';

const interval = {
  limit: 150,
  offset: 0,
};

const App = () => {
    const [pokemons, setPokemons] = useState([]); 
    const navigate = useNavigate();

    const handlePokemonClick = (id) => {
        navigate(`/detail/${id}`);
    }

    useEffect(() => {
        const getPokemons = async () => {
            const pokedex = new Pokedex();
            const response = await pokedex.getPokemonsList(interval);
            const urls = response.results.map((pokemon) => pokemon.url);
            const pokemonsResponse = await pokedex.getResource(urls);
            setPokemons(pokemonsResponse); // Guardamos los Pokémon
        };
    
        getPokemons();
    }, []);

    return (
        <div className="App">
        {pokemons.map((pokemon, index) => (
            <div className='pokemon' onClick={() => handlePokemonClick(pokemon.id)}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            </div>
        ))}
        </div>
    );
}

export default App;
