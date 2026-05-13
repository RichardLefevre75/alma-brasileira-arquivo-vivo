import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import plantsData from '../data/plants.json';
import type { Plant } from '../types';

const plants = plantsData as Plant[];

function RandomPlantCard() {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const pickRandom = () => {
    const published = plants.filter((p) => p.description);
    const idx = Math.floor(Math.random() * published.length);
    setPlant(published[idx]);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => { pickRandom(); }, []);

  if (!plant) return null;

  return (
    <div
      key={animKey}
      className="animate-slide-up rounded-2xl overflow-hidden shadow-lg"
      style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-parchment)' }}
    >
      <div className="p-6 sm:p-8">
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: 'var(--color-earth-light)' }}
        >
          🌿 Espécie do Momento
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-1">
          {plant.name}
        </h3>
        <p className="text-sm italic mb-4" style={{ color: 'rgba(245,240,232,0.6)' }}>
          {plant.scientific}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--color-earth-light)' }}
          >
            {plant.biome}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(245,240,232,0.8)' }}
          >
            {plant.type}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(245,240,232,0.8)' }}
          >
            ☀️ {plant.light}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed mb-6 line-clamp-3"
          style={{ color: 'rgba(245,240,232,0.8)' }}
        >
          {plant.description}
        </p>
        {plant.culturalNote && (
          <p
            className="text-xs italic mb-6 pl-3 border-l-2"
            style={{ color: 'var(--color-earth-light)', borderColor: 'var(--color-earth)' }}
          >
            "{plant.culturalNote}"
          </p>
        )}
        <div className="flex items-center gap-3">
          <Link
            to={`/arquivo/${plant.id}`}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-earth-light)', color: 'var(--color-forest)' }}
          >
            Ver ficha completa →
          </Link>
          <button
            onClick={pickRandom}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all border"
            style={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'rgba(245,240,232,0.8)',
              backgroundColor: 'transparent',
            }}
          >
            Descobrir outra
          </button>
        </div>
      </div>
    </div>
  );
}

function BiomeStats() {
  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    plants.forEach((p) => {
      const biome = p.biome?.split(',')[0].trim() || 'Outros';
      counts[biome] = (counts[biome] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, []);

  const max = Math.max(...stats.map(([, c]) => c));

  return (
    <div className="space-y-3">
      {stats.map(([biome, count]) => (
        <div key={biome}>
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: 'var(--color-ink-soft)' }}>{biome}</span>
            <span className="font-semibold" style={{ color: 'var(--color-forest)' }}>{count}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-parchment-dark)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(count / max) * 100}%`,
                backgroundColor: 'var(--color-leaf)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const typeStats = useMemo(() => {
    const counts: Record<string, number> = {};
    plants.forEach((p) => { counts[p.type] = (counts[p.type] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-20 sm:py-28 px-4 overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        {/* Decoração de fundo */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-leaf-light) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, var(--color-earth-light) 0%, transparent 40%)`,
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(196,154,42,0.15)', color: 'var(--color-earth-light)' }}
          >
            Extensão Digital do Livro
          </div>
          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--color-parchment)' }}
          >
            A Alma Brasileira
            <br />
            <span style={{ color: 'var(--color-earth-light)' }}>na Paisagem</span>
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: 'rgba(245,240,232,0.75)' }}
          >
            Um arquivo vivo de{' '}
            <strong style={{ color: 'var(--color-earth-light)' }}>{plants.length} plantas brasileiras</strong>
            {' '}— catalogadas com dados botânicos, culturais e ecológicos.
            Cada espécie é uma história que a paisagem conta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/arquivo"
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--color-earth-light)', color: 'var(--color-forest)' }}
            >
              Explorar o Arquivo →
            </Link>
            <Link
              to="/ensaios"
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all border"
              style={{
                borderColor: 'rgba(255,255,255,0.25)',
                color: 'var(--color-parchment)',
                backgroundColor: 'transparent',
              }}
            >
              Ler os Ensaios
            </Link>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-10 px-4" style={{ backgroundColor: 'var(--color-forest-mid)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: plants.length.toString(), label: 'Plantas catalogadas' },
              { value: [...new Set(plants.map((p) => p.biome?.split(',')[0].trim()))].length.toString(), label: 'Biomas representados' },
              { value: [...new Set(plants.map((p) => p.type))].length.toString(), label: 'Tipos de plantas' },
              { value: [...new Set(plants.flatMap((p) => p.uses || []))].length.toString(), label: 'Categorias de uso' },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-4">
                <div
                  className="font-serif text-3xl sm:text-4xl font-bold mb-1"
                  style={{ color: 'var(--color-earth-light)' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm" style={{ color: 'rgba(245,240,232,0.65)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Planta aleatória */}
            <div>
              <RandomPlantCard />
            </div>

            {/* Distribuição por bioma */}
            <div>
              <div
                className="rounded-2xl p-6 sm:p-8 h-full"
                style={{ backgroundColor: 'var(--color-mist)', border: '1px solid var(--color-parchment-dark)' }}
              >
                <h2
                  className="font-serif text-xl font-bold mb-2"
                  style={{ color: 'var(--color-forest)' }}
                >
                  Distribuição por Bioma
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--color-ink-muted)' }}>
                  Plantas catalogadas em cada bioma brasileiro
                </p>
                <BiomeStats />

                <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-parchment-dark)' }}>
                  <h3
                    className="text-sm font-semibold mb-3"
                    style={{ color: 'var(--color-forest)' }}
                  >
                    Por tipo de planta
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {typeStats.map(([type, count]) => (
                      <Link
                        key={type}
                        to={`/arquivo?type=${encodeURIComponent(type)}`}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:opacity-80"
                        style={{
                          backgroundColor: 'var(--color-parchment-dark)',
                          color: 'var(--color-ink-soft)',
                        }}
                      >
                        {type} ({count})
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Ensaios */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: 'var(--color-parchment-dark)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--color-earth)' }}
          >
            Leitura
          </div>
          <h2
            className="font-serif text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: 'var(--color-forest)' }}
          >
            Ensaios sobre a Flora Brasileira
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            Textos que exploram a relação entre as plantas, a cultura e a identidade do Brasil.
            Da memória vegetal ao sagrado ancestral.
          </p>
          <Link
            to="/ensaios"
            className="inline-block px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-parchment)' }}
          >
            Ler os ensaios →
          </Link>
        </div>
      </section>

      {/* Nota de permanência */}
      <section className="py-10 px-4" style={{ backgroundColor: 'var(--color-forest)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.55)' }}>
            Este arquivo é gratuito e permanente. Hospedado no GitHub Pages, continuará
            disponível independentemente de qualquer custo de hospedagem — para que o QR Code
            do livro sempre funcione, hoje e no futuro.
          </p>
        </div>
      </section>
    </div>
  );
}
