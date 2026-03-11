import React, { useState, useEffect } from 'react';
import { getPokemon } from "../services/pokeAPI";
import PokeCard from '../components/pokeCard';
import { useNavigate } from "react-router-dom"

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

    const handlexplore = (id, name) => {
        navigate(`/pokemon/${name}`);
    };

    const handleChallenge = () => {
        navigate('/challenge');
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
            <header className="relative z-10 text-center pt-12 pb-8 px-5 md:pt-36">
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

            {/* Challenge Section */}
            <ChallengeSection onChallenge={handleChallenge} />
            
            {/* Explore Section Header */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 mb-12 text-center">
                {/* Animated Dots */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#6C5CE7] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#7C6FF0] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#A29BFE] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
                    <span className="bg-gradient-to-r from-white via-[#A29BFE] to-white bg-clip-text text-transparent">
                        Explore All Pokémon
                    </span>
                </h2>
                
                <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
                    Click on any Pokémon card below to view detailed information
                </p>

                <div className="flex items-center justify-center gap-3 mt-6">
                    <span className="w-12 h-1 rounded-full bg-gradient-to-r from-[#6C5CE7] to-transparent" />
                    <span className="w-2 h-2 rounded-full bg-[#6C5CE7]" />
                    <span className="w-8 h-1 rounded-full bg-[#A29BFE]" />
                    <span className="w-2 h-2 rounded-full bg-[#A29BFE]" />
                    <span className="w-12 h-1 rounded-full bg-gradient-to-l from-[#6C5CE7] to-transparent" />
                </div>
            </div>

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

// Challenge Section Component
function ChallengeSection({ onChallenge }) {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 my-16 md:my-24">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#16162a] to-[#1a1a2e] border border-[#6C5CE7]/30 shadow-[0_0_60px_rgba(108,92,231,0.15)]">
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating Question Marks */}
                    <div className="absolute top-6 left-10 text-7xl md:text-8xl text-[#6C5CE7]/10 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '3s' }}>?</div>
                    <div className="absolute top-16 right-16 text-5xl md:text-6xl text-[#A29BFE]/10 animate-bounce" style={{ animationDelay: '500ms', animationDuration: '2.5s' }}>?</div>
                    <div className="absolute bottom-12 left-20 text-6xl md:text-7xl text-[#7C6FF0]/10 animate-bounce" style={{ animationDelay: '1000ms', animationDuration: '3.5s' }}>?</div>
                    <div className="absolute bottom-6 right-10 text-8xl md:text-9xl text-[#6C5CE7]/10 animate-bounce" style={{ animationDelay: '1500ms', animationDuration: '2.8s' }}>?</div>
                    
                    {/* Glowing Orbs */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#6C5CE7]/20 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-[#A29BFE]/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#7C6FF0]/10 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Main Content Container - Centered */}
                <div className="relative flex flex-col items-center justify-center gap-10 md:gap-14 p-8 md:p-12 lg:p-16 xl:p-20">
                    
                    {/* Mystery Pokemon Silhouette - Centered & Larger */}
                    <div className="relative flex-shrink-0">
                        <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                            {/* Outer Glowing Ring */}
                            <div className="absolute -inset-4 rounded-full border-4 border-[#6C5CE7]/30 animate-ping opacity-20" />
                            <div className="absolute -inset-2 rounded-full border-2 border-[#A29BFE]/20 animate-pulse" />
                            <div className="absolute inset-0 rounded-full border-4 border-[#6C5CE7]/50 animate-pulse" />
                            <div className="absolute inset-3 rounded-full border-2 border-[#A29BFE]/30" />
                            
                            {/* Silhouette Container */}
                            <div className="absolute inset-6 md:inset-8 rounded-full bg-gradient-to-br from-[#2d2d44] to-[#1a1a2e] flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.6),_0_0_30px_rgba(108,92,231,0.3)]">
                                {/* Mystery Pokemon Icon */}
                                <svg className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-[#6C5CE7] drop-shadow-[0_0_15px_rgba(108,92,231,0.6)]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"/>
                                </svg>
                            </div>
                            
                            {/* Sparkles - Repositioned */}
                            <div className="absolute -top-2 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
                            <div className="absolute bottom-4 -left-2 w-2.5 h-2.5 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '500ms' }} />
                            <div className="absolute top-1/2 -right-3 w-2 h-2 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '1000ms' }} />
                            <div className="absolute -top-1 left-6 w-2 h-2 bg-[#A29BFE] rounded-full animate-ping" style={{ animationDelay: '750ms' }} />
                            <div className="absolute -bottom-1 right-8 w-2.5 h-2.5 bg-[#6C5CE7] rounded-full animate-ping" style={{ animationDelay: '1250ms' }} />
                        </div>
                    </div>

                    {/* Content - Centered */}
                    <div className="flex-1 text-center max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-[#ff4757]/20 to-[#ff6b7a]/20 border border-[#ff4757]/30">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4757] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff4757]"></span>
                            </span>
                            <span className="text-[#ff6b7a] text-sm font-bold uppercase tracking-wider">New Challenge</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-5">
                            <span className="text-white">Who's That </span>
                            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] bg-clip-text text-transparent">Pokémon?</span>
                        </h2>

                        {/* Description */}
                        <p className="text-white/60 text-base md:text-lg lg:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
                            Think you're a true Pokémon Master? Test your knowledge and see how many Pokémon you can identify from their silhouettes! 
                            <span className="text-[#A29BFE] font-medium"> Challenge yourself now!</span>
                        </p>

                        {/* Stats Preview */}
                        <div className="flex items-center justify-center gap-8 md:gap-12 mb-10">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#6C5CE7]">898+</div>
                                <div className="text-white/40 text-xs md:text-sm uppercase tracking-wide mt-1">Pokémon</div>
                            </div>
                            <div className="w-px h-14 md:h-16 bg-[#6C5CE7]/30" />
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#A29BFE]">∞</div>
                                <div className="text-white/40 text-xs md:text-sm uppercase tracking-wide mt-1">Rounds</div>
                            </div>
                            <div className="w-px h-14 md:h-16 bg-[#6C5CE7]/30" />
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#7C6FF0]">🏆</div>
                                <div className="text-white/40 text-xs md:text-sm uppercase tracking-wide mt-1">High Score</div>
                            </div>
                        </div>

                        {/* CTA Button - Larger */}
                        <button
                            onClick={onChallenge}
                            className="group relative inline-flex items-center gap-4 px-10 md:px-12 py-5 md:py-6 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#7C6FF0] text-white font-bold text-lg md:text-xl shadow-[0_10px_40px_rgba(108,92,231,0.4)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(108,92,231,0.6)] hover:-translate-y-2 hover:scale-105 active:scale-95"
                        >
                            {/* Button Glow */}
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                            
                            {/* Button Content */}
                            <span className="relative flex items-center gap-4">
                                {/* Pokeball Icon - Larger */}
                                <span className="relative w-8 h-8 rounded-full bg-gradient-to-b from-white from-50% to-red-400 to-50% border-2 border-white/30 group-hover:animate-spin" style={{ animationDuration: '1s' }}>
                                    <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 -translate-y-1/2" />
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border border-white/30" />
                                </span>
                                
                                <span>Start Challenge</span>
                                
                                {/* Arrow */}
                                <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </button>

                        {/* Additional Motivation Text */}
                        <p className="mt-6 text-white/40 text-sm md:text-base">
                            Join <span className="text-[#6C5CE7] font-semibold">10,000+</span> trainers competing worldwide
                        </p>
                    </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-[#6C5CE7]/20 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-[#6C5CE7]/20 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-[#6C5CE7]/20 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-[#6C5CE7]/20 rounded-br-3xl" />

                {/* Bottom Decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#6C5CE7] to-transparent opacity-60" />
                
                {/* Top Decoration */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A29BFE] to-transparent opacity-40" />
            </div>
        </section>
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