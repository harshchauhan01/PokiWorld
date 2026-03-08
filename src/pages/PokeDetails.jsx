import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {getPokemon} from "../services/pokeAPI";

const PokeDetails = () => {
    const {name}=useParams();
    const [data,setData]=useState([]);
    const fectchData= async ()=>{
        const res = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setData(res);
    };
    useEffect(()=>{
        fectchData();
    },[]);
    return(
        <div>
            <h1>{name}</h1>
        </div>
    );
};

export default PokeDetails;