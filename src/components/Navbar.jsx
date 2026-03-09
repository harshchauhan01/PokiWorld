import React, { useRef, useState, useCallback, memo, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {Trie} from "../utils/trie";


const Navbar = memo(() => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showsuggestions, setShowSuggestions] = useState(false);
    const trieRef = useRef(new Trie());

    useEffect(()=>{
        const fetchAllPokemon=async ()=>{
            const res=await fetch("https://pokeapi.co/api/v2/pokemon?limit=1300");

            const data=await res.json();
            data.results.forEach(p => {
                trieRef.current.insert(p.name);
            });
        };
        fetchAllPokemon();
    },[]);

    const handleChange=useCallback((e)=>{
        const value=e.target.value.toLowerCase();
        setSearch(value);
        if(!value){
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        const res=trieRef.current.suggestions(value,5);
        setSuggestions(res);
        setShowSuggestions(true);
    },[]);
    


    const handleSearch = useCallback((e) => {
        e.preventDefault();
        const trimmedSearch = search.trim();
        if (!trimmedSearch) return;
        navigate(`/pokemon/${trimmedSearch.toLowerCase()}`);
        setSearch("");
    }, [search, navigate]);

    const handleLogoClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const clearSearch = useCallback(() => {
        setSearch("");
    }, []);

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#080810]/85 border-b border-[#6C5CE7]/20 shadow-[0_4px_30px_rgba(108,92,231,0.1)]">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                
                {/* Logo Section */}
                <div
                    className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
                    onClick={handleLogoClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
                    aria-label="Go to home page"
                >
                    {/* Animated Pokeball Logo */}
                    <div className="relative w-9 h-9 rounded-full bg-gradient-to-b from-[#ff4757] from-50% to-white to-50% border-[3px] border-[#2d2d44] shadow-[0_2px_15px_rgba(108,92,231,0.4)] transition-all duration-500 group-hover:rotate-[360deg] group-hover:shadow-[0_2px_20px_rgba(108,92,231,0.6)]">
                        {/* Horizontal Line */}
                        <div className="absolute top-1/2 -left-[3px] -right-[3px] h-[3px] bg-[#2d2d44] -translate-y-1/2" />
                        {/* Center Button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-[#2d2d44] z-10">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#6C5CE7] shadow-[0_0_8px_#6C5CE7] group-hover:shadow-[0_0_12px_#A29BFE]" />
                        </div>
                    </div>
                    
                    {/* Logo Text */}
                    <h1 className="font-extrabold text-xl sm:text-2xl tracking-tight transition-all duration-300">
                        <span className="bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] bg-clip-text text-transparent">
                            Poké
                        </span>
                        <span className="text-white drop-shadow-[0_0_20px_rgba(108,92,231,0.4)]">
                            World
                        </span>
                    </h1>
                </div>

                {/* Search Form */}
                <form 
                    onSubmit={handleSearch} 
                    className={`
                        relative flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2.5 
                        transition-all duration-300 ease-out
                        border backdrop-blur-md
                        ${isFocused 
                            ? 'bg-[#6C5CE7]/15 border-[#6C5CE7]/50 shadow-[0_0_25px_rgba(108,92,231,0.25)] scale-[1.02]' 
                            : 'bg-[#6C5CE7]/10 border-[#6C5CE7]/20 hover:border-[#6C5CE7]/35 hover:bg-[#6C5CE7]/12'
                        }
                    `}
                >
                    <Search 
                        className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                            isFocused ? 'text-[#A29BFE] scale-110' : 'text-white/50'
                        }`}
                    />
                    
                    <input 
                        type="text" 
                        placeholder="Search Pokémon..." 
                        value={search} 
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        className="bg-transparent outline-none text-white placeholder:text-white/40 w-28 sm:w-44 md:w-56 text-sm font-medium"
                        aria-label="Search for a Pokémon"
                    />
                    {showsuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-[#080810] border border-[#6C5CE7]/30 rounded-xl shadow-lg overflow-hidden z-50">
                            {suggestions.map((name) => (
                                <div
                                    key={name}
                                    onClick={() => {
                                        navigate(`/pokemon/${name}`);
                                        setSearch("");
                                        setShowSuggestions(false);
                                    }}
                                    className="px-4 py-2 text-sm text-white hover:bg-[#6C5CE7]/20 cursor-pointer capitalize"
                                >
                                    {name}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Clear Button */}
                    {search && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
                            aria-label="Clear search"
                        >
                            <X className="w-3.5 h-3.5 text-white/50 hover:text-white/80" />
                        </button>
                    )}

                    {/* Search Button */}
                    <button
                        type="submit"
                        disabled={!search.trim()}
                        className={`
                            px-3 py-1.5 rounded-lg text-xs font-semibold
                            transition-all duration-300 ease-out
                            ${search.trim() 
                                ? 'bg-gradient-to-r from-[#6C5CE7] to-[#7C6FF0] text-white shadow-[0_2px_10px_rgba(108,92,231,0.4)] hover:shadow-[0_4px_20px_rgba(108,92,231,0.5)] hover:-translate-y-0.5 active:translate-y-0' 
                                : 'bg-[#6C5CE7]/20 text-white/30 cursor-not-allowed'
                            }
                        `}
                    >
                        Go
                    </button>
                </form>
            </div>

            {/* Subtle gradient line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6C5CE7]/50 to-transparent" />
        </nav>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;