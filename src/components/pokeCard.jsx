import React from 'react';


const pokeCardStyles = `
  @keyframes pokeCard__cardFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes pokeCard__holoShimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @keyframes pokeCard__pokemonFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  .pokeCard__animateWrapper {
    animation: pokeCard__cardFadeIn 0.5s ease-out forwards;
    opacity: 0;
  }

  .pokeCard__container {
    position: relative;
    width: 280px;
    border-radius: 16px;
    padding: 10px;
    overflow: hidden;
    cursor: pointer;
    border: 3px solid #6C5CE7;
    background: #F0EDFF;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2), 0 0 30px rgba(108,92,231,0.2), inset 0 1px 0 rgba(255,255,255,0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .pokeCard__container:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.25), 0 0 40px rgba(108,92,231,0.3), inset 0 1px 0 rgba(255,255,255,0.4);
  }

  .pokeCard__holoOverlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    border-radius: 14px;
    pointer-events: none;
    background: linear-gradient(
      105deg,
      transparent 40%,
      rgba(255, 255, 255, 0.3) 45%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.3) 55%,
      transparent 60%
    );
    background-size: 200% 100%;
    animation: pokeCard__holoShimmer 3s infinite linear;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .pokeCard__container:hover .pokeCard__holoOverlay {
    opacity: 1;
  }

  .pokeCard__content {
    position: relative;
    z-index: 1;
  }

  .pokeCard__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    margin-bottom: 6px;
  }

  .pokeCard__name {
    font-size: 1.25rem;
    font-weight: 800;
    color: #111827;
    text-transform: capitalize;
    letter-spacing: 0.025em;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    margin: 0;
  }

  .pokeCard__id {
    font-size: 0.875rem;
    font-weight: 700;
    color: #6C5CE7;
    letter-spacing: 0.05em;
  }

  .pokeCard__imageFrame {
    position: relative;
    margin: 0 4px;
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid rgba(108, 92, 231, 0.4);
  }

  .pokeCard__imageBackground {
    position: relative;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, #6C5CE7, #7C6FF0, #A29BFE);
  }

  .pokeCard__pokemonImage {
    width: 150px;
    height: 150px;
    object-fit: contain;
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }

  .pokeCard__container:hover .pokeCard__pokemonImage {
    animation: pokeCard__pokemonFloat 2s ease-in-out infinite;
  }

  .pokeCard__imageStrip {
    height: 4px;
    background: linear-gradient(135deg, #6C5CE7, #7C6FF0, #A29BFE);
  }

  .pokeCard__badgeRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px 4px 10px;
  }

  .pokeCard__typeBadge {
    color: white;
    padding: 4px 16px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: #6C5CE7;
    box-shadow: 0 2px 8px rgba(108,92,231,0.4);
    border: none;
  }

  .pokeCard__brandLabel {
    font-size: 11px;
    font-weight: 700;
    color: #6b7280;
    letter-spacing: 0.05em;
  }

  .pokeCard__divider {
    height: 2px;
    margin: 6px 10px;
    border-radius: 4px;
    background: linear-gradient(90deg, transparent, rgba(108,92,231,0.25), #6C5CE7, rgba(108,92,231,0.25), transparent);
  }

  .pokeCard__buttonWrapper {
    padding: 4px 10px 8px 10px;
  }

  .pokeCard__exploreButton {
    width: 100%;
    padding: 10px 0;
    border-radius: 12px;
    color: white;
    font-weight: 700;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    background: linear-gradient(135deg, #6C5CE7, #7C6FF0);
    box-shadow: 0 3px 12px rgba(108,92,231,0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .pokeCard__exploreButton:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 18px rgba(108,92,231,0.5);
    background: linear-gradient(135deg, #7C6FF0, #8B7FF5);
  }

  .pokeCard__exploreButton:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(108,92,231,0.4);
  }
`;

const PokeCard = ({ id, name, image, onExplore, delay = 0 }) => {
  const formattedId = `#${String(id).padStart(3, '0')}`;

  return (
    <>
      <style>{pokeCardStyles}</style>
      <div
        className="pokeCard__animateWrapper"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="pokeCard__container">
          {/* Holographic shimmer overlay */}
          <div className="pokeCard__holoOverlay" />

          <div className="pokeCard__content">
            {/* Header */}
            <div className="pokeCard__header">
              <span className="pokeCard__name">
                {name}
              </span>
              <span className="pokeCard__id">
                {formattedId}
              </span>
            </div>

            {/* Image Frame */}
            <div className="pokeCard__imageFrame">
              <div className="pokeCard__imageBackground">
                <img
                  src={image}
                  alt={name}
                  className="pokeCard__pokemonImage"
                />
              </div>
              <div className="pokeCard__imageStrip" />
            </div>

            {/* Type Badge & ID row */}
            <div className="pokeCard__badgeRow">
              <div className="pokeCard__typeBadge">
                Pokémon
              </div>
              <span className="pokeCard__brandLabel">
                PokéWorld
              </span>
            </div>

            {/* Divider */}
            <div className="pokeCard__divider" />

            {/* Explore Button */}
            <div className="pokeCard__buttonWrapper">
              <button
                className="pokeCard__exploreButton"
                onClick={() => onExplore(id, name)}
              >
                ✨ Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokeCard;