import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Award, Trophy } from 'lucide-react';
import { getPlayer } from '../services/playerService';
import Spinner from '../components/Spinner';

const StatBox = ({ label, value }) => (
  <div className="rounded-lg bg-neutral-800 p-4 text-center">
    <p className="font-display text-2xl text-gold">{value}</p>
    <p className="text-xs text-neutral-500">{label}</p>
  </div>
);

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayer(id).then(({ data }) => setPlayer(data.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner full />;
  if (!player) return <p className="py-20 text-center text-neutral-500">Player not found.</p>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link to="/team" className="mb-4 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-gold">
        <ArrowLeft size={16} /> Back to Team
      </Link>

      {/* Red header banner with photo, like the reference "Player Profile" screen */}
      <div className="overflow-hidden rounded-2xl border border-neutral-800 shadow-md">
        <div className="flex items-center justify-between gap-4 bg-gold p-6 text-white">
          <div>
            <h1 className="font-display text-3xl leading-none">{player.fullName}</h1>
            {player.nickname && <p className="mt-1 text-white/80">"{player.nickname}"</p>}
            <p className="mt-2 text-sm text-white/90">{player.role} &middot; India</p>
          </div>
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-neutral-800">
            {player.photo ? (
              <img src={player.photo} alt={player.fullName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-display text-3xl text-gold bg-white">{player.fullName?.[0]}</div>
            )}
          </div>
        </div>

        <div className="bg-neutral-900 p-6">
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase text-neutral-500">Jersey No.</p>
              <p className="mt-0.5 font-semibold text-neutral-100">#{player.jerseyNumber}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-neutral-500">Batting Style</p>
              <p className="mt-0.5 font-semibold text-neutral-100">{player.battingStyle}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-neutral-500">Bowling Style</p>
              <p className="mt-0.5 font-semibold text-neutral-100">{player.bowlingStyle}</p>
            </div>
          </div>

          {player.awards?.length > 0 && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold">
              <Trophy size={16} /> {player.awards.length} Trophy Cabinet {player.awards.length === 1 ? 'Entry' : 'Entries'}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-4 font-display text-2xl text-gold">Career Stats</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <StatBox label="Matches" value={player.stats?.matchesPlayed ?? 0} />
          <StatBox label="Runs" value={player.stats?.runs ?? 0} />
          <StatBox label="Wickets" value={player.stats?.wickets ?? 0} />
          <StatBox label="Strike Rate" value={player.stats?.strikeRate ?? 0} />
          <StatBox label="Average" value={player.stats?.average ?? 0} />
        </div>
      </div>

      {player.awards?.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl text-gold"><Trophy size={20} /> Trophy Cabinet</h2>
          <ul className="space-y-2">
            {player.awards.map((a, i) => (
              <li key={i} className="card flex items-center gap-2 py-3 text-neutral-300"><Award size={16} className="text-gold shrink-0" /> {a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlayerProfile;
