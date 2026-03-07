import axios from 'axios';

export const getPokemon=async (url)=>{
    const res= await axios.get(url);
    return res.data;
};