import React from "react";

import { useNavigate } from "react-router-dom";
import "./index.css";

import HpIcon from '../../assets/HP.svg';
import CpIcon from '../../assets/CP.svg';
import WIcon from '../../assets/W.svg';
import HIcon from '../../assets/H.svg';

const PokemonCard = ({ pokemon }) => {
    const navigate = useNavigate();

    const handlePokemonClick = (id) => {
        navigate(`/detail/${id}`);
    }
    
    return(
        <div className="App">
            <div key={pokemon.id} onClick={() => handlePokemonClick(pokemon.id)}> 
                <div id="card">
                    <div id="contenedor-imagen">
                        <div id="puntos">{pokemon.id}</div>
                        <img id="imagen" src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
                    </div>
                    <div id="datos">
                        <div id="nombres">
                            <div id="nombre">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                <div id="tipo">{pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)}</div>
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
        </div>
    );
};

export default PokemonCard;