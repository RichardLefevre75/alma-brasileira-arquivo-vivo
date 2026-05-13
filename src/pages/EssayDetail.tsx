import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import essaysData from '../data/essays.json';
import type { Essay } from '../types';

const essays = essaysData as Essay[];

export default function EssayDetail() {
  const { id } = useParams<{ id: string }>();
  const essay = useMemo(() => essays.find((e) => e.id === id), [id]);

  if (!essay) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-parchment)' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="font-serif text-2xl mb-3" style={{ color: 'var(--color-forest)' }}>
            Ensaio não encontrado
          </h2>
          <Link to="/ensaios" className="px-6 py-2.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-parchment)' }}>
            Voltar aos Ensaios
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = essay.content.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-parchment)' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-forest)' }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'rgba(245,240,232,0.5)' }}>
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <span>/</span>
            <Link to="/ensaios" className="hover:text-white transition-colors">Ensaios</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-earth-light)' }}>{essay.title}</span>
          </div>
          {essay.tags && essay.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {essay.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: 'rgba(196,154,42,0.15)', color: 'var(--color-earth-light)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{ color: 'var(--color-parchment)' }}>
            {essay.title}
          </h1>
          {essay.subtitle && (
            <p className="text-lg italic mb-4" style={{ color: 'rgba(245,240,232,0.65)' }}>
              {essay.subtitle}
            </p>
          )}
          {(essay.author || essay.date) && (
            <p className="text-sm" style={{ color: 'rgba(245,240,232,0.45)' }}>
              {essay.author}{essay.author && essay.date && ' · '}{essay.date}
            </p>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Excerpt em destaque */}
        <blockquote
          className="text-lg sm:text-xl font-lora italic leading-relaxed mb-10 pl-5 border-l-4"
          style={{ color: 'var(--color-bark)', borderColor: 'var(--color-earth)' }}
        >
          {essay.excerpt}
        </blockquote>

        {/* Corpo do ensaio */}
        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <p key={i} className="font-lora text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--color-ink-soft)' }}>
              {para}
            </p>
          ))}
        </div>

        {/* Navegação */}
        <div className="mt-12 pt-8 border-t flex items-center justify-between"
          style={{ borderColor: 'var(--color-parchment-dark)' }}>
          <Link to="/ensaios"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: 'var(--color-forest)' }}>
            ← Todos os ensaios
          </Link>
          <Link to="/arquivo"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: 'var(--color-forest)' }}>
            Arquivo Botânico →
          </Link>
        </div>
      </div>
    </div>
  );
}
