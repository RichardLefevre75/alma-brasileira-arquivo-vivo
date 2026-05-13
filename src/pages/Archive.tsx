import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import plantsData from '../data/plants.json';
import type { Plant } from '../types';

const plants = plantsData as Plant[];

const USE_ICONS: Record<string, string> = {
  'Medicinal': '🌿', 'Alimentar': '🍃', 'Madeireiro': '🪵',
  'Ornamental': '🌸', 'Sagrado/Ritual': '🕯️', 'Paisagismo': '🏡',
  'Artesanato': '🧵', 'Apicultura': '🍯', 'Sombra': '☁️',
  'Reflorestamento': '🌱', 'Aromaterapia': '✨', 'Tintorial': '🎨',
};

const LIGHT_ICONS: Record<string, string> = {
  'Sol pleno': '☀️', 'Meia-sombra': '⛅', 'Sombra': '🌑',
  'Sol pleno a meia-sombra': '🌤️',
};

function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link
      to={`/arquivo/${plant.id}`}
      className="group block rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: 'white',
        border: '1px solid var(--color-parchment-dark)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Imagem ou placeholder */}
      <div
        className="h-44 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest-mid)' }}
      >
        {plant.imageUrl ? (
          <img
            src={plant.imageUrl}
            alt={plant.altText || `Foto de ${plant.name}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="text-4xl opacity-40">🌿</span>
            <span className="text-xs opacity-30" style={{ color: 'var(--color-parchment)' }}>
              {plant.scientific}
            </span>
          </div>
        )}
        {/* Badge tipo */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: 'rgba(26,46,26,0.85)', color: 'var(--color-earth-light)' }}
        >
          {plant.type}
        </div>
        {/* Badge bioma */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'rgba(245,240,232,0.9)' }}
        >
          {plant.biome?.split(',')[0].trim()}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3
          className="font-serif text-lg font-bold mb-0.5 group-hover:text-forest transition-colors"
          style={{ color: 'var(--color-forest)' }}
        >
          {plant.name}
        </h3>
        <p className="text-xs italic mb-3" style={{ color: 'var(--color-ink-muted)' }}>
          {plant.scientific}
        </p>

        {/* Cuidados rápidos */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            {LIGHT_ICONS[plant.light] || '☀️'} {plant.light}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            💧 {plant.watering}
          </span>
        </div>

        {/* Usos */}
        {plant.uses && plant.uses.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {plant.uses.slice(0, 3).map((use) => (
              <span
                key={use}
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: 'var(--color-parchment-dark)',
                  color: 'var(--color-ink-soft)',
                }}
              >
                {USE_ICONS[use] || ''} {use}
              </span>
            ))}
            {plant.uses.length > 3 && (
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                +{plant.uses.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function Archive() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Filtros
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [selectedBiome, setSelectedBiome] = useState(searchParams.get('biome') || '');
  const [selectedLight, setSelectedLight] = useState(searchParams.get('light') || '');
  const [selectedUse, setSelectedUse] = useState(searchParams.get('use') || '');
  const [selectedClimate, setSelectedClimate] = useState(searchParams.get('climate') || '');
  const [showFilters, setShowFilters] = useState(false);

  // Debounce da busca
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Facetas
  const facets = useMemo(() => ({
    types: [...new Set(plants.map((p) => p.type))].sort(),
    biomes: [...new Set(plants.map((p) => p.biome?.split(',')[0].trim()).filter(Boolean))].sort(),
    lights: [...new Set(plants.map((p) => p.light).filter(Boolean))].sort(),
    uses: [...new Set(plants.flatMap((p) => p.uses || []))].sort(),
    climates: [...new Set(plants.map((p) => p.climate).filter(Boolean))].sort(),
  }), []);

  // Filtragem
  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();
    return plants.filter((p) => {
      if (q) {
        const haystack = [
          p.name, p.scientific, p.family,
          ...(p.otherNames || []),
          p.description, p.culturalNote,
          ...(p.tags || []),
        ].join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (selectedType && p.type !== selectedType) return false;
      if (selectedBiome && !p.biome?.includes(selectedBiome)) return false;
      if (selectedLight && p.light !== selectedLight) return false;
      if (selectedUse && !(p.uses || []).includes(selectedUse)) return false;
      if (selectedClimate && p.climate !== selectedClimate) return false;
      return true;
    });
  }, [debouncedSearch, selectedType, selectedBiome, selectedLight, selectedUse, selectedClimate]);

  const activeFiltersCount = [selectedType, selectedBiome, selectedLight, selectedUse, selectedClimate]
    .filter(Boolean).length;

  const clearFilters = () => {
    setSelectedType('');
    setSelectedBiome('');
    setSelectedLight('');
    setSelectedUse('');
    setSelectedClimate('');
    setSearch('');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-parchment)' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-forest)' }} className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-earth-light)' }}
          >
            Catálogo
          </div>
          <h1
            className="font-serif text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: 'var(--color-parchment)' }}
          >
            Arquivo Botânico
          </h1>
          <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(245,240,232,0.7)' }}>
            {plants.length} espécies catalogadas — busque por nome, bioma, uso ou características
          </p>

          {/* Barra de busca */}
          <div className="relative max-w-2xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: 'rgba(245,240,232,0.4)' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, bioma, uso, característica..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'var(--color-parchment)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded"
                style={{ color: 'rgba(245,240,232,0.5)' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Barra de controles */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: showFilters ? 'var(--color-forest)' : 'var(--color-parchment-dark)',
                color: showFilters ? 'var(--color-parchment)' : 'var(--color-ink-soft)',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filtros
              {activeFiltersCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{ backgroundColor: 'var(--color-earth-light)', color: 'var(--color-forest)' }}
                >
                  {activeFiltersCount}
                </span>
              )}
            </button>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm transition-colors"
                style={{ color: 'var(--color-earth)' }}
              >
                Limpar filtros
              </button>
            )}
          </div>
          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
            {filtered.length === plants.length
              ? `${plants.length} plantas`
              : `${filtered.length} de ${plants.length} plantas`}
          </p>
        </div>

        {/* Painel de filtros */}
        {showFilters && (
          <div
            className="rounded-xl p-5 mb-6 animate-slide-up"
            style={{ backgroundColor: 'var(--color-mist)', border: '1px solid var(--color-parchment-dark)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Tipo', value: selectedType, setter: setSelectedType, options: facets.types },
                { label: 'Bioma', value: selectedBiome, setter: setSelectedBiome, options: facets.biomes },
                { label: 'Luz', value: selectedLight, setter: setSelectedLight, options: facets.lights },
                { label: 'Uso', value: selectedUse, setter: setSelectedUse, options: facets.uses },
                { label: 'Clima', value: selectedClimate, setter: setSelectedClimate, options: facets.climates },
              ].map(({ label, value, setter, options }) => (
                <div key={label}>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {label}
                  </label>
                  <select
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid var(--color-parchment-dark)',
                      color: 'var(--color-ink)',
                    }}
                  >
                    <option value="">Todos</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chips de filtros ativos */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { label: selectedType, clear: () => setSelectedType('') },
              { label: selectedBiome, clear: () => setSelectedBiome('') },
              { label: selectedLight, clear: () => setSelectedLight('') },
              { label: selectedUse, clear: () => setSelectedUse('') },
              { label: selectedClimate, clear: () => setSelectedClimate('') },
            ].filter((f) => f.label).map((f) => (
              <button
                key={f.label}
                onClick={f.clear}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-parchment)' }}
              >
                {f.label}
                <span className="opacity-60">✕</span>
              </button>
            ))}
          </div>
        )}

        {/* Grid de plantas */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-30">🌿</div>
            <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--color-forest)' }}>
              Nenhuma planta encontrada
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-ink-muted)' }}>
              Tente outros termos ou remova alguns filtros
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-lg text-sm font-medium"
              style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-parchment)' }}
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
