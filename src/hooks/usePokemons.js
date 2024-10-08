import { useCallback, useEffect } from "react";
import { useDispatchPokemon, usePokemonContext } from "../Context/pokemonCtx";
import { actions } from "../Context/pokemonReducer";
import { useFilterContext } from "../Context/filtersCtx";
import Pokedex from "pokedex-promise-v2";

const usePokemons = () => {
    const dispatch = useDispatchPokemon();
    const { filters } = useFilterContext();
    const { metadata, allPokemonNames } = usePokemonContext(); // Agregar `allPokemonNames`

    // Cargar todos los nombres de los Pokémon una vez
    const fetchAllPokemonNames = useCallback(async () => {
        const pokedex = new Pokedex();
        const response = await pokedex.getPokemonsList({ limit: 1025, offset: 0 }); // Obtener todos los nombres
        const allNames = response.results.map((pokemon) => pokemon.name); // Solo obtener los nombres
        dispatch({ type: actions.SET_ALL_POKEMON_NAMES, payload: allNames });
    }, [dispatch]);

    const fetchPokemons = useCallback(async () => {
        dispatch({ type: actions.SET_LOADING, payload: true });

        // Filtrar los nombres de Pokémon según el término de búsqueda
        const filteredNames = allPokemonNames.filter((name) =>
            name.includes(filters.search)
        );

        // Calcular la paginación solo sobre los resultados filtrados
        const paginatedNames = filteredNames.slice(
            filters.page * metadata.limit,
            (filters.page + 1) * metadata.limit
        );

        // Obtener los datos de los Pokémon paginados
        const pokedex = new Pokedex();
        const urls = paginatedNames.map((name) => `https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonsResponse = await pokedex.getResource(urls);

        dispatch({ type: actions.SET_POKEMONS, payload: pokemonsResponse });
        dispatch({ type: actions.SET_LOADING, payload: false });
    }, [dispatch, filters, metadata, allPokemonNames]);

    useEffect(() => {
        if (!allPokemonNames.length) {
            fetchAllPokemonNames(); // Solo cargar todos los nombres al inicio
        }
    }, [fetchAllPokemonNames, allPokemonNames]);

    useEffect(() => {
        if (allPokemonNames.length) {
            fetchPokemons(); // Obtener los Pokémon según la búsqueda y paginación
        }
    }, [fetchPokemons, allPokemonNames]);
};

export default usePokemons;
