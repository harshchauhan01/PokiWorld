import React, { useState, useEffect } from 'react';
import { getPokemon } from "../services/pokeAPI";
import PokeCard from '../components/pokeCard';
import {useNavigate} from "react-router-dom"

export default function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const res = await getPokemon(url);
            setData(res);
            setLoading(false);
        };
        loadData();
    }, [url]);

    const getPageInfo = () => {
        const params = new URL(url).searchParams;
        const offset = parseInt(params.get('offset')) || 0;
        const limit = parseInt(params.get('limit')) || 20;
        const currentPage = Math.floor(offset / limit) + 1;
        const totalPages = data.count ? Math.ceil(data.count / limit) : 1;
        return { currentPage, totalPages };
    };

    const { currentPage, totalPages } = getPageInfo();

    const handleNavigation = (newUrl) => {
        setUrl(newUrl);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlexplore = (id,name) => {
        navigate(`/pokemon/${name}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#080810] via-[#0d0d1a] to-[#0f0f24] relative overflow-x-hidden">
            
            {/* Animated Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute w-[600px] h-[600px] -top-48 -right-24 rounded-full bg-[radial-gradient(circle,_#6C5CE7_0%,_transparent_70%)] blur-[80px] opacity-50 animate-float" />
                <div className="absolute w-[500px] h-[500px] -bottom-36 -left-36 rounded-full bg-[radial-gradient(circle,_#7C6FF0_0%,_transparent_70%)] blur-[80px] opacity-50 animate-float-reverse" />
                <div className="absolute w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_#A29BFE_0%,_transparent_70%)] blur-[80px] opacity-30 animate-pulse-slow" />
                
                {/* Grid Pattern */}
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(108, 92, 231, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(108, 92, 231, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Header Section */}
            <header className="relative z-10 text-center pt-12 pb-8 px-5 md:pt-16">
                {/* Logo Wrapper */}
                <div className="flex items-center justify-center gap-4 md:gap-5 mb-5">
                    {/* Pokeball Icon */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-b from-[#ff4757] from-50% to-white to-50% border-4 border-[#2d2d44] shadow-[0_4px_20px_rgba(108,92,231,0.4),inset_0_-2px_10px_rgba(0,0,0,0.2)] animate-bounce-slow">
                        {/* Line */}
                        <div className="absolute top-1/2 -left-1 -right-1 h-1.5 bg-[#2d2d44] -translate-y-1/2" />
                        {/* Center */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-4 border-[#2d2d44] z-10">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#6C5CE7] shadow-[0_0_10px_#6C5CE7]" />
                        </div>
                    </div>

                    {/* Logo Text */}
                    <h1 className="text-6xl md:text-7xl lg:text-9xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] bg-clip-text text-transparent">
                            Poké
                        </span>
                        <span className="text-white drop-shadow-[0_0_40px_rgba(108,92,231,0.5)]">
                            World
                        </span>
                    </h1>
                </div>

                {/* Tagline */}
                <p className="text-white/60 text-base md:text-lg max-w-md mx-auto mb-7 leading-relaxed px-4">
                    Discover, explore, and catch 'em all in the ultimate Pokémon encyclopedia
                </p>

                
            </header>

            {/* Navigation */}
            <NavigationBar 
                data={data}
                currentPage={currentPage}
                totalPages={totalPages}
                onNavigate={handleNavigation}
            />

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 pb-10">
                {loading ? (
                    <LoadingState />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                        {data?.results?.map((d, index) => {
                            const idx = d.url.split('/')[6];
                            const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idx}.png`;

                            return (
                                <div key={idx} className="w-full flex justify-center">
                                    <PokeCard
                                        id={idx}
                                        name={d.name}
                                        image={imgUrl}
                                        delay={index * 50}
                                        onExplore={handlexplore}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Bottom Navigation */}
            {!loading && data.results?.length > 0 && (
                <div className="mt-12 pb-8">
                    <NavigationBar 
                        data={data}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNavigate={handleNavigation}
                    />
                </div>
            )}

            

            {/* Footer */}
            <footer className="relative z-10 py-12 px-5 bg-gradient-to-t from-[#6C5CE7]/5 to-transparent border-t border-[#6C5CE7]/15">
                <div className="max-w-lg mx-auto text-center">
                    <div className="text-2xl font-bold mb-4">
                        <span className="text-[#6C5CE7]">Poké</span>
                        <span className="text-white">World</span>
                    </div>
                    <p className="text-white/60 mb-2">
                        Made with 💜 for Pokémon fans everywhere
                    </p>
                    <p className="text-white/40 text-sm">
                        Created By HC@groups
                    </p>
                </div>
            </footer>
        </div>
    );
}

// Navigation Bar Component
function NavigationBar({ data, currentPage, totalPages, onNavigate }) {
    return (
        <nav className="relative z-10 flex items-center justify-center gap-3 sm:gap-5 px-5 py-6 max-w-2xl mx-auto">
            <button
                disabled={!data.previous}
                onClick={() => onNavigate(data.previous)}
                className="group flex items-center gap-2 px-4 sm:px-7 py-3 rounded-full border-2 border-[#6C5CE7] bg-[#6C5CE7]/10 text-[#A29BFE] font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-300 hover:bg-gradient-to-r hover:from-[#6C5CE7] hover:to-[#7C6FF0] hover:text-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(108,92,231,0.4)] hover:border-transparent disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-[#6C5CE7]/10 disabled:hover:text-[#A29BFE] disabled:hover:border-[#6C5CE7]"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 bg-[#6C5CE7]/15 rounded-full border border-[#6C5CE7]/25">
                <span className="text-lg sm:text-xl font-bold text-[#6C5CE7]">{currentPage}</span>
                <span className="text-xs sm:text-sm text-white/40">of</span>
                <span className="text-base sm:text-lg font-medium text-white/60">{totalPages}</span>
            </div>

            <button
                disabled={!data.next}
                onClick={() => onNavigate(data.next)}
                className="group flex items-center gap-2 px-4 sm:px-7 py-3 rounded-full border-2 border-[#6C5CE7] bg-[#6C5CE7]/10 text-[#A29BFE] font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-300 hover:bg-gradient-to-r hover:from-[#6C5CE7] hover:to-[#7C6FF0] hover:text-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(108,92,231,0.4)] hover:border-transparent disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-[#6C5CE7]/10 disabled:hover:text-[#A29BFE] disabled:hover:border-[#6C5CE7]"
            >
                <span className="hidden sm:inline">Next</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </nav>
    );
}

// Loading State Component
function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center py-24">
            {/* Spinning Pokeball */}
            <div className="relative w-24 h-24 mb-8">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#ff4757] from-50% to-white to-50% border-[5px] border-[#2d2d44] animate-spin">
                    {/* Line */}
                    <div className="absolute top-1/2 -left-[5px] -right-[5px] h-2 bg-[#2d2d44] -translate-y-1/2" />
                    {/* Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-[5px] border-[#2d2d44]" />
                </div>
            </div>

            <p className="text-white text-xl font-semibold mb-4">
                Catching Pokémon...
            </p>

            {/* Loading Dots */}
            <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#6C5CE7] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-3 h-3 rounded-full bg-[#6C5CE7] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-3 h-3 rounded-full bg-[#6C5CE7] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    );
}