export const actions = {
    SET_POKEMONS: "SET_POKEMONS",
    SET_POKEMON: "SET_POKEMON",
    SET_LOADING: "SET_LOADING",
    SET_ERROR: "SET_ERROR",
    SET_ALL_POKEMON_NAMES: "SET_ALL_POKEMON_NAMES", // Nueva acción
};

export const initialState = {
    pokemons: [],
    pokemon: {},
    loading: false,
    error: null,
    metadata: {
        total: 1025,
        limit: 51,
        offset: 0,
    },
    allPokemonNames: [], // Nuevo estado para guardar los nombres
};

export const pokemonReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
            };
        case actions.SET_ALL_POKEMON_NAMES: // Manejar todos los nombres de Pokémon
            return {
                ...state,
                allPokemonNames: action.payload,
            };
        case actions.SET_POKEMON:
            return {
                ...state,
                pokemon: action.payload,
            };
        case actions.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case actions.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
