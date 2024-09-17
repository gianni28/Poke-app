import './index.css';
import React, { useEffect, useState } from 'react';
import Pokedex from "pokedex-promise-v2";
import { useNavigate } from 'react-router-dom';

import HpIcon from '../../assets/HP.svg';
import CpIcon from '../../assets/CP.svg';
import WIcon from '../../assets/W.svg';
import HIcon from '../../assets/H.svg';

const interval = {
  limit: 151,
  offset: 0,
};

const ListPokemon = () => {
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
            setPokemons(pokemonsResponse); 
        };
    
        getPokemons();
    }, []);

    return (
        <div className="App">
            {pokemons.map((pokemon, index) => (
                <div key={pokemon.id} onClick={() => handlePokemonClick(pokemon.id)}> 
                    <div id="card">
                        <div id="contenedor-imagen">
                            <div id="puntos">{pokemon.id}</div>
                            <img id="imagen" src={pokemon.sprites.front_default} alt={pokemon.name} />
                        </div>
                        <div id="datos">
                            <div id="nombres">
                                <div id="nombre">{pokemon.name}
                                    <div id="tipo">{pokemon.types[0].type.name}</div>
                                </div>
                            </div>
                            <div id="info">
                                <div className="caja">
                                    <img src={HpIcon} alt="HP" /> {pokemon.stats.find(stat => stat.stat.name === "hp").base_stat}
                                </div>
                                <div className="caja">
                                    <img src={CpIcon} alt="CP" /> {Math.floor((pokemon.stats.find(stat => stat.stat.name === "attack").base_stat + pokemon.stats.find(stat => stat.stat.name === "defense").base_stat + pokemon.stats.find(stat => stat.stat.name === "hp").base_stat) / 3)}
                                </div>
                                <div className="caja">
                                    <img src={WIcon} alt="W" /> {pokemon.weight / 10}kg
                                </div>
                                <div className="caja">
                                    <img src={HIcon} alt="H" /> {pokemon.height / 10}m
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    
}

export default ListPokemon;
