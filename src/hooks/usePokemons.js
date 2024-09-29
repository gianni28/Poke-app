import { useCallback, useEffect } from "react";
import { useDispatchPokemon } from "../Context/pokemonCtx"
import { actions } from "../Context/pokemonReducer"
import { useFilterContext } from "../Context/filtersCtx";
import { usePokemonContext } from "../Context/pokemonCtx";

import Pokedex from "pokedex-promise-v2";

const usePokemons = () => {
    const dispatch = useDispatchPokemon();
    const { filters } = useFilterContext();
    const { metadata } = usePokemonContext();

    const fetchPokemons = useCallback(async () => {
        dispatch({ type: actions.SET_LOADING, payload: true })
        const pokedex = new Pokedex();
        const response = await pokedex.getPokemonsList({ 
            ...metadata, 
            offset: filters.page * metadata.limit 
        });
        const urls = response.results.map((pokemon) => pokemon.url);
        const pokemonsResponse = await pokedex.getResource(urls);
        const filterResponse = pokemonsResponse.filter ((p) => p.name.includes(filters.search));
        dispatch({ type: actions.SET_POKEMONS, payload: filterResponse });
        dispatch({ type: actions.SET_LOADING, payload: false });
    }, [dispatch, filters, metadata]);

    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons]);
};

export default usePokemons;