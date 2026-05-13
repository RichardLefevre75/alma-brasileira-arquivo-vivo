import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import essaysData from '../data/essays.json';
import type { Essay } from '../types';

const essays = essaysData as Essay[];

export default function Essays() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return essays;
    return essays.filter((e) =>
      [e.title, e.subtitle || '', e.excerpt, e.content, ...(e.tags || [])]
        .join(' ').toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-parchment)' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-forest)' }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-earth-light)' }}>
            Leitura
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: 'var(--color-parchment)' }}>
            Ensaios
          </h1>
          <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(245,240,232,0.7)' }}>
            Textos sobre a flora, a cultura e a identidade brasileira
          </p>
          {/* Busca */}
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: 'rgba(245,240,232,0.4)' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar ensaios..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'var(--color-parchment)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4 opacity-30">📝</div>
            <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Nenhum ensaio encontrado para "{search}"
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((essay) => (
              <article
                key={essay.id}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: 'white', border: '1px solid var(--color-parchment-dark)' }}
              >
                <div className="p-6 sm:p-8">
                  {essay.tags && essay.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {essay.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: 'var(--color-parchment-dark)', color: 'var(--color-ink-muted)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2"
                    style={{ color: 'var(--color-forest)' }}>
                    {essay.title}
                  </h2>
                  {essay.subtitle && (
                    <p className="text-base italic mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                      {essay.subtitle}
                    </p>
                  )}
                  {(essay.author || essay.date) && (
                    <p className="text-xs mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                      {essay.author}{essay.author && essay.date && ' · '}{essay.date}
                    </p>
                  )}
                  <p className="font-lora text-base leading-relaxed mb-6"
                    style={{ color: 'var(--color-ink-soft)' }}>
                    {essay.excerpt}
                  </p>
                  <Link
                    to={`/ensaios/${essay.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-parchment)' }}
                  >
                    Ler ensaio completo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
