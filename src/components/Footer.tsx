import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-parchment)' }}
      className="mt-auto"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Identidade */}
          <div>
            <h3
              className="font-serif text-lg font-semibold mb-3"
              style={{ color: 'var(--color-earth-light)' }}
            >
              A Alma Brasileira na Paisagem
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.7)' }}>
              Arquivo Vivo — extensão digital do livro. Um catálogo de 100 plantas
              brasileiras com dados botânicos, culturais e ecológicos.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: 'var(--color-earth-light)' }}
            >
              Navegação
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Início' },
                { to: '/arquivo', label: 'Arquivo Botânico' },
                { to: '/ensaios', label: 'Ensaios' },
                { to: '/sobre', label: 'Sobre o Projeto' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(245,240,232,0.65)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sobre */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: 'var(--color-earth-light)' }}
            >
              Sobre o Arquivo
            </h4>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(245,240,232,0.65)' }}>
              Este site é gratuito, permanente e de acesso livre. Hospedado no GitHub Pages,
              continuará disponível independentemente de qualquer custo de hospedagem.
            </p>
            <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
              Dados botânicos baseados em fontes científicas públicas.
              Imagens sob licença Creative Commons.
            </p>
          </div>
        </div>

        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
            © {new Date().getFullYear()} A Alma Brasileira na Paisagem — Arquivo Vivo
          </p>
          <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
            Conteúdo livre para uso educacional e não-comercial
          </p>
        </div>
      </div>
    </footer>
  );
}
