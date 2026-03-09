import React, { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  Image,
  Eye,
  Ruler,
  Scale,
  Star,
  Gamepad2,
  BookOpen,
  BarChart3,
  Zap,
  Swords,
  Images,
  ChevronRight,
  Target,
  Smile,
  TrendingUp,
  MapPin,
  Shield,
  Activity,
  Cpu,
  FlameKindling,
  Palette,
  X,
  Loader2,
} from 'lucide-react';

// Type colors and gradients
const typeConfig = {
  normal: { color: '#A8A878', gradient: 'from-gray-400 via-gray-300 to-gray-500', bg: 'bg-gray-400', glow: 'shadow-gray-400/50' },
  fire: { color: '#F08030', gradient: 'from-orange-500 via-red-500 to-yellow-500', bg: 'bg-orange-500', glow: 'shadow-orange-500/50' },
  water: { color: '#6890F0', gradient: 'from-blue-500 via-cyan-400 to-blue-600', bg: 'bg-blue-500', glow: 'shadow-blue-500/50' },
  electric: { color: '#F8D030', gradient: 'from-yellow-400 via-yellow-300 to-amber-500', bg: 'bg-yellow-400', glow: 'shadow-yellow-400/50' },
  grass: { color: '#78C850', gradient: 'from-green-500 via-emerald-400 to-lime-500', bg: 'bg-green-500', glow: 'shadow-green-500/50' },
  ice: { color: '#98D8D8', gradient: 'from-cyan-300 via-blue-200 to-teal-400', bg: 'bg-cyan-300', glow: 'shadow-cyan-300/50' },
  fighting: { color: '#C03028', gradient: 'from-red-700 via-red-600 to-orange-700', bg: 'bg-red-700', glow: 'shadow-red-700/50' },
  poison: { color: '#A040A0', gradient: 'from-purple-600 via-fuchsia-500 to-purple-700', bg: 'bg-purple-500', glow: 'shadow-purple-500/50' },
  ground: { color: '#E0C068', gradient: 'from-amber-600 via-yellow-600 to-orange-700', bg: 'bg-amber-600', glow: 'shadow-amber-600/50' },
  flying: { color: '#A890F0', gradient: 'from-indigo-400 via-purple-300 to-blue-400', bg: 'bg-indigo-300', glow: 'shadow-indigo-400/50' },
  psychic: { color: '#F85888', gradient: 'from-pink-500 via-rose-400 to-fuchsia-500', bg: 'bg-pink-500', glow: 'shadow-pink-500/50' },
  bug: { color: '#A8B820', gradient: 'from-lime-500 via-green-400 to-yellow-500', bg: 'bg-lime-500', glow: 'shadow-lime-500/50' },
  rock: { color: '#B8A038', gradient: 'from-stone-500 via-amber-600 to-stone-600', bg: 'bg-stone-500', glow: 'shadow-stone-500/50' },
  ghost: { color: '#705898', gradient: 'from-purple-700 via-indigo-600 to-violet-800', bg: 'bg-purple-700', glow: 'shadow-purple-700/50' },
  dragon: { color: '#7038F8', gradient: 'from-violet-700 via-purple-600 to-indigo-700', bg: 'bg-violet-700', glow: 'shadow-violet-700/50' },
  dark: { color: '#705848', gradient: 'from-gray-800 via-gray-700 to-slate-800', bg: 'bg-gray-800', glow: 'shadow-gray-800/50' },
  steel: { color: '#B8B8D0', gradient: 'from-slate-400 via-gray-300 to-slate-500', bg: 'bg-slate-400', glow: 'shadow-slate-400/50' },
  fairy: { color: '#EE99AC', gradient: 'from-pink-400 via-rose-300 to-pink-500', bg: 'bg-pink-300', glow: 'shadow-pink-300/50' },
};

// Animated Background Particles
const ParticleBackground = ({ type }) => {
  const config = typeConfig[type] || typeConfig.normal;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-20 animate-float"
          style={{
            backgroundColor: config.color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
          }}
        />
      ))}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: config.color, top: '10%', right: '-10%' }}
      />
      <div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: config.color, bottom: '20%', left: '-5%' }}
      />
    </div>
  );
};

// Animated Pokeball Loader
const PokeballLoader = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="relative w-24 h-24 animate-bounce">
      <div className="absolute top-0 w-24 h-12 bg-gradient-to-b from-red-500 to-red-600 rounded-t-full border-4 border-gray-800" />
      <div className="absolute bottom-0 w-24 h-12 bg-gradient-to-b from-white to-gray-100 rounded-b-full border-4 border-gray-800" />
      <div className="absolute top-1/2 -translate-y-1/2 w-24 h-2 bg-gray-800" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center">
        <div className="w-4 h-4 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full animate-pulse" />
      </div>
    </div>
    <div className="mt-6 flex items-center gap-2">
      <Loader2 className="w-5 h-5 text-white animate-spin" />
      <span className="text-white text-xl font-bold">Loading...</span>
    </div>
  </div>
);

// Glassmorphism Card Component
const GlassCard = ({ children, className = '', hover = true }) => (
  <div
    className={`
      backdrop-blur-xl bg-white/10 border border-white/20 
      rounded-3xl shadow-2xl 
      ${hover ? 'hover:bg-white/15 hover:border-white/30 transition-all duration-500' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

// Neon Type Badge
const TypeBadge = ({ type }) => {
  const config = typeConfig[type] || typeConfig.normal;

  return (
    <span
      className={`
        relative px-5 py-2 rounded-full text-white text-sm font-bold capitalize
        ${config.bg} shadow-lg ${config.glow}
        hover:scale-110 transition-transform duration-300
        border border-white/30
      `}
      style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
    >
      {type}
    </span>
  );
};

// Circular Stat Component
const CircularStat = ({ statName, value, maxValue = 255, color }) => {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const formatStatName = (name) => {
    const statNames = {
      hp: 'HP',
      attack: 'ATK',
      defense: 'DEF',
      'special-attack': 'SP.A',
      'special-defense': 'SP.D',
      speed: 'SPD',
    };
    return statNames[name] || name.toUpperCase();
  };

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-xl sm:text-2xl font-bold text-white"
            style={{ textShadow: `0 0 10px ${color}` }}
          >
            {value}
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs font-bold text-white/70 group-hover:text-white transition-colors">
        {formatStatName(statName)}
      </span>
    </div>
  );
};

// Horizontal Stat Bar with Glow
const StatBar = ({ statName, value, maxValue = 255, typeColor }) => {
  const percentage = (value / maxValue) * 100;

  const formatStatName = (name) => {
    const statNames = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Sp. Attack',
      'special-defense': 'Sp. Defense',
      speed: 'Speed',
    };
    return statNames[name] || name;
  };

  const getStatIcon = (name) => {
    const icons = {
      hp: <Heart className="w-4 h-4" />,
      attack: <Swords className="w-4 h-4" />,
      defense: <Shield className="w-4 h-4" />,
      'special-attack': <Zap className="w-4 h-4" />,
      'special-defense': <Activity className="w-4 h-4" />,
      speed: <TrendingUp className="w-4 h-4" />,
    };
    return icons[name] || <BarChart3 className="w-4 h-4" />;
  };

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
          {getStatIcon(statName)}
          <span className="text-sm font-medium">{formatStatName(statName)}</span>
        </div>
        <span className="text-sm font-bold text-white">{value}</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${typeColor}, ${typeColor}dd)`,
            boxShadow: `0 0 20px ${typeColor}66, inset 0 0 10px rgba(255,255,255,0.3)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </div>
  );
};

// Ability Card with Hover Effect
const AbilityCard = ({ ability, isHidden }) => (
  <div
    className={`
      relative p-4 rounded-2xl overflow-hidden
      backdrop-blur-xl border transition-all duration-300
      ${
        isHidden
          ? 'bg-purple-500/20 border-purple-400/50 hover:border-purple-400 hover:bg-purple-500/30'
          : 'bg-white/10 border-white/20 hover:border-white/40 hover:bg-white/20'
      }
      group cursor-pointer hover:scale-105
    `}
  >
    {isHidden && (
      <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl" />
    )}
    <div className="flex items-center gap-3">
      <div
        className={`p-2 rounded-xl ${isHidden ? 'bg-purple-500/30' : 'bg-white/10'}`}
      >
        {isHidden ? (
          <Sparkles className="w-5 h-5 text-purple-300" />
        ) : (
          <Zap className="w-5 h-5 text-white/80" />
        )}
      </div>
      <div>
        <p className="capitalize font-bold text-white group-hover:text-white/100 text-white/90">
          {ability.replace('-', ' ')}
        </p>
        {isHidden && (
          <span className="text-xs text-purple-300 font-medium">Hidden Ability</span>
        )}
      </div>
    </div>
  </div>
);

// Move Chip with Animation
const MoveChip = ({ move, index }) => (
  <div
    className="
      px-4 py-2 rounded-xl text-sm font-medium text-white/90
      bg-white/10 border border-white/10
      hover:bg-white/20 hover:border-white/30 hover:text-white
      hover:scale-105 hover:shadow-lg hover:shadow-white/10
      transition-all duration-300 cursor-pointer
      capitalize backdrop-blur-sm flex items-center gap-2
    "
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <Swords className="w-3 h-3 opacity-50" />
    {move.replace('-', ' ')}
  </div>
);

// Info Card Component
const InfoCard = ({ icon: Icon, label, value, gradient }) => (
  <div
    className={`
      relative overflow-hidden rounded-2xl p-5
      bg-gradient-to-br ${gradient}
      border border-white/20
      hover:scale-105 hover:shadow-2xl
      transition-all duration-300 group
    `}
  >
    <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-white/60 text-xs uppercase tracking-wider font-medium">
        {label}
      </p>
      <p className="text-white text-xl font-bold mt-1">{value}</p>
    </div>
  </div>
);

// Sprite Gallery Card
const SpriteCard = ({ src, label }) => (
  <div
    className="
      relative rounded-2xl p-3 cursor-pointer
      transition-all duration-300
      bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/30
      hover:scale-105
    "
  >
    <img
      src={src}
      alt={label}
      className="w-full h-auto transform hover:scale-110 transition-transform duration-300"
      style={{ imageRendering: 'pixelated' }}
    />
    <p className="text-xs text-center text-white/70 mt-2 font-medium">{label}</p>
  </div>
);

// Main Pokemon Page Component
const Tmp = () => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSprite, setCurrentSprite] = useState('official');
  const [searchId, setSearchId] = useState('charizard');
  const [inputValue, setInputValue] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShiny, setShowShiny] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchPokemon(searchId);
  }, [searchId]);

  const fetchPokemon = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id.toString().toLowerCase()}`
      );
      if (!response.ok) throw new Error('Pokemon not found!');
      const data = await response.json();
      setPokemon(data);

      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      setSpecies(speciesData);

      const evoResponse = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoResponse.json();
      setEvolutionChain(evoData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchId(inputValue.trim());
      setInputValue('');
    }
  };

  const getDescription = () => {
    if (!species) return '';
    const entry = species.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    );
    return entry ? entry.flavor_text.replace(/[\n\f]/g, ' ') : '';
  };

  const getMainSprite = () => {
    if (!pokemon) return '';
    if (currentSprite === 'official') {
      return showShiny
        ? pokemon.sprites.other['official-artwork'].front_shiny
        : pokemon.sprites.other['official-artwork'].front_default;
    }
    if (showShiny) {
      return currentSprite === 'front'
        ? pokemon.sprites.front_shiny
        : pokemon.sprites.back_shiny;
    }
    return currentSprite === 'front'
      ? pokemon.sprites.front_default
      : pokemon.sprites.back_default;
  };

  const playCry = () => {
    if (pokemon && !isPlaying) {
      setIsPlaying(true);
      const audio = new Audio(pokemon.cries?.latest || pokemon.cries?.legacy);
      audio.volume = 0.3;
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  const getEvolutions = () => {
    if (!evolutionChain) return [];
    const evolutions = [];
    let current = evolutionChain.chain;

    while (current) {
      evolutions.push({
        name: current.species.name,
        id: current.species.url.split('/').filter(Boolean).pop(),
      });
      current = current.evolves_to[0];
    }
    return evolutions;
  };

  const primaryType = pokemon?.types[0]?.type.name || 'normal';
  const typeSettings = typeConfig[primaryType] || typeConfig.normal;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <PokeballLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/50 to-slate-900 flex items-center justify-center p-4">
        <GlassCard className="p-10 text-center max-w-md" hover={false}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <X className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Oh no!</h2>
          <p className="text-white/70 mb-8 text-lg">{error}</p>
          <button
            onClick={() => setSearchId('pikachu')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full font-bold text-lg hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/30 transition-all flex items-center gap-2 mx-auto"
          >
            <Zap className="w-5 h-5" />
            Find Pikachu Instead!
          </button>
        </GlassCard>
      </div>
    );
  }

  const tabs = [
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'abilities', label: 'Abilities', icon: Sparkles },
    { id: 'moves', label: 'Moves', icon: Swords },
    { id: 'sprites', label: 'Sprites', icon: Images },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground type={primaryType} />

      {/* Dynamic Background Gradient */}
      <div
        className="fixed inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${typeSettings.color}33 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 80%, ${typeSettings.color}22 0%, transparent 50%)`,
        }}
      />

      {/* Header */}
      <header className="relative z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-500/90 backdrop-blur-xl" />

        <div className="container mx-auto px-4 py-4 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 bg-white rounded-full shadow-lg shadow-white/30" />
                <div className="absolute inset-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full" />
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-800" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">
                  PokéWorld
                </h1>
                <p className="text-red-200 text-sm">Gotta catch 'em all!</p>
              </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search by name or number..."
                  className="w-full pl-12 pr-6 py-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 rounded-2xl font-bold text-gray-900 transition-all hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/30 active:scale-95 flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid xl:grid-cols-5 gap-8">
          {/* Left Side - Pokemon Showcase */}
          <div className="xl:col-span-2 space-y-6">
            {/* Main Pokemon Card */}
            <GlassCard className="p-6 sm:p-8 relative overflow-hidden" hover={false}>
              {/* Decorative Elements */}
              <div
                className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, ${typeSettings.color} 0%, transparent 70%)`,
                }}
              />
              <div
                className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full opacity-10"
                style={{
                  background: `radial-gradient(circle, ${typeSettings.color} 0%, transparent 70%)`,
                }}
              />

              {/* Top Actions Row */}
              <div className="relative z-10 flex justify-between items-start mb-4">
                {/* Pokemon ID */}
                <div className="px-4 py-2 rounded-xl bg-black/30 backdrop-blur-sm border border-white/20">
                  <span className="text-white/60 text-sm">No.</span>
                  <span className="text-white font-black text-lg ml-1">
                    {String(pokemon?.id).padStart(4, '0')}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {/* Audio Button */}
                  <button
                    onClick={playCry}
                    disabled={isPlaying}
                    className={`p-3 rounded-xl backdrop-blur-sm border transition-all hover:scale-110 active:scale-95 ${
                      isPlaying
                        ? 'bg-green-500/30 border-green-400/50 shadow-lg shadow-green-500/30'
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                    title="Play Cry"
                  >
                    {isPlaying ? (
                      <Volume2 className="w-5 h-5 text-green-400 animate-pulse" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>

                  {/* Favorite Button */}
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-xl backdrop-blur-sm border transition-all hover:scale-110 active:scale-95 ${
                      isFavorite
                        ? 'bg-red-500/30 border-red-400/50 shadow-lg shadow-red-500/30'
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite ? 'text-red-400 fill-red-400' : 'text-white'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Pokemon Name & Types */}
              <div className="relative z-10 mb-6">
                <h2
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-white capitalize mb-4"
                  style={{ textShadow: `0 0 40px ${typeSettings.color}66` }}
                >
                  {pokemon?.name}
                </h2>
                <div className="flex gap-3 flex-wrap">
                  {pokemon?.types.map((type) => (
                    <TypeBadge key={type.type.name} type={type.type.name} />
                  ))}
                </div>
              </div>

              {/* Pokemon Image */}
              <div className="relative flex justify-center py-8">
                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-40 animate-pulse"
                  style={{
                    background: `radial-gradient(circle, ${typeSettings.color} 0%, transparent 60%)`,
                  }}
                />

                {/* Platform Shadow */}
                <div
                  className="absolute bottom-4 w-48 sm:w-64 h-6 rounded-full blur-xl opacity-50"
                  style={{ background: typeSettings.color }}
                />

                <img
                  src={getMainSprite()}
                  alt={pokemon?.name}
                  className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain relative z-10 drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
                  style={{
                    filter: `drop-shadow(0 0 30px ${typeSettings.color}66)`,
                    imageRendering: currentSprite === 'official' ? 'auto' : 'pixelated',
                  }}
                />
              </div>

              {/* Sprite Controls */}
              <div className="relative z-10 flex justify-center gap-2 sm:gap-3 flex-wrap">
                {[
                  { id: 'official', label: 'Artwork', icon: Palette },
                  { id: 'front', label: 'Front', icon: Eye },
                  { id: 'back', label: 'Back', icon: RotateCcw },
                ].map((sprite) => (
                  <button
                    key={sprite.id}
                    onClick={() => setCurrentSprite(sprite.id)}
                    className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                      currentSprite === sprite.id
                        ? 'bg-white text-gray-900 shadow-lg shadow-white/30'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <sprite.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{sprite.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => setShowShiny(!showShiny)}
                  className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    showShiny
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 shadow-lg shadow-yellow-500/30'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Shiny</span>
                </button>
              </div>
            </GlassCard>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                icon={Ruler}
                label="Height"
                value={`${pokemon?.height / 10} m`}
                gradient="from-blue-500/30 to-cyan-500/30"
              />
              <InfoCard
                icon={Scale}
                label="Weight"
                value={`${pokemon?.weight / 10} kg`}
                gradient="from-green-500/30 to-emerald-500/30"
              />
              <InfoCard
                icon={Star}
                label="Base EXP"
                value={pokemon?.base_experience || 'N/A'}
                gradient="from-yellow-500/30 to-orange-500/30"
              />
              <InfoCard
                icon={Gamepad2}
                label="Generation"
                value={
                  species?.generation?.name?.replace('generation-', '').toUpperCase() ||
                  'N/A'
                }
                gradient="from-purple-500/30 to-pink-500/30"
              />
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="xl:col-span-3 space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-2 p-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <GlassCard className="p-6">
                {/* Circular Stats */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 mb-8">
                  {pokemon?.stats.map((stat) => (
                    <CircularStat
                      key={stat.stat.name}
                      statName={stat.stat.name}
                      value={stat.base_stat}
                      color={typeSettings.color}
                    />
                  ))}
                </div>

                {/* Bar Stats */}
                <div className="space-y-4">
                  {pokemon?.stats.map((stat) => (
                    <StatBar
                      key={stat.stat.name}
                      statName={stat.stat.name}
                      value={stat.base_stat}
                      typeColor={typeSettings.color}
                    />
                  ))}
                </div>

                {/* Total */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white/70">
                      <Activity className="w-5 h-5" />
                      <span className="font-semibold text-lg">Total Base Stats</span>
                    </div>
                    <span
                      className="text-4xl font-black text-white"
                      style={{ textShadow: `0 0 20px ${typeSettings.color}` }}
                    >
                      {pokemon?.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                    </span>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Abilities Tab */}
            {activeTab === 'abilities' && (
              <div className="space-y-6">
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Abilities</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {pokemon?.abilities.map((ability) => (
                      <AbilityCard
                        key={ability.ability.name}
                        ability={ability.ability.name}
                        isHidden={ability.is_hidden}
                      />
                    ))}
                  </div>
                </GlassCard>

                {/* Additional Info */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Additional Info</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <Target className="w-6 h-6 text-white/50 mx-auto mb-2" />
                      <p className="text-white/50 text-sm">Capture Rate</p>
                      <p className="text-white text-2xl font-bold">{species?.capture_rate}</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <Smile className="w-6 h-6 text-white/50 mx-auto mb-2" />
                      <p className="text-white/50 text-sm">Base Happiness</p>
                      <p className="text-white text-2xl font-bold">{species?.base_happiness}</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <TrendingUp className="w-6 h-6 text-white/50 mx-auto mb-2" />
                      <p className="text-white/50 text-sm">Growth Rate</p>
                      <p className="text-white text-lg font-bold capitalize">
                        {species?.growth_rate?.name?.replace('-', ' ')}
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <MapPin className="w-6 h-6 text-white/50 mx-auto mb-2" />
                      <p className="text-white/50 text-sm">Habitat</p>
                      <p className="text-white text-lg font-bold capitalize">
                        {species?.habitat?.name || 'Unknown'}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {/* Moves Tab */}
            {activeTab === 'moves' && (
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Swords className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Moves</h3>
                  </div>
                  <span className="text-white/50 text-sm px-3 py-1 rounded-full bg-white/10">
                    {pokemon?.moves.length} total
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {pokemon?.moves.map((move, index) => (
                    <MoveChip key={move.move.name} move={move.move.name} index={index} />
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Sprites Tab */}
            {activeTab === 'sprites' && (
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Images className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Sprite Gallery</h3>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                  {[
                    { src: pokemon?.sprites.front_default, label: 'Front' },
                    { src: pokemon?.sprites.back_default, label: 'Back' },
                    { src: pokemon?.sprites.front_shiny, label: 'Shiny' },
                    { src: pokemon?.sprites.back_shiny, label: 'Shiny Back' },
                    { src: pokemon?.sprites.front_female, label: 'Female' },
                    { src: pokemon?.sprites.front_shiny_female, label: 'Shiny ♀' },
                  ]
                    .filter((s) => s.src)
                    .map((sprite, index) => (
                      <SpriteCard key={index} {...sprite} />
                    ))}
                </div>

                {/* Artwork Versions */}
                <div className="flex items-center gap-3 mt-8 mb-4">
                  <Image className="w-5 h-5 text-white" />
                  <h4 className="text-lg font-bold text-white">Official Artwork</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    {
                      src: pokemon?.sprites.other['official-artwork'].front_default,
                      label: 'Official',
                    },
                    {
                      src: pokemon?.sprites.other['official-artwork'].front_shiny,
                      label: 'Shiny',
                    },
                    {
                      src: pokemon?.sprites.other.dream_world?.front_default,
                      label: 'Dream World',
                    },
                    { src: pokemon?.sprites.other.home?.front_default, label: 'HOME' },
                    { src: pokemon?.sprites.other.home?.front_shiny, label: 'HOME Shiny' },
                    {
                      src: pokemon?.sprites.other.showdown?.front_default,
                      label: 'Showdown',
                    },
                  ]
                    .filter((s) => s.src)
                    .map((sprite, index) => (
                      <div
                        key={index}
                        className="bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer"
                      >
                        <img
                          src={sprite.src}
                          alt={sprite.label}
                          className="w-full h-32 object-contain"
                        />
                        <p className="text-center text-white/70 text-sm mt-2 font-medium">
                          {sprite.label}
                        </p>
                      </div>
                    ))}
                </div>
              </GlassCard>
            )}

            {/* Evolution Chain */}
            {getEvolutions().length > 1 && (
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                  <h3 className="text-lg font-bold text-white">Evolution Chain</h3>
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  {getEvolutions().map((evo, index) => (
                    <React.Fragment key={evo.name}>
                      <button
                        onClick={() => setSearchId(evo.name)}
                        className={`flex flex-col items-center p-3 rounded-xl transition-all hover:scale-110 ${
                          evo.name === pokemon?.name
                            ? 'bg-white/20 border-2 border-white/50 shadow-lg'
                            : 'bg-white/5 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`}
                          alt={evo.name}
                          className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
                        />
                        <span className="text-white text-xs sm:text-sm capitalize mt-2 font-medium">
                          {evo.name}
                        </span>
                      </button>
                      {index < getEvolutions().length - 1 && (
                        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white/30" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Description */}
        <GlassCard className="p-6 my-10">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-white" />
            <h3 className="text-lg font-bold text-white">Pokédex Entry</h3>
          </div>
          <p className="text-white/80 leading-relaxed text-lg italic">
            "{getDescription()}"
          </p>
        </GlassCard>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Tmp;