import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Search,
  HelpCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Trophy,
  Flame,
  Lightbulb,
  CheckCircle,
  XCircle,
  Loader2,
  Sparkles,
  Target,
  Clock,
  Zap,
  Award,
  SkipForward,
  Volume2,
  Heart,
  Star,
} from 'lucide-react';

// Type colors configuration (same as main page)
const typeConfig = {
  normal: { color: '#A8A878', bg: 'bg-gray-400' },
  fire: { color: '#F08030', bg: 'bg-orange-500' },
  water: { color: '#6890F0', bg: 'bg-blue-500' },
  electric: { color: '#F8D030', bg: 'bg-yellow-400' },
  grass: { color: '#78C850', bg: 'bg-green-500' },
  ice: { color: '#98D8D8', bg: 'bg-cyan-300' },
  fighting: { color: '#C03028', bg: 'bg-red-700' },
  poison: { color: '#A040A0', bg: 'bg-purple-500' },
  ground: { color: '#E0C068', bg: 'bg-amber-600' },
  flying: { color: '#A890F0', bg: 'bg-indigo-300' },
  psychic: { color: '#F85888', bg: 'bg-pink-500' },
  bug: { color: '#A8B820', bg: 'bg-lime-500' },
  rock: { color: '#B8A038', bg: 'bg-stone-500' },
  ghost: { color: '#705898', bg: 'bg-purple-700' },
  dragon: { color: '#7038F8', bg: 'bg-violet-700' },
  dark: { color: '#705848', bg: 'bg-gray-800' },
  steel: { color: '#B8B8D0', bg: 'bg-slate-400' },
  fairy: { color: '#EE99AC', bg: 'bg-pink-300' },
};

// Animated Background Particles
const ParticleBackground = ({ color = '#F8D030' }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 rounded-full opacity-20 animate-float"
        style={{
          backgroundColor: color,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 10}s`,
        }}
      />
    ))}
    <div
      className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
      style={{ backgroundColor: color, top: '10%', right: '-10%' }}
    />
    <div
      className="absolute w-64 h-64 rounded-full blur-3xl opacity-10"
      style={{ backgroundColor: color, bottom: '20%', left: '-5%' }}
    />
  </div>
);

// Glassmorphism Card Component
const GlassCard = ({ children, className = '' }) => (
  <div
    className={`
      backdrop-blur-xl bg-white/10 border border-white/20 
      rounded-3xl shadow-2xl transition-all duration-500
      ${className}
    `}
  >
    {children}
  </div>
);

// Difficulty Badge
const DifficultyBadge = ({ difficulty }) => {
  const configs = {
    easy: { color: 'bg-green-500', label: 'Easy', icon: Star },
    medium: { color: 'bg-yellow-500', label: 'Medium', icon: Zap },
    hard: { color: 'bg-red-500', label: 'Hard', icon: Flame },
  };
  const config = configs[difficulty];
  const Icon = config.icon;

  return (
    <span className={`${config.color} px-4 py-1.5 rounded-full text-white text-sm font-bold flex items-center gap-2`}>
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};

// Hint Card Component
const HintCard = ({ icon: Icon, label, value, revealed }) => (
  <div className={`
    p-4 rounded-2xl border transition-all duration-300
    ${revealed 
      ? 'bg-white/20 border-white/30' 
      : 'bg-white/5 border-white/10 blur-sm cursor-not-allowed'
    }
  `}>
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-xl ${revealed ? 'bg-white/20' : 'bg-white/10'}`}>
        <Icon className={`w-5 h-5 ${revealed ? 'text-white' : 'text-white/30'}`} />
      </div>
      <div>
        <p className="text-white/50 text-xs uppercase tracking-wider">{label}</p>
        <p className={`font-bold ${revealed ? 'text-white' : 'text-white/30'}`}>
          {revealed ? value : '???'}
        </p>
      </div>
    </div>
  </div>
);

// Stats Card
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="text-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-2`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <p className="text-white/50 text-xs uppercase tracking-wider">{label}</p>
    <p className="text-white text-2xl font-black">{value}</p>
  </div>
);

// Main Challenge Component
const Challenge = () => {
  // Game State
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [guessInput, setGuessInput] = useState('');
  const [gameStatus, setGameStatus] = useState(null); 
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(3);
  
  // Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [wins, setWins] = useState(0);
  
  // Hints
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedHints, setRevealedHints] = useState({
    type: false,
    height: false,
    firstLetter: false,
    generation: false,
  });
  
  // Settings
  const [difficulty, setDifficulty] = useState('medium');
  const [isPlaying, setIsPlaying] = useState(false);

  // Difficulty settings
  const difficultySettings = {
    easy: { maxPokemon: 151, hints: 4, attempts: 5 },
    medium: { maxPokemon: 649, hints: 2, attempts: 3 },
    hard: { maxPokemon: 1025, hints: 1, attempts: 2 },
  };

  // Fetch random Pokemon
  const fetchNewPokemon = useCallback(async () => {
    setLoading(true);
    setRevealed(false);
    setGuessInput('');
    setGameStatus(null);
    setAttempts(0);
    setHintsUsed(0);
    setRevealedHints({
      type: false,
      height: false,
      firstLetter: false,
      generation: false,
    });

    const maxId = difficultySettings[difficulty].maxPokemon;
    const randomId = Math.floor(Math.random() * maxId) + 1;

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const speciesResponse = await axios.get(response.data.species.url);
      
      const res={
        ...response.data,
        species: speciesResponse.data,
      };
      setPokemonData(res);
      console.log(res?.name);
      
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  }, [difficulty]);

  useEffect(() => {
    fetchNewPokemon();
  }, [fetchNewPokemon]);

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('pokemonChallengeStats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setScore(stats.score || 0);
      setBestStreak(stats.bestStreak || 0);
      setTotalGames(stats.totalGames || 0);
      setWins(stats.wins || 0);
    }
  }, []);

  // Save stats to localStorage
  const saveStats = (newStats) => {
    localStorage.setItem('pokemonChallengeStats', JSON.stringify(newStats));
  };

  // Get sprite URL
  const getSprite = () => {
    if (!pokemonData) return '';
    return pokemonData.sprites.other['official-artwork'].front_default;
  };

  // Play Pokemon cry
  const playCry = () => {
    if (pokemonData && !isPlaying) {
      setIsPlaying(true);
      const audio = new Audio(pokemonData.cries?.latest || pokemonData.cries?.legacy);
      audio.volume = 0.3;
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  // Handle guess submission
  const handleGuess = () => {
    if (!guessInput.trim() || !pokemonData || revealed) return;

    const isCorrect = guessInput.trim().toLowerCase() === pokemonData.name.toLowerCase();
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (isCorrect) {
      // Calculate score based on attempts and hints
      const baseScore = difficulty === 'hard' ? 100 : difficulty === 'medium' ? 50 : 25;
      const attemptBonus = Math.max(0, (maxAttempts - newAttempts + 1) * 10);
      const hintPenalty = hintsUsed * 5;
      const pointsEarned = Math.max(10, baseScore + attemptBonus - hintPenalty);

      const newScore = score + pointsEarned;
      const newStreak = streak + 1;
      const newBestStreak = Math.max(bestStreak, newStreak);
      const newWins = wins + 1;
      const newTotalGames = totalGames + 1;

      setScore(newScore);
      setStreak(newStreak);
      setBestStreak(newBestStreak);
      setWins(newWins);
      setTotalGames(newTotalGames);
      setRevealed(true);
      setGameStatus('correct');

      saveStats({
        score: newScore,
        bestStreak: newBestStreak,
        totalGames: newTotalGames,
        wins: newWins,
      });
    } else {
      setGameStatus('incorrect');
      
      if (newAttempts >= difficultySettings[difficulty].attempts) {
        // Game over
        const newTotalGames = totalGames + 1;
        setTotalGames(newTotalGames);
        setStreak(0);
        setRevealed(true);

        saveStats({
          score,
          bestStreak,
          totalGames: newTotalGames,
          wins,
        });
      } else {
        // Reset status after animation
        setTimeout(() => setGameStatus(null), 1500);
      }
    }

    setGuessInput('');
  };

  // Reveal a hint
  const revealHint = (hintType) => {
    if (hintsUsed >= difficultySettings[difficulty].hints) return;
    if (revealedHints[hintType]) return;

    setRevealedHints(prev => ({ ...prev, [hintType]: true }));
    setHintsUsed(prev => prev + 1);
  };

  // Give up
  const giveUp = () => {
    setRevealed(true);
    setGameStatus('gaveup');
    setStreak(0);
    const newTotalGames = totalGames + 1;
    setTotalGames(newTotalGames);
    saveStats({
      score,
      bestStreak,
      totalGames: newTotalGames,
      wins,
    });
  };

  // Get Pokemon generation
  const getGeneration = () => {
    if (!pokemonData?.species) return 'Unknown';
    return pokemonData.species.generation?.name?.replace('generation-', 'Gen ').toUpperCase() || 'Unknown';
  };

  // Get primary type
  const primaryType = pokemonData?.types?.[0]?.type?.name || 'normal';
  const typeColor = typeConfig[primaryType]?.color || '#A8A878';

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-yellow-400 animate-spin"></div>
            <HelpCircle className="absolute inset-0 m-auto w-10 h-10 text-white/50" />
          </div>
          <p className="text-white text-xl font-bold">Loading Challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground color={revealed ? typeColor : '#F8D030'} />

      {/* Dynamic Background Gradient */}
      <div
        className="fixed inset-0 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${revealed ? typeColor : '#F8D030'}33 0%, transparent 60%)`,
        }}
      />

      {/* Header */}
      <header className="relative z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-xl" />
        <div className="container mx-auto px-4 py-4 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Who's That Pokémon?
                </h1>
                <p className="text-purple-200 text-sm">Test your knowledge!</p>
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="flex items-center gap-2">
              {['easy', 'medium', 'hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => {
                    setDifficulty(diff);
                    fetchNewPokemon();
                  }}
                  className={`px-4 py-2 rounded-xl font-semibold capitalize transition-all ${
                    difficulty === diff
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="container mx-auto px-4 py-4 relative z-10">
        <GlassCard className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-yellow-500/20">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white/50 text-xs">Score</p>
                <p className="text-white font-bold text-lg">{score}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/20">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-white/50 text-xs">Streak</p>
                <p className="text-white font-bold text-lg">{streak}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20">
                <Award className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white/50 text-xs">Best Streak</p>
                <p className="text-white font-bold text-lg">{bestStreak}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-green-500/20">
                <Target className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white/50 text-xs">Win Rate</p>
                <p className="text-white font-bold text-lg">
                  {totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Pokemon Silhouette */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6 sm:p-8">
              {/* Game Status Banner */}
              {gameStatus && (
                <div className={`
                  mb-6 p-4 rounded-2xl flex items-center gap-3 animate-pulse
                  ${gameStatus === 'correct' ? 'bg-green-500/20 border border-green-500/50' : ''}
                  ${gameStatus === 'incorrect' ? 'bg-red-500/20 border border-red-500/50' : ''}
                  ${gameStatus === 'gaveup' ? 'bg-orange-500/20 border border-orange-500/50' : ''}
                `}>
                  {gameStatus === 'correct' && (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <span className="text-green-400 font-bold">Correct! Great job!</span>
                    </>
                  )}
                  {gameStatus === 'incorrect' && (
                    <>
                      <XCircle className="w-6 h-6 text-red-400" />
                      <span className="text-red-400 font-bold">
                        Incorrect! {difficultySettings[difficulty].attempts - attempts} attempts left
                      </span>
                    </>
                  )}
                  {gameStatus === 'gaveup' && (
                    <>
                      <EyeOff className="w-6 h-6 text-orange-400" />
                      <span className="text-orange-400 font-bold">
                        It was {pokemonData?.name}!
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Difficulty & Attempts */}
              <div className="flex items-center justify-between mb-6">
                <DifficultyBadge difficulty={difficulty} />
                <div className="flex items-center gap-2">
                  {[...Array(difficultySettings[difficulty].attempts)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i < attempts
                          ? 'bg-red-500 shadow-lg shadow-red-500/50'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Pokemon Image */}
              <div className="relative flex justify-center py-8">
                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30"
                  style={{
                    background: `radial-gradient(circle, ${revealed ? typeColor : '#000'} 0%, transparent 60%)`,
                  }}
                />

                {/* Question Mark Overlay (when hidden) */}
                {!revealed && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <HelpCircle className="w-32 h-32 text-white/10" />
                  </div>
                )}

                {/* Pokemon Image */}
                <img
                  src={getSprite()}
                  alt="Mystery Pokemon"
                  className={`
                    w-64 h-64 sm:w-80 sm:h-80 object-contain relative z-10
                    transition-all duration-700 select-none
                    ${revealed 
                      ? 'brightness-100 drop-shadow-2xl' 
                      : 'brightness-0 contrast-200'
                    }
                  `}
                  style={{
                    filter: revealed 
                      ? `drop-shadow(0 0 30px ${typeColor}66)` 
                      : 'brightness(0) contrast(2)',
                  }}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />

                {/* Audio Button */}
                {revealed && (
                  <button
                    onClick={playCry}
                    disabled={isPlaying}
                    className="absolute top-4 right-4 p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all z-30"
                  >
                    <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse text-green-400' : ''}`} />
                  </button>
                )}
              </div>

              {/* Revealed Pokemon Info */}
              {revealed && (
                <div className="text-center mb-6 animate-fadeIn">
                  <h2 
                    className="text-4xl sm:text-5xl font-black text-white capitalize mb-4"
                    style={{ textShadow: `0 0 30px ${typeColor}66` }}
                  >
                    {pokemonData?.name}
                  </h2>
                  <div className="flex justify-center gap-3">
                    {pokemonData?.types.map((type) => (
                      <span
                        key={type.type.name}
                        className={`${typeConfig[type.type.name]?.bg || 'bg-gray-500'} px-4 py-1.5 rounded-full text-white text-sm font-bold capitalize`}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Input & Actions */}
              {!revealed ? (
                <div className="space-y-4">
                  {/* Guess Input */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      value={guessInput}
                      onChange={(e) => setGuessInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter Pokémon name..."
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
                      autoComplete="off"
                      autoFocus
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleGuess}
                      disabled={!guessInput.trim()}
                      className="flex-1 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed rounded-2xl font-bold text-gray-900 disabled:text-gray-400 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Submit Guess
                    </button>
                    <button
                      onClick={giveUp}
                      className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-semibold text-white transition-all flex items-center gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      <span className="hidden sm:inline">Reveal</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={fetchNewPokemon}
                  className="w-full py-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 rounded-2xl font-bold text-gray-900 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  <RefreshCw className="w-5 h-5" />
                  Next Pokémon
                </button>
              )}
            </GlassCard>
          </div>

          {/* Right Side - Hints & Info */}
          <div className="space-y-6">
            {/* Hints Section */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Hints</h3>
                </div>
                <span className="text-white/50 text-sm">
                  {hintsUsed}/{difficultySettings[difficulty].hints} used
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Type Hint */}
                <button
                  onClick={() => revealHint('type')}
                  disabled={revealed || revealedHints.type || hintsUsed >= difficultySettings[difficulty].hints}
                  className="text-left disabled:cursor-not-allowed"
                >
                  <HintCard
                    icon={Sparkles}
                    label="Type"
                    value={pokemonData?.types?.[0]?.type?.name?.toUpperCase()}
                    revealed={revealedHints.type || revealed}
                  />
                </button>

                {/* Height Hint */}
                <button
                  onClick={() => revealHint('height')}
                  disabled={revealed || revealedHints.height || hintsUsed >= difficultySettings[difficulty].hints}
                  className="text-left disabled:cursor-not-allowed"
                >
                  <HintCard
                    icon={Target}
                    label="Height"
                    value={`${pokemonData?.height / 10} m`}
                    revealed={revealedHints.height || revealed}
                  />
                </button>

                {/* First Letter Hint */}
                <button
                  onClick={() => revealHint('firstLetter')}
                  disabled={revealed || revealedHints.firstLetter || hintsUsed >= difficultySettings[difficulty].hints}
                  className="text-left disabled:cursor-not-allowed"
                >
                  <HintCard
                    icon={Zap}
                    label="First Letter"
                    value={pokemonData?.name?.[0]?.toUpperCase()}
                    revealed={revealedHints.firstLetter || revealed}
                  />
                </button>

                {/* Generation Hint */}
                <button
                  onClick={() => revealHint('generation')}
                  disabled={revealed || revealedHints.generation || hintsUsed >= difficultySettings[difficulty].hints}
                  className="text-left disabled:cursor-not-allowed"
                >
                  <HintCard
                    icon={Clock}
                    label="Generation"
                    value={getGeneration()}
                    revealed={revealedHints.generation || revealed}
                  />
                </button>
              </div>

              {hintsUsed >= difficultySettings[difficulty].hints && !revealed && (
                <p className="text-yellow-400/70 text-sm text-center mt-4">
                  No more hints available!
                </p>
              )}
            </GlassCard>

            {/* How to Play */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">How to Play</h3>
              </div>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-300 text-xs font-bold">1</span>
                  </div>
                  <span>Look at the silhouette and try to guess the Pokémon</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-300 text-xs font-bold">2</span>
                  </div>
                  <span>Use hints if you're stuck (but they reduce points!)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-300 text-xs font-bold">3</span>
                  </div>
                  <span>Build your streak for bonus points!</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-300 text-xs font-bold">4</span>
                  </div>
                  <span>Higher difficulty = more points!</span>
                </li>
              </ul>
            </GlassCard>

            {/* Game Stats */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Your Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <StatCard 
                  icon={Trophy} 
                  label="Total Score" 
                  value={score} 
                  color="bg-yellow-500/30" 
                />
                <StatCard 
                  icon={Target} 
                  label="Games Played" 
                  value={totalGames} 
                  color="bg-blue-500/30" 
                />
                <StatCard 
                  icon={CheckCircle} 
                  label="Wins" 
                  value={wins} 
                  color="bg-green-500/30" 
                />
                <StatCard 
                  icon={Flame} 
                  label="Best Streak" 
                  value={bestStreak} 
                  color="bg-orange-500/30" 
                />
              </div>

              {/* Reset Stats Button */}
              <button
                onClick={() => {
                  localStorage.removeItem('pokemonChallengeStats');
                  setScore(0);
                  setStreak(0);
                  setBestStreak(0);
                  setTotalGames(0);
                  setWins(0);
                }}
                className="w-full mt-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
              >
                Reset Stats
              </button>
            </GlassCard>
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Challenge;