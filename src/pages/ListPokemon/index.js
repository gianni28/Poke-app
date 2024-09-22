import React, { useCallback, useEffect, useState } from 'react';
import Pokedex from "pokedex-promise-v2";

import SearchBox from "../../components/TEMPSearchBox";
import PokemonCard from "../../components/PokemonCard";
import Paginated from '../../components/Paginated';

import './index.css';

const interval = {
  limit: 50,
  offset: 0,
};

const total = 1025;

const ListPokemon = () => {
    const [pokemons, setPokemons] = useState([]); 
    const [searched, setSearched] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    
    const handleSearch = (search) => {
        const filtered = pokemons.filter((pokemon) => pokemon.name.includes(search));
        setSearched(filtered);
    }
    
    const fetchPokemons = useCallback(async () => {
        setLoading(true)
        const pokedex = new Pokedex();
        const response = await pokedex.getPokemonsList({ ...interval, offset: page * interval.limit });
        const urls = response.results.map((pokemon) => pokemon.url);
        const pokemonsResponse = await pokedex.getResource(urls);
        setPokemons(pokemonsResponse); 
        setSearched(pokemonsResponse);
        setLoading(false)
    }, [page, setPokemons, setSearched]);

    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons]);

    useEffect (() => {

    }, [page])

    return (
        <div className='App'>
            <div className="content-wrapper">
                <SearchBox onSearch={handleSearch} />
                {!loading && (
                    <div className="pokemon-grid">
                        {searched.map((pokemon, index) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>
                )}
                <div className="pagination-container">
                    <Paginated page={page} total={total / interval.limit} setPage={setPage} />
                </div>
            </div>
        </div>
    );
    
}

export default ListPokemon;
