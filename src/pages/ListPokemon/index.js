import React, { useState } from 'react';

import SearchBox from "../../components/SearchBox";
import PokemonCard from "../../components/PokemonCard";
import Paginated from '../../components/Paginated';

import usePokemons from "../../hooks/usePokemons"
import { usePokemonContext } from "../../Context/pokemonCtx"

import './index.css';

const ListPokemon = () => {
    usePokemons();
    const { pokemons, loading, metadata: { total, limit } } = usePokemonContext();
    const [page, setPage] = useState(0);

    return (
        <div className='App'>
            <div className="content-wrapper">
                <SearchBox />
                {!loading && (
                    <div className="pokemon-grid">
                        {pokemons.map((pokemon, index) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>
                )}
                <div className="pagination-container">
                    <Paginated page={page} total={total / limit} setPage={setPage} />
                </div>
            </div>
        </div>
    );
    
}

export default ListPokemon;
