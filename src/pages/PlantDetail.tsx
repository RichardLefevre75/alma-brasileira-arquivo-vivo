import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import plantsData from '../data/plants.json';
import type { Plant } from '../types';

const plants = plantsData as Plant[];

const USE_ICONS: Record<string, string> = {
  'Medicinal': '🌿', 'Alimentar': '🍃', 'Madeireiro': '🪵',
  'Ornamental': '🌸', 'Sagrado/Ritual': '🕯️', 'Paisagismo': '🏡',
  'Artesanato': '🧵', 'Apicultura': '🍯', 'Sombra': '☁️',
  'Reflorestamento': '🌱', 'Aromaterapia': '✨', 'Tintorial': '🎨',
};

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b" style={{ borderColor: 'var(--color-parchment-dark)' }}>
      <span className="text-lg mt-0.5">{icon}</span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-ink-muted)' }}>
          {label}
        </div>
        <div className="text-sm" style={{ color: 'var(--color-ink-soft)' }}>{value}</div>
      </div>
    </div>
  );
}

export default function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const plant = useMemo(() => plants.find((p) => p.id === id), [id]);

  // Plantas relacionadas (mesmo bioma ou tipo)
  const related = useMemo(() => {
    if (!plant) return [];
    return plants
      .filter((p) => p.id !== plant.id && (p.biome === plant.biome || p.type === plant.type))
      .slice(0, 4);
  }, [plant]);

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-parchment)' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">🌿</div>
          <h2 className="font-serif text-2xl mb-3" style={{ color: 'var(--color-forest)' }}>
            Planta não encontrada
          </h2>
          <Link
            to="/arquivo"
            className="px-6 py-2.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-parchment)' }}
          >
            Voltar ao Arquivo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-parchment)' }}>
      {/* Hero */}
      <div
        className="relative py-16 px-4 overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, var(--color-leaf-light) 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'rgba(245,240,232,0.5)' }}>
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <span>/</span>
            <Link to="/arquivo" className="hover:text-white transition-colors">Arquivo Botânico</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-earth-light)' }}>{plant.name}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: 'rgba(196,154,42,0.2)', color: 'var(--color-earth-light)' }}
            >
              {plant.type}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(245,240,232,0.8)' }}
            >
              {plant.biome}
            </span>
          </div>

          <h1
            className="font-serif text-4xl sm:text-5xl font-bold mb-2"
            style={{ color: 'var(--color-parchment)' }}
          >
            {plant.name}
          </h1>
          <p className="text-lg italic mb-4" style={{ color: 'rgba(245,240,232,0.6)' }}>
            {plant.scientific}
          </p>
          <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
            Família {plant.family}
          </p>

          {plant.otherNames && plant.otherNames.length > 0 && (
            <p className="text-sm mt-2" style={{ color: 'rgba(245,240,232,0.5)' }}>
              Também conhecida como: {plant.otherNames.join(', ')}
            </p>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Imagem */}
            {plant.imageUrl && (
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img
                  src={plant.imageUrl}
                  alt={plant.altText || `Foto botânica de ${plant.name} (${plant.scientific})`}
                  className="w-full h-72 object-cover"
                />
                {plant.imageCredit && (
                  <div
                    className="px-4 py-2 text-xs"
                    style={{ backgroundColor: 'var(--color-parchment-dark)', color: 'var(--color-ink-muted)' }}
                  >
                    📷 {plant.imageCredit}
                  </div>
                )}
              </div>
            )}

            {/* Descrição */}
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ backgroundColor: 'white', border: '1px solid var(--color-parchment-dark)' }}
            >
              <h2
                className="font-serif text-xl font-bold mb-4"
                style={{ color: 'var(--color-forest)' }}
              >
                Sobre a planta
              </h2>
              <p
                className="leading-relaxed font-lora text-base"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                {plant.description}
              </p>

              {plant.culturalNote && (
                <blockquote
                  className="mt-6 pl-4 border-l-4 italic text-sm"
                  style={{
                    borderColor: 'var(--color-earth)',
                    color: 'var(--color-bark)',
                  }}
                >
                  "{plant.culturalNote}"
                </blockquote>
              )}
            </div>

            {/* Usos */}
            {plant.uses && plant.uses.length > 0 && (
              <div
                className="rounded-2xl p-6 sm:p-8"
                style={{ backgroundColor: 'white', border: '1px solid var(--color-parchment-dark)' }}
              >
                <h2
                  className="font-serif text-xl font-bold mb-4"
                  style={{ color: 'var(--color-forest)' }}
                >
                  Usos e aplicações
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {plant.uses.map((use) => (
                    <div
                      key={use}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                      style={{ backgroundColor: 'var(--color-mist)' }}
                    >
                      <span className="text-xl">{USE_ICONS[use] || '🌿'}</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--color-ink-soft)' }}>
                        {use}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {plant.tags && plant.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-ink-muted)' }}>
                  Palavras-chave
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plant.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/arquivo?q=${encodeURIComponent(tag)}`}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:opacity-80"
                      style={{
                        backgroundColor: 'var(--color-parchment-dark)',
                        color: 'var(--color-ink-soft)',
                      }}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Link Wikipedia */}
            {plant.wikiUrl && (
              <div
                className="rounded-xl p-4 flex items-center gap-3"
                style={{ backgroundColor: 'var(--color-mist)', border: '1px solid var(--color-parchment-dark)' }}
              >
                <span className="text-2xl">📖</span>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--color-forest)' }}>
                    Leia mais na Wikipedia
                  </div>
                  <a
                    href={plant.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hover:underline"
                    style={{ color: 'var(--color-earth)' }}
                  >
                    {plant.wikiUrl}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Ficha técnica lateral */}
          <div className="space-y-6">
            <div
              className="rounded-2xl p-5 sticky top-20"
              style={{ backgroundColor: 'white', border: '1px solid var(--color-parchment-dark)' }}
            >
              <h2
                className="font-serif text-lg font-bold mb-4"
                style={{ color: 'var(--color-forest)' }}
              >
                Ficha Técnica
              </h2>

              <InfoRow icon="🗺️" label="Região" value={plant.region} />
              <InfoRow icon="🌡️" label="Clima" value={plant.climate} />
              <InfoRow icon="☀️" label="Luminosidade" value={plant.light} />
              <InfoRow icon="💧" label="Rega" value={plant.watering} />
              <InfoRow icon="🌱" label="Adubação" value={plant.fertilizing} />
              <InfoRow icon="🪨" label="Solo" value={plant.soilType} />
              <InfoRow icon="📏" label="Altura adulta" value={plant.height} />
              <InfoRow icon="🌸" label="Cor da flor" value={plant.flowerColor} />
              <InfoRow icon="🍃" label="Tipo de folha" value={plant.leafType} />

              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-parchment-dark)' }}>
                <Link
                  to="/arquivo"
                  className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-forest)' }}
                >
                  ← Voltar ao Arquivo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Plantas relacionadas */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2
              className="font-serif text-2xl font-bold mb-6"
              style={{ color: 'var(--color-forest)' }}
            >
              Plantas relacionadas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/arquivo/${rel.id}`}
                  className="group rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-md"
                  style={{ backgroundColor: 'white', border: '1px solid var(--color-parchment-dark)' }}
                >
                  <div className="text-2xl mb-2">🌿</div>
                  <div
                    className="text-sm font-semibold font-serif mb-0.5 group-hover:underline"
                    style={{ color: 'var(--color-forest)' }}
                  >
                    {rel.name}
                  </div>
                  <div className="text-xs italic" style={{ color: 'var(--color-ink-muted)' }}>
                    {rel.type} · {rel.biome?.split(',')[0].trim()}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
