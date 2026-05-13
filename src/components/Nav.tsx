import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Início' },
    { to: '/arquivo', label: 'Arquivo Botânico' },
    { to: '/ensaios', label: 'Ensaios' },
    { to: '/sobre', label: 'Sobre' },
  ];

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav
      style={{ backgroundColor: 'var(--color-forest)' }}
      className="sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: 'var(--color-earth-light)', color: 'var(--color-forest)' }}
            >
              🌿
            </div>
            <div className="hidden sm:block">
              <div
                className="text-sm font-semibold leading-tight font-serif"
                style={{ color: 'var(--color-parchment)' }}
              >
                A Alma Brasileira
              </div>
              <div className="text-xs" style={{ color: 'var(--color-earth-light)' }}>
                Arquivo Vivo
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive(link.to)
                    ? 'var(--color-earth-light)'
                    : 'rgba(245, 240, 232, 0.75)',
                  backgroundColor: isActive(link.to)
                    ? 'rgba(255,255,255,0.08)'
                    : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md"
            style={{ color: 'var(--color-parchment)' }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="md:hidden pb-4 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-medium transition-colors"
                style={{
                  color: isActive(link.to)
                    ? 'var(--color-earth-light)'
                    : 'rgba(245, 240, 232, 0.8)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
