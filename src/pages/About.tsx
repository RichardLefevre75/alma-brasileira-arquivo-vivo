import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-parchment)' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-forest)' }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-earth-light)' }}>
            Sobre o Projeto
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold"
            style={{ color: 'var(--color-parchment)' }}>
            A Alma Brasileira na Paisagem
          </h1>
          <p className="text-base mt-3" style={{ color: 'rgba(245,240,232,0.7)' }}>
            Arquivo Vivo — extensão digital do livro
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        {/* O que é */}
        <section
          className="rounded-2xl p-6 sm:p-8"
          style={{ backgroundColor: 'white', border: '1px solid var(--color-parchment-dark)' }}
        >
          <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: 'var(--color-forest)' }}>
            O que é este Arquivo?
          </h2>
          <div className="space-y-4 font-lora text-base leading-relaxed"
            style={{ color: 'var(--color-ink-soft)' }}>
            <p>
              Este site é a extensão digital do livro <em>A Alma Brasileira na Paisagem</em>.
              Ele existe para que o leitor que encontrar o QR Code nas páginas do livro possa
              aprofundar seu encontro com as plantas que habitam a cultura, a memória e a
              paisagem do Brasil.
            </p>
            <p>
              O catálogo reúne 100 espécies da flora brasileira — desde as árvores sagradas
              do candomblé até as plantas medicinais dos quintais nordestinos, das madeiras
              nobres da Amazônia às flores dos campos do Cerrado. Cada ficha traz dados
              botânicos, culturais e ecológicos, além de informações práticas sobre cultivo.
            </p>
          </div>
        </section>

        {/* Permanência */}
        <section
          className="rounded-2xl p-6 sm:p-8"
          style={{ backgroundColor: 'var(--color-mist)', border: '1px solid var(--color-parchment-dark)' }}
        >
          <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: 'var(--color-forest)' }}>
            Um arquivo para durar
          </h2>
          <div className="space-y-4 font-lora text-base leading-relaxed"
            style={{ color: 'var(--color-ink-soft)' }}>
            <p>
              Este site foi construído como um arquivo estático hospedado no GitHub Pages —
              uma plataforma gratuita mantida pela Microsoft que existe desde 2008 e hospeda
              milhões de sites sem custo. Não há servidor para pagar, não há banco de dados
              para manter.
            </p>
            <p>
              O QR Code impresso no livro continuará funcionando mesmo que o autor não possa
              mais pagar por hospedagem. O conteúdo está nos arquivos do repositório, acessível
              para qualquer pessoa que queira continuar o arquivo no futuro.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🆓', title: 'Gratuito', desc: 'Sem custo de hospedagem, para sempre' },
              { icon: '🔓', title: 'Aberto', desc: 'Código e dados acessíveis no GitHub' },
              { icon: '♾️', title: 'Permanente', desc: 'Não depende de pagamentos contínuos' },
            ].map((item) => (
              <div key={item.title} className="text-center p-4 rounded-xl"
                style={{ backgroundColor: 'white', border: '1px solid var(--color-parchment-dark)' }}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: 'var(--color-forest)' }}>
                  {item.title}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Como editar */}
        <section
          className="rounded-2xl p-6 sm:p-8"
          style={{ backgroundColor: 'white', border: '1px solid var(--color-parchment-dark)' }}
        >
          <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: 'var(--color-forest)' }}>
            Como adicionar novas plantas
          </h2>
          <div className="space-y-4 font-lora text-base leading-relaxed"
            style={{ color: 'var(--color-ink-soft)' }}>
            <p>
              O catálogo é editado diretamente no arquivo <code
                className="px-1.5 py-0.5 rounded text-sm font-mono"
                style={{ backgroundColor: 'var(--color-parchment-dark)', color: 'var(--color-forest)' }}>
                src/data/plants.json
              </code> no repositório do GitHub. Qualquer pessoa com acesso ao repositório
              pode adicionar, editar ou remover plantas seguindo o mesmo formato dos registros existentes.
            </p>
            <p>
              Não é necessário saber programar. O arquivo JSON segue um formato simples e
              bem documentado. Após a edição, o site é atualizado automaticamente em alguns minutos.
            </p>
          </div>

          <div
            className="mt-6 rounded-xl p-4 font-mono text-xs overflow-x-auto"
            style={{ backgroundColor: 'var(--color-parchment-dark)', color: 'var(--color-ink-soft)' }}
          >
            <pre>{`{
  "id": "nome-da-planta",
  "name": "Nome Popular",
  "scientific": "Genus species",
  "family": "Família Botânica",
  "type": "Árvore",
  "biome": "Mata Atlântica",
  "region": "Sul, Sudeste",
  "climate": "Tropical úmido",
  "light": "Sol pleno",
  "watering": "Moderada",
  "fertilizing": "Anual",
  "soilType": "Argiloso, bem drenado",
  "height": "10–20 m",
  "flowerColor": "Branca",
  "leafType": "Simples, perene",
  "uses": ["Madeireiro", "Medicinal"],
  "tags": ["nativa", "mata atlântica"],
  "description": "Descrição da planta...",
  "culturalNote": "Nota cultural opcional...",
  "wikiUrl": "https://pt.wikipedia.org/...",
  "imageCredit": "Autor da foto (CC BY-SA)"
}`}</pre>
          </div>
        </section>

        {/* Fontes */}
        <section
          className="rounded-2xl p-6 sm:p-8"
          style={{ backgroundColor: 'white', border: '1px solid var(--color-parchment-dark)' }}
        >
          <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: 'var(--color-forest)' }}>
            Fontes e créditos
          </h2>
          <div className="space-y-3 text-sm" style={{ color: 'var(--color-ink-soft)' }}>
            {[
              { name: 'Flora e Funga do Brasil', url: 'https://floradobrasil.jbrj.gov.br' },
              { name: 'Embrapa Recursos Genéticos e Biotecnologia', url: 'https://www.embrapa.br' },
              { name: 'SiBBr — Sistema de Informação sobre a Biodiversidade Brasileira', url: 'https://www.sibbr.gov.br' },
              { name: 'Tropicos — Missouri Botanical Garden', url: 'https://tropicos.org' },
              { name: 'Wikipedia (Wikimedia Commons)', url: 'https://pt.wikipedia.org' },
            ].map((source) => (
              <div key={source.name} className="flex items-center gap-2">
                <span style={{ color: 'var(--color-leaf)' }}>→</span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: 'var(--color-earth)' }}
                >
                  {source.name}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            Imagens utilizadas sob licença Creative Commons. Créditos individuais disponíveis
            em cada ficha botânica.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/arquivo"
            className="inline-block px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-parchment)' }}
          >
            Explorar o Arquivo Botânico →
          </Link>
        </div>
      </div>
    </div>
  );
}
