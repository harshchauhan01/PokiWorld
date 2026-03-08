import '../styles/home.css'
import React,{useState , useEffect} from 'react';
import {getPokemon} from "../services/pokeAPI"
import PokeCard from '../components/pokeCard';


export default function Home(){
    const [data,setData]=useState([]);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");

    useEffect(()=>{
        const loadData=async ()=>{
            const res=await getPokemon(url);
            setData(res);
        }
        loadData();
    },[url]);
    
    
    return(
        <div className='body'>
            
            <div className="heading">
                <h1>Pokemon World</h1>
            </div>
            <div className="buttons">
                <button disabled={data.previous==null} onClick={()=>{setUrl(data.previous)}}>Prev</button>
                <button disabled={data.next==null} onClick={()=>{setUrl(data.next)}}>Next</button>
            </div>
            <div className="showcase">
                {data?.results?.map((d)=>{
                    const idx=d.url.split('/')[6]
                    const imgUrl=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idx}.png`;
                    return(
                        <div className='cont-box' key={idx}>
                            <PokeCard id={idx} name={d.name} image={imgUrl} />
                        </div>
                    );
                })}
                
                
            </div>
            
        </div>
    );
}