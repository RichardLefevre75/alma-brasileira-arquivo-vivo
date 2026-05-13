# Tutorial: Como Editar o Catálogo de Plantas

> **Para herdeiros, editores e colaboradores do projeto "A Alma Brasileira na Paisagem"**

Este guia explica como adicionar, editar ou remover plantas do catálogo digital sem precisar de conhecimento técnico avançado. O site é completamente estático — todos os dados estão em arquivos de texto simples no repositório GitHub.

---

## Visão Geral do Projeto

O site está hospedado gratuitamente no **GitHub Pages** e é atualizado automaticamente sempre que alguém faz uma alteração no repositório. Não há servidor, banco de dados ou custos mensais — o site continuará funcionando indefinidamente.

- **URL do site**: https://richardlefevre75.github.io/alma-brasileira-arquivo-vivo/
- **Repositório**: https://github.com/RichardLefevre75/alma-brasileira-arquivo-vivo
- **Arquivo de plantas**: `src/data/plants.json`
- **Arquivo de ensaios**: `src/data/essays.json`

---

## Método 1: Editar diretamente no GitHub (mais simples — sem instalar nada)

Este método funciona direto no navegador, sem instalar nenhum programa.

### Passo 1 — Criar uma conta no GitHub (se ainda não tiver)

1. Acesse https://github.com e clique em **Sign up**
2. Crie uma conta gratuita
3. Peça ao administrador do repositório para te adicionar como colaborador

### Passo 2 — Abrir o arquivo de plantas

1. Acesse https://github.com/RichardLefevre75/alma-brasileira-arquivo-vivo
2. Clique na pasta `src` → `data` → `plants.json`
3. Clique no ícone de lápis (✏️) no canto superior direito para editar

### Passo 3 — Adicionar uma nova planta

O arquivo `plants.json` é uma lista de plantas. Cada planta segue este modelo:

```json
{
  "id": "nome-da-planta",
  "name": "Nome Popular",
  "otherNames": ["Outro nome", "Mais um nome"],
  "scientific": "Nome científico L.",
  "family": "Família botânica",
  "type": "Árvore",
  "biome": "Cerrado",
  "region": "Centro-Oeste",
  "climate": "Tropical",
  "light": "Sol pleno",
  "watering": "Semanal",
  "fertilizing": "Trimestral",
  "soilType": "Argiloso bem drenado",
  "height": "10–20 m",
  "flowerColor": "Amarelo",
  "leafType": "Caduca",
  "uses": ["Ornamental", "Madeireiro", "Medicinal"],
  "tags": ["cerrado", "nativa", "flores"],
  "description": "Descrição completa da planta...",
  "culturalNote": "Nota cultural ou histórica sobre a planta...",
  "wikiUrl": "https://pt.wikipedia.org/wiki/Nome_da_planta",
  "imageCredit": "Fonte da imagem",
  "imageUrl": "",
  "altText": ""
}
```

**Regras importantes:**
- O campo `id` deve ser único, em letras minúsculas, sem acentos, com hífens no lugar de espaços (ex: `ipe-amarelo`)
- O campo `biome` deve ser uma **string** (texto entre aspas), não uma lista
- Os campos `uses`, `tags` e `otherNames` devem ser **listas** (entre colchetes `[]`)
- Todos os outros campos devem ser **strings** (texto entre aspas)
- Separe cada planta com uma vírgula `,` no final do bloco `}`

### Passo 4 — Salvar as alterações

1. Após editar, role a página para baixo
2. Na seção **"Commit changes"**, escreva uma descrição (ex: "Adiciona planta Ipê-rosa")
3. Clique em **"Commit changes"** (botão verde)
4. Aguarde cerca de 1 minuto — o site será atualizado automaticamente

---

## Método 2: Editar localmente (para quem tem conhecimento técnico)

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)
- Um editor de texto como [VS Code](https://code.visualstudio.com/)

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/RichardLefevre75/alma-brasileira-arquivo-vivo.git
cd alma-brasileira-arquivo-vivo

# 2. Instalar dependências
npm install -g pnpm
pnpm install

# 3. Iniciar o servidor local
pnpm dev
# Abra http://localhost:5173 no navegador

# 4. Editar o arquivo de plantas
# Abra src/data/plants.json no VS Code e faça as alterações

# 5. Verificar se o build funciona
pnpm build

# 6. Enviar as alterações para o GitHub
git add src/data/plants.json
git commit -m "Adiciona planta: Nome da Planta"
git push origin main
```

O site será atualizado automaticamente em cerca de 1 minuto após o `git push`.

---

## Campos de Cada Planta — Referência Completa

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `id` | string | Identificador único (sem acentos, com hífens) | `"ipe-amarelo"` |
| `name` | string | Nome popular principal | `"Ipê-amarelo"` |
| `otherNames` | lista | Outros nomes populares | `["Ipê", "Pau d'arco"]` |
| `scientific` | string | Nome científico completo | `"Handroanthus albus"` |
| `family` | string | Família botânica | `"Bignoniaceae"` |
| `type` | string | Tipo de planta | `"Árvore"` |
| `biome` | string | Bioma(s) de ocorrência | `"Cerrado"` ou `"Cerrado, Caatinga"` |
| `region` | string | Região do Brasil | `"Centro-Oeste"` |
| `climate` | string | Tipo de clima | `"Tropical"` |
| `light` | string | Necessidade de luz | `"Sol pleno"` |
| `watering` | string | Frequência de rega | `"Semanal"` |
| `fertilizing` | string | Frequência de adubação | `"Trimestral"` |
| `soilType` | string | Tipo de solo ideal | `"Argiloso bem drenado"` |
| `height` | string | Altura adulta | `"10–20 m"` |
| `flowerColor` | string | Cor da flor | `"Amarelo"` |
| `leafType` | string | Tipo de folha | `"Caduca"` ou `"Perene"` |
| `uses` | lista | Usos da planta | `["Ornamental", "Medicinal"]` |
| `tags` | lista | Palavras-chave para busca | `["cerrado", "nativa"]` |
| `description` | string | Descrição botânica e ecológica | `"O Ipê-amarelo é..."` |
| `culturalNote` | string | Nota cultural ou histórica | `"Símbolo nacional..."` |
| `wikiUrl` | string | Link da Wikipedia | `"https://pt.wikipedia.org/..."` |
| `imageCredit` | string | Crédito da imagem | `"Foto: João Silva"` |
| `imageUrl` | string | URL da imagem (opcional) | `""` |
| `altText` | string | Descrição da imagem para acessibilidade | `""` |

### Valores válidos para o campo `type`

`"Árvore"`, `"Arbusto"`, `"Palmeira"`, `"Cacto"`, `"Trepadeira"`, `"Erva"`, `"Planta aquática"`, `"Orquídea"`, `"Bromélia"`

### Valores válidos para o campo `light`

`"Sol pleno"`, `"Meia-sombra"`, `"Sombra"`, `"Sol pleno a meia-sombra"`

### Valores válidos para o campo `uses`

`"Medicinal"`, `"Alimentar"`, `"Madeireiro"`, `"Ornamental"`, `"Sagrado/Ritual"`, `"Paisagismo"`, `"Artesanato"`, `"Apicultura"`, `"Sombra"`, `"Reflorestamento"`, `"Aromaterapia"`, `"Tintorial"`

---

## Como Editar os Ensaios

Os ensaios editoriais estão no arquivo `src/data/essays.json`. Cada ensaio segue este modelo:

```json
{
  "id": "titulo-do-ensaio",
  "title": "Título do Ensaio",
  "subtitle": "Subtítulo opcional",
  "author": "Nome do Autor",
  "date": "2024-01-15",
  "excerpt": "Resumo curto do ensaio (aparece na listagem)...",
  "content": "Texto completo do ensaio em formato Markdown...\n\n## Seção 1\n\nParágrafo...",
  "tags": ["flora", "cultura", "cerrado"],
  "imageUrl": ""
}
```

---

## Perguntas Frequentes

**O site vai sair do ar algum dia?**
O GitHub Pages é gratuito e não tem prazo de expiração para repositórios públicos. Enquanto o GitHub existir e o repositório for público, o site estará disponível. Para garantia extra, o código pode ser exportado e hospedado em outros serviços gratuitos como Netlify ou Vercel.

**Preciso de permissão para editar?**
Sim, é necessário ser colaborador do repositório. O administrador pode adicionar colaboradores em: Repositório → Settings → Collaborators.

**O que acontece se eu errar o JSON?**
O site pode quebrar temporariamente. Para corrigir, basta editar o arquivo novamente e corrigir o erro. O GitHub mantém histórico de todas as versões — é possível reverter para qualquer versão anterior em: Repositório → commits → clique no commit anterior.

**Como adicionar uma imagem à planta?**
1. Faça upload da imagem para um serviço gratuito como [Imgur](https://imgur.com) ou [Cloudinary](https://cloudinary.com)
2. Copie o link direto da imagem
3. Cole no campo `imageUrl` da planta no JSON

**Posso adicionar mais de 100 plantas?**
Sim! O site não tem limite de plantas. Basta adicionar novos objetos à lista no `plants.json`.

---

## Suporte e Contato

Em caso de dúvidas técnicas, consulte:
- [Documentação do GitHub Pages](https://docs.github.com/pt/pages)
- [Guia de JSON](https://www.json.org/json-pt.html)
- [Validador de JSON online](https://jsonlint.com/) — para verificar se o JSON está correto antes de salvar

---

*Este tutorial foi criado para garantir que o arquivo digital do livro "A Alma Brasileira na Paisagem" possa ser mantido e expandido por qualquer pessoa, independentemente do conhecimento técnico.*
