# Sizotto INK

Site do estúdio de tatuagem **Sizotto INK**, da tatuadora Gabriela Sizotto (fineline e blackwork), em São Bernardo do Campo, SP.

O site apresenta o portfólio, a trajetória da tatuadora, o estúdio e os flashes disponíveis, e leva o visitante a pedir orçamento e agendar.

**Site no ar:** [sizottoink.vercel.app](https://sizottoink.vercel.app/)

> Status: **MVP em desenvolvimento**. Home (Fase 1) e galerias com catálogo de flashes (Fase 2) estão prontas; orçamento e agendamento estão na próxima fase.

## Objetivos

- Alavancar as vendas do estúdio mostrando o portfólio
- Facilitar orçamentos e agendamentos
- Exibir o catálogo de tatuagens disponíveis (flashes)
- Redirecionar para Instagram e TikTok (`@sizotto.ink`)
- Ser encontrado no Google (SEO local)

## Requisitos

| ID | Requisito | Status |
| --- | --- | --- |
| RF01 | Agendamento de horários para clientes | Fase 3 |
| RF02 | Catálogo de tatuagens disponíveis | Pronto (`disponiveis.html`) |
| RF03 | Redirecionamento para redes sociais | Pronto (Instagram e TikTok) |
| RNF01 | A página deve carregar em menos de 2 segundos | A medir com Lighthouse |

O PRD completo está documentado no Confluence/Claude Docs do projeto.

## Páginas

| Página | Arquivo | Conteúdo |
| --- | --- | --- |
| Home | `index.html` | Hero, Trajetória, Estúdio, Portfólio, promoção "Ganhe uma tattoo" e Contato |
| Fineline | `fineline.html` | Galeria de tatuagens fineline |
| Blackwork e outros | `blackwork.html` | Galeria de blackwork e outros estilos |
| Disponíveis | `disponiveis.html` | Catálogo de flashes, cada um com o botão "Quero este flash" |
| Orçamento | `orcamento.html` | Em breve (Fase 3) |

### Galerias e lightbox

- Grade de 2 colunas no celular e 3 no desktop; os flashes usam 4 colunas no desktop
- Lightbox em JavaScript puro: abre ao tocar na foto, fecha com Esc, com o X ou clicando no fundo
- Navegação por setas do teclado ou deslizando no celular
- Lazy loading e texto alternativo descritivo em todas as imagens
- Em `disponiveis.html`, "Quero este flash" leva a `orcamento.html?flash=<nome>` (`tigre`, `tucano`, `onca-e-pantera`, `onca-coracoes`)

## Tecnologias

- HTML5 semântico, CSS3 (variáveis, Grid e Flexbox) e JavaScript puro
- Sem frameworks e sem bibliotecas pesadas
- Fontes: Bodoni Moda (títulos) e Montserrat (textos), via Google Fonts
- Hospedagem: [Vercel](https://vercel.com)

## Design

| Elemento | Valor |
| --- | --- |
| Marrom | `#1C0A00` |
| Creme | `#EEEADB` |
| Vinho | `#5E0000` |
| Títulos | Bodoni Moda |
| Textos | Montserrat, caixa alta, com espaçamento entre letras |

Mobile-first, contraste AA e animações discretas (respeita `prefers-reduced-motion`).

## Estrutura

```text
sizotto-ink/
├── index.html
├── fineline.html
├── blackwork.html
├── disponiveis.html
├── orcamento.html           (em breve)
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   └── gallery.css
├── js/
│   ├── main.js              (menu, botão flutuante, animações)
│   └── gallery.js           (lightbox)
├── img/
│   ├── hero-corrente.webp
│   ├── estudio.webp
│   ├── fineline-*.webp      (fada, morango, bone, snoopy, continue-a-nadar, forte-como-um-1950)
│   ├── blackwork-*.webp     (leme, correntes, personagem-escudo, coracao-olho, espada-fogueira, oni)
│   └── flash-*.webp         (tigre, tucano, onca-e-pantera, onca-coracoes)
├── robots.txt               (em breve)
├── sitemap.xml              (em breve)
└── vercel.json              (em breve)
```

## Como rodar localmente

Não há etapa de build. Basta servir a pasta:

```bash
# Opção 1: Python
python3 -m http.server 3000

# Opção 2: Node
npx serve .
```

Abra `http://localhost:3000`.

Ou use a extensão **Live Server** no VSCode.

## Como adicionar fotos às galerias

1. Converta a imagem para WebP (até 200 KB) e salve em `img/` com um nome descritivo, por exemplo `fineline-rosa.webp`.
2. Copie um item `<li>` da galeria em `fineline.html`, `blackwork.html` ou `disponiveis.html` e troque `src` e `alt`.
3. Nos flashes, defina também `data-flash="nome"` no botão e o mesmo nome no link `orcamento.html?flash=nome`.
4. Faça `git push`: a Vercel publica automaticamente.

## Deploy na Vercel

1. Envie o repositório para o GitHub.
2. Na Vercel, clique em **Add New > Project** e importe o repositório.
3. Framework Preset: **Other**. Não precisa de build command nem output directory.
4. Cada `git push` na branch `main` publica automaticamente; cada branch gera um preview.

## Desempenho e SEO

- Meta: carregar em menos de 2 s (LCP ≤ 2 s em 4G; Lighthouse Performance ≥ 90)
- Imagens em WebP, com `width` e `height`, `loading="lazy"` (exceto o hero) e até 200 KB cada
- `title`, `meta description`, canonical e Open Graph únicos em cada página
- JSON-LD `TattooParlor` na Home; `sitemap.xml` e `robots.txt` na Fase 4
- Idioma `pt-BR`

Medir com o Lighthouse (Chrome DevTools) ou o [PageSpeed Insights](https://pagespeed.web.dev/) a cada deploy.

## Roadmap

- [x] Fase 0: preparação
- [x] Fase 1: Home
- [x] Fase 2: galerias (`fineline.html`, `blackwork.html`), catálogo de flashes (`disponiveis.html`) e lightbox
- [ ] Fase 3: orçamento e agendamento (formulário + abertura da DM no Instagram; Cal.com ou Calendly)
- [ ] Fase 4: SEO e desempenho (sitemap, robots, Search Console, Perfil da Empresa no Google)
- [ ] Fase 5: testes com clientes e lançamento

## Observações

- Os orçamentos são feitos somente pelo Instagram ([@sizotto.ink](https://www.instagram.com/sizotto.ink)); o formulário do site apenas organiza o briefing.
- Os botões "Faça um orçamento!", "Agende sua tattoo" e "Quero este flash" levam a `orcamento.html`, que será criada na Fase 3.
- As fotos do portfólio são trabalhos da tatuadora; use-as somente com autorização das clientes.
- Se o site ganhar um domínio próprio, atualize o canonical, o Open Graph e o JSON-LD, hoje apontando para `sizottoink.vercel.app`.

## Contato

- Instagram: [@sizotto.ink](https://www.instagram.com/sizotto.ink)
- TikTok: [@sizotto.ink](https://www.tiktok.com/@sizotto.ink)

## Licença

Todos os direitos reservados 2026 © Sizotto INK. O código e as imagens não podem ser copiados ou reutilizados sem autorização.
