# VKS — VemCantar Karaokê Show

Catálogo de músicas em SolidJS + TypeScript + Ark UI + Vite, pensado para consulta rápida em celular, tablet e desktop.

## Stack

- SolidJS 1.x + TypeScript
- Ark UI para controles acessíveis (Field + Combobox)
- Vite
- CSS moderno, sem framework visual adicional
- Dados estáticos em `public/data/songs.json`, isolados por um repositório para facilitar futura troca por API/banco

## Rodar localmente

Requisitos: Node.js LTS e npm.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Build de produção

```bash
npm run typecheck
npm run build
npm run preview
```

O build fica em `dist/`.

## Hospedagem

O projeto é uma SPA estática. Você pode publicar a pasta `dist/` em Vercel, Netlify, Cloudflare Pages, GitHub Pages ou qualquer servidor de arquivos estáticos.

### Vercel / Netlify / Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Node: use uma versão LTS recente

Como o projeto usa apenas a rota `/`, não é necessário configurar um backend para a versão atual.

## Dados

O catálogo foi preparado a partir da planilha enviada junto ao projeto, mantendo somente os campos necessários para a consulta atual: `id`, `title`, `artist`, `language` e `genre`. Foram removidas duplicidades exatas de cantor + música.

Arquivo principal:

`public/data/songs.json`

Para trocar a fonte por uma API futuramente, altere apenas `src/data/songRepository.ts` e mantenha os componentes consumindo a interface `SongRepository`.

Os campos opcionais já previstos em `src/types/song.ts` incluem `tone`, `notes`, `difficulty`, `link` e `status`.

## Organização

```text
src/
  components/       # Header, filtros, combobox, cards e resultados
  data/             # Repositório e dados de fallback
  pages/            # Página principal do catálogo
  styles/           # CSS global e identidade visual
  types/            # Tipos de domínio
  utils/            # Normalização e lógica de busca
public/
  brand/            # Logo oficial fornecido
  data/             # Catálogo estático
```

## Identidade visual

A interface usa as cores oficiais fornecidas:

- `#F36F21` — laranja vibrante
- `#5F3A22` — marrom café
- `#C85A17` — laranja queimado
- `#FFFFFF` — branco
- `#DCDCDC` — cinza claro

O logo original fornecido foi mantido como imagem, sem redesenho ou alteração de proporção.

## Performance

O catálogo fica fora do bundle JS e é carregado como JSON estático. A interface filtra o conjunto em memória, mas renderiza inicialmente somente 80 resultados e oferece "Mostrar mais" para evitar uma lista gigantesca no DOM. O filtro de cantor também limita a lista de sugestões exibidas.

## Observação sobre a busca

A busca ignora maiúsculas/minúsculas e acentos. Assim, `evid`, `EVID`, `Evidências` e `evidencias` encontram a mesma música.
