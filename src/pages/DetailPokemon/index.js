import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Pokedex from "pokedex-promise-v2";

import PokemonCard from "../../components/PokemonCard";
import "./index.css"

const DetailPokemon = () => {
    const { idPokemon } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPokemon = async () => {
            try{
                const pokedex = new Pokedex();
                const response = await pokedex.getResource(
                    `/api/v2/pokemon/${idPokemon}`
                );
                setPokemon(response)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getPokemon();
    }, [idPokemon]);

    return [
        <>
            {!loading && pokemon && (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            )}
            {loading && <p>Loading...</p>}
            {!loading && !pokemon && (<div>Pokemon not found 404</div>)}
            <Link to="/" className="back-link">Volver</Link>
        </>
    ]
};

export default DetailPokemon;