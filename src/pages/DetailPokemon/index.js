import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Pokedex from "pokedex-promise-v2";

import HpIcon from '../../assets/HP.svg';
import CpIcon from '../../assets/CP.svg';
import WIcon from '../../assets/W.svg';
import HIcon from '../../assets/H.svg';

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
            )}
            {loading && <p>Loading...</p>}
            {!loading && !pokemon && (<div>Pokemon not found 404</div>)}
            <Link to="/">Volver</Link>
        </>
    ]
};

export default DetailPokemon;