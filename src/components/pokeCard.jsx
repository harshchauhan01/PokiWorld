import React from 'react';
import styled from 'styled-components';

const PokeCard = ({
  name = 'Charizard',
  image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  type = 'Fire',
  hp = 78,
  attack = 84,
  defense = 78,
  speed = 100,
}) => {
  const typeColors = {
    Fire: { primary: '#F08030', secondary: '#FFF3E0', gradient: 'linear-gradient(135deg, #F08030, #FF6B35, #FFA726)' },
    Water: { primary: '#6890F0', secondary: '#E3F2FD', gradient: 'linear-gradient(135deg, #6890F0, #42A5F5, #29B6F6)' },
    Grass: { primary: '#78C850', secondary: '#E8F5E9', gradient: 'linear-gradient(135deg, #78C850, #66BB6A, #43A047)' },
    Electric: { primary: '#F8D030', secondary: '#FFFDE7', gradient: 'linear-gradient(135deg, #F8D030, #FFEE58, #FDD835)' },
    Psychic: { primary: '#F85888', secondary: '#FCE4EC', gradient: 'linear-gradient(135deg, #F85888, #EC407A, #F06292)' },
    Ice: { primary: '#98D8D8', secondary: '#E0F7FA', gradient: 'linear-gradient(135deg, #98D8D8, #80DEEA, #4DD0E1)' },
    Dragon: { primary: '#7038F8', secondary: '#EDE7F6', gradient: 'linear-gradient(135deg, #7038F8, #7C4DFF, #651FFF)' },
    Normal: { primary: '#A8A878', secondary: '#F5F5F5', gradient: 'linear-gradient(135deg, #A8A878, #BDBDBD, #9E9E9E)' },
    Poison: { primary: '#A040A0', secondary: '#F3E5F5', gradient: 'linear-gradient(135deg, #A040A0, #AB47BC, #8E24AA)' },
    Ground: { primary: '#E0C068', secondary: '#FFF8E1', gradient: 'linear-gradient(135deg, #E0C068, #D4A03C, #C49A2A)' },
    Fighting: { primary: '#C03028', secondary: '#FFEBEE', gradient: 'linear-gradient(135deg, #C03028, #E53935, #D32F2F)' },
    Rock: { primary: '#B8A038', secondary: '#F5F5DC', gradient: 'linear-gradient(135deg, #B8A038, #A09028, #8B7D2E)' },
    Bug: { primary: '#A8B820', secondary: '#F1F8E9', gradient: 'linear-gradient(135deg, #A8B820, #9E9D24, #827717)' },
    Ghost: { primary: '#705898', secondary: '#EDE7F6', gradient: 'linear-gradient(135deg, #705898, #7E57C2, #5E35B1)' },
    Dark: { primary: '#705848', secondary: '#EFEBE9', gradient: 'linear-gradient(135deg, #705848, #6D4C41, #5D4037)' },
    Steel: { primary: '#B8B8D0', secondary: '#ECEFF1', gradient: 'linear-gradient(135deg, #B8B8D0, #90A4AE, #78909C)' },
    Fairy: { primary: '#EE99AC', secondary: '#FCE4EC', gradient: 'linear-gradient(135deg, #EE99AC, #F48FB1, #F06292)' },
    Flying: { primary: '#A890F0', secondary: '#EDE7F6', gradient: 'linear-gradient(135deg, #A890F0, #9575CD, #7E57C2)' },
  };

  const colors = typeColors[type] || typeColors.Normal;

  const getStatWidth = (stat) => Math.min((stat / 150) * 100, 100);

  return (
    <StyledWrapper $typeColor={colors.primary} $typeSecondary={colors.secondary} $typeGradient={colors.gradient}>
      <div className="card">
        {/* Holographic shimmer overlay */}
        <div className="holo-overlay" />

        <div className="card-inner">
          {/* Header */}
          <div className="card-header">
            <span className="pokemon-name">{name}</span>
            <span className="pokemon-hp">
              <span className="hp-label">HP</span>
              <span className="hp-value">{hp}</span>
              <span className="hp-icon">🔥</span>
            </span>
          </div>

          {/* Image Area */}
          <div className="image-frame">
            <div className="image-container">
              <img src={image} alt={name} className="pokemon-image" />
            </div>
            <div className="image-border-decor" />
          </div>

          {/* Type Badge */}
          <div className="type-row">
            <div className="type-badge">
              {type}
            </div>
            <span className="pokemon-id">PokeWorld</span>
          </div>

          {/* Divider */}
          <div className="divider" />

          {/* Stats */}
          <div className="stats-container">
            <div className="stat-row">
              <span className="stat-label">⚔️ Attack</span>
              <div className="stat-bar-bg">
                <div className="stat-bar" style={{ width: `${getStatWidth(attack)}%` }} />
              </div>
              <span className="stat-value">{attack}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">🛡️ Defense</span>
              <div className="stat-bar-bg">
                <div className="stat-bar" style={{ width: `${getStatWidth(defense)}%` }} />
              </div>
              <span className="stat-value">{defense}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">⚡ Speed</span>
              <div className="stat-bar-bg">
                <div className="stat-bar" style={{ width: `${getStatWidth(speed)}%` }} />
              </div>
              <span className="stat-value">{speed}</span>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 280px;
    border-radius: 16px;
    background: ${({ $typeSecondary }) => $typeSecondary};
    padding: 10px;
    overflow: hidden;
    box-shadow:
      0 4px 15px rgba(0, 0, 0, 0.2),
      0 0 30px ${({ $typeColor }) => $typeColor}33,
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                box-shadow 0.4s ease;
    font-family: 'Segoe UI', Arial, sans-serif;
    position: relative;
    border: 3px solid ${({ $typeColor }) => $typeColor};
    cursor: pointer;
  }

  .card:hover {
    transform: scale(1.05) rotateY(-2deg) rotateX(2deg);
    box-shadow:
      0 8px 30px rgba(0, 0, 0, 0.3),
      0 0 50px ${({ $typeColor }) => $typeColor}55;
  }

  .card:hover .holo-overlay {
    opacity: 0.15;
  }

  .card:hover .pokemon-image {
    transform: scale(1.08);
    filter: drop-shadow(0 8px 20px ${({ $typeColor }) => $typeColor}88);
  }

  .holo-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      125deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 25%,
      transparent 35%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 65%,
      rgba(255, 255, 255, 0.4) 80%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 10;
    border-radius: 14px;
  }

  .card-inner {
    position: relative;
    z-index: 1;
  }

  /* Header */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    margin-bottom: 6px;
  }

  .pokemon-name {
    font-size: 20px;
    font-weight: 800;
    color: #1a1a2e;
    text-transform: capitalize;
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .pokemon-hp {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .hp-label {
    font-size: 11px;
    font-weight: 700;
    color: ${({ $typeColor }) => $typeColor};
    letter-spacing: 1px;
  }

  .hp-value {
    font-size: 22px;
    font-weight: 900;
    color: #1a1a2e;
  }

  .hp-icon {
    font-size: 14px;
  }

  /* Image Frame */
  .image-frame {
    position: relative;
    margin: 0 4px;
    border-radius: 10px;
    overflow: hidden;
    border: 3px solid ${({ $typeColor }) => $typeColor}66;
  }

  .image-container {
    height: 170px;
    background: ${({ $typeGradient }) => $typeGradient};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .image-container::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .image-container::after {
    content: '';
    position: absolute;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .pokemon-image {
    width: 150px;
    height: 150px;
    object-fit: contain;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 5px 15px ${({ $typeColor }) => $typeColor}66);
    transition: transform 0.4s ease, filter 0.4s ease;
  }

  .image-border-decor {
    height: 4px;
    background: ${({ $typeGradient }) => $typeGradient};
  }

  /* Type Badge */
  .type-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px 4px;
  }

  .type-badge {
    background: ${({ $typeColor }) => $typeColor};
    color: white;
    padding: 3px 16px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    box-shadow: 0 2px 8px ${({ $typeColor }) => $typeColor}55;
  }

  .pokemon-id {
    font-size: 11px;
    font-weight: 700;
    color: #666;
    letter-spacing: 1px;
  }

  /* Divider */
  .divider {
    height: 2px;
    margin: 6px 10px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ $typeColor }) => $typeColor}44,
      ${({ $typeColor }) => $typeColor},
      ${({ $typeColor }) => $typeColor}44,
      transparent
    );
    border-radius: 2px;
  }

  /* Stats */
  .stats-container {
    padding: 4px 10px 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .stat-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stat-label {
    font-size: 11px;
    font-weight: 600;
    color: #444;
    min-width: 82px;
    white-space: nowrap;
  }

  .stat-bar-bg {
    flex: 1;
    height: 8px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    overflow: hidden;
  }

  .stat-bar {
    height: 100%;
    background: ${({ $typeGradient }) => $typeGradient};
    border-radius: 10px;
    transition: width 1s ease;
    box-shadow: 0 1px 4px ${({ $typeColor }) => $typeColor}55;
  }

  .stat-value {
    font-size: 13px;
    font-weight: 800;
    color: #1a1a2e;
    min-width: 28px;
    text-align: right;
  }
`;

export default PokeCard;