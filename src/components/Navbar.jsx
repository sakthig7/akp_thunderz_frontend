import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/matches', label: 'Matches' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/news', label: 'News' },
  { to: '/register', label: 'Join Us' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-gold shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="AKP THUNDERz" className="h-11 w-11 rounded-full object-cover ring-2 ring-white" />
          <span className="font-display text-2xl text-white hidden sm:block">AKP THUNDERz</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-white ${isActive ? 'text-white' : 'text-white/75'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="inline-flex items-center gap-2 rounded-md border border-white/70 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white hover:text-gold">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
              )}
              <Link to="/profile" className="inline-flex items-center gap-2 rounded-md border border-white/70 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white hover:text-gold">
                <UserIcon size={16} /> {user.name?.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-md bg-maroon-dark px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-maroon">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-1.5 text-sm font-semibold text-gold transition hover:bg-neutral-900">Login</Link>
          )}
        </div>

        <button className="text-white lg:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/20 bg-gold-dark px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-white/90 hover:text-white">
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-white/20 pt-3">
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" onClick={() => setOpen(false)} className="rounded-md border border-white/70 px-3 py-1.5 text-sm font-semibold text-white">Dashboard</Link>
                  )}
                  <Link to="/profile" onClick={() => setOpen(false)} className="rounded-md border border-white/70 px-3 py-1.5 text-sm font-semibold text-white">Profile</Link>
                  <button onClick={handleLogout} className="rounded-md bg-maroon-dark px-3 py-1.5 text-sm font-semibold text-white">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-md bg-white px-4 py-1.5 text-sm font-semibold text-gold">Login</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
