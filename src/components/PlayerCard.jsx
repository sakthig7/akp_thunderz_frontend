import React from 'react';
import { Link } from 'react-router-dom';

const PlayerCard = ({ player }) => (
  <Link to={`/team/${player._id}`} className="card group flex flex-col items-center text-center transition hover:border-gold hover:shadow-lg">
    <div className="relative mb-4">
      <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-gold bg-neutral-800">
        {player.photo ? (
          <img src={player.photo} alt={player.fullName} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-display text-gold">
            {player.fullName?.[0]}
          </div>
        )}
      </div>
      <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-white ring-2 ring-neutral-900">
        {player.jerseyNumber}
      </span>
    </div>
    <h3 className="font-display text-xl text-neutral-100 group-hover:text-gold">{player.fullName}</h3>
    <span className="badge mt-1 bg-gold/10 text-gold">{player.role}</span>
  </Link>
);

export default PlayerCard;
