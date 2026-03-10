import { useEffect, useState } from "react";
import axios from "axios";



const Challenge=()=>{
    const [guessPok]=useState(Math.floor(Math.random()*1024)+1)
    const [pokemonData,setPokemonData]=useState("");
    useEffect(()=>{
        const fetchPokDet=async()=>{
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${guessPok}`)
            setPokemonData(res.data);
        }
        fetchPokDet();
    },[guessPok]);
    const getMainSprite=()=>{
        if(!pokemonData)return "";
        return pokemonData.sprites.other['official-artwork'].front_default;
    };
    return(
        <div>
            <div>
                <h1>{pokemonData.name}</h1>
                <h1>{guessPok}</h1>
                <img alt={pokemonData.name} src={getMainSprite()} className="brightness-0"/>
            </div>
        </div>
    );
};

export default Challenge;