# Sizotto INK

Site do estúdio de tatuagem **Sizotto INK**, da tatuadora Gabriela Sizotto (fineline e blackwork), em São Bernardo do Campo, SP.

O site apresenta o portfólio, a trajetória da tatuadora, o estúdio e os flashes disponíveis, e leva o visitante a pedir orçamento e agendar.

**Site no ar:** [sizottoink.vercel.app](https://sizottoink.vercel.app/)

> Status: **MVP em desenvolvimento**. Home (Fase 1), galerias com catálogo de flashes (Fase 2), página de orçamento (Fase 3) e SEO técnico (Fase 4) estão prontos. Faltam ativar a agenda Cal.com, concluir o Search Console e o Perfil da Empresa no Google, medir o Lighthouse e lançar.

## Objetivos

- Alavancar as vendas do estúdio mostrando o portfólio
- Facilitar orçamentos e agendamentos
- Exibir o catálogo de tatuagens disponíveis (flashes)
- Redirecionar para Instagram e TikTok (`@sizotto.ink`)
- Ser encontrado no Google (SEO local)

## Requisitos

| ID | Requisito | Status |
| --- | --- | --- |
| RF01 | Agendamento de horários para clientes | Formulário de orçamento pronto; agenda Cal.com a ativar |
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
| Orçamento | `orcamento.html` | Formulário de orçamento e espaço para a agenda Cal.com |

### Galerias e lightbox

- Grade de 2 colunas no celular e 3 no desktop; os flashes usam 4 colunas no desktop
- Lightbox em JavaScript puro: abre ao tocar na foto, fecha com Esc, com o X ou clicando no fundo
- Navegação por setas do teclado ou deslizando no celular
- Lazy loading e texto alternativo descritivo em todas as imagens
- Em `disponiveis.html`, "Quero este flash" leva a `orcamento.html?flash=<nome>` (`tigre`, `tucano`, `onca-e-pantera`, `onca-coracoes`)

### Orçamento

- **Campos:** nome, flash (opcional), ideia, região do corpo, tamanho em cm, link de referência (opcional), disponibilidade e confirmação de 18 anos ou mais
- **Validação** em JavaScript, com mensagem de erro em cada campo e foco no primeiro campo inválido
- **Flash pela URL:** `orcamento.html?flash=tigre` já abre com o flash selecionado; nomes desconhecidos são ignorados. Com um flash escolhido, a ideia deixa de ser obrigatória
- **Ao enviar:** mostra o resumo, copia para a área de transferência e abre o perfil `instagram.com/sizotto.ink`. A cliente toca em "Mensagem" e cola o texto
- **Conversa direta:** o botão "Abrir conversa direta" usa `ig.me/m/sizotto.ink`, que pode ser lento ou bloqueado em algumas redes, por isso não é o caminho principal
- **Privacidade:** nenhum dado é enviado a servidor; o formulário só monta a mensagem no aparelho da cliente

#### Ativar a agenda Cal.com

1. Crie o evento no [Cal.com](https://cal.com) (por exemplo, `cal.com/seu-usuario/tatuagem`).
2. Em `orcamento.html`, preencha o atributo `data-cal-url` do `<div id="agenda">`:

   ```html
   <div class="agenda" id="agenda" data-cal-url="https://cal.com/seu-usuario/tatuagem">
   ```

3. O iframe é criado sozinho e carrega só quando a página chega até ele. Apenas endereços `cal.com` são aceitos.

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

Mobile-first, contraste AA e animações discretas (respeita `prefers-reduced-motion`). Títulos e textos têm uma sombra leve para melhorar a leitura sobre fotos e sobre o fundo creme.

## Estrutura

```text
sizotto-ink/
├── index.html
├── fineline.html
├── blackwork.html
├── disponiveis.html
├── orcamento.html
├── 404.html                 (página de erro, não indexada)
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── vercel.json              (cache e cabeçalhos de segurança)
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   ├── gallery.css          (páginas de galeria, lightbox)
│   └── form.css             (formulário, resumo e agenda)
├── js/
│   ├── main.js              (menu, botão flutuante, animações)
│   ├── gallery.js           (lightbox)
│   └── form.js              (validação, resumo, cópia, Instagram, Cal.com)
├── img/
│   ├── og-capa.jpg          (1200x630, imagem ao compartilhar o link)
│   ├── hero-corrente.webp
│   ├── estudio.webp
│   ├── fineline-*.webp      (fada, morango, bone, snoopy, continue-a-nadar, forte-como-um-1950)
│   ├── blackwork-*.webp     (leme, correntes, personagem-escudo, coracao-olho, espada-fogueira, oni)
│   └── flash-*.webp         (tigre, tucano, onca-e-pantera, onca-coracoes)
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
3. Nos flashes, defina também `data-flash="nome"` no botão e o mesmo nome no link `orcamento.html?flash=nome`. Para o flash aparecer na lista do formulário, adicione também uma `<option>` com esse nome em `orcamento.html` e o nome legível em `FLASHES` no arquivo `js/form.js`.
4. Faça `git push`: a Vercel publica automaticamente.

## Deploy na Vercel

1. Envie o repositório para o GitHub.
2. Na Vercel, clique em **Add New > Project** e importe o repositório.
3. Framework Preset: **Other**. Não precisa de build command nem output directory.
4. Cada `git push` na branch `main` publica automaticamente; cada branch gera um preview.

## Desempenho e SEO

- Meta: carregar em menos de 2 s (LCP ≤ 2 s em 4G; Lighthouse Performance ≥ 90)
- Imagens em WebP, com `width` e `height`, `loading="lazy"` (exceto o hero) e até 200 KB cada
- `title` (até 60 caracteres), `meta description`, canonical e Open Graph únicos em cada página
- Imagem de compartilhamento `img/og-capa.jpg` (1200x630, JPG, para WhatsApp e Instagram)
- JSON-LD: `WebSite` e `TattooParlor` na Home; `BreadcrumbList` nas demais páginas
- `sitemap.xml` com as 5 páginas e `robots.txt` apontando para ele
- `vercel.json`: cache de 30 dias para `img/`, de 1 dia para `css/` e `js/`, e cabeçalhos de segurança
- Fonte Bodoni Moda carregada só no peso usado; `font-display: swap`
- `404.html` com `noindex` e `favicon.svg`
- Idioma `pt-BR`

Medir com o Lighthouse (Chrome DevTools) ou o [PageSpeed Insights](https://pagespeed.web.dev/) a cada deploy.

### Checklist de lançamento (feito por você, na sua conta Google)

1. **Publicar os arquivos:** envie ao GitHub `robots.txt`, `sitemap.xml`, `vercel.json`, `favicon.svg`, `404.html` e `img/og-capa.jpg`, além das páginas e CSS atualizados.
2. **Lighthouse:** no Chrome, abra cada página, DevTools > Lighthouse > Mobile > Analisar. Metas: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 95. Se o Performance ficar abaixo, o primeiro suspeito são imagens acima de 200 KB.
3. **Search Console** ([search.google.com/search-console](https://search.google.com/search-console)):
   1. Adicionar propriedade > **Prefixo do URL** > `https://sizottoink.vercel.app/`.
   2. Método **Tag HTML**: cole a meta tag no `<head>` do `index.html`, no lugar do comentário, faça `git push` e clique em Verificar.
   3. Em **Sitemaps**, envie `sitemap.xml`.
   4. Em **Inspeção de URL**, teste a Home e clique em **Solicitar indexação**.
4. **Perfil da Empresa no Google** ([business.google.com](https://business.google.com)):
   1. Nome exatamente **Sizotto INK**; categoria principal **Estúdio de tatuagem**.
   2. Endereço no centro de São Bernardo do Campo. Se o estúdio não for aberto a visitas sem hora marcada, configure como atendimento com hora marcada e decida se o endereço fica público.
   3. Horário de atendimento, site `https://sizottoink.vercel.app/`, Instagram e fotos do portfólio e do estúdio.
   4. Descrição com os termos naturais do serviço (fineline, blackwork, flashes, São Bernardo do Campo) e conclusão da verificação pedida pelo Google (vídeo ou código).
5. **Links:** coloque o endereço do site na bio do Instagram e do TikTok.
6. **Completar o JSON-LD** na Home quando houver endereço, telefone e horários definidos: `streetAddress`, `postalCode`, `telephone` e `openingHours`.
7. **Acompanhar:** consulte o desempenho no Search Console depois de 2 a 4 semanas; a indexação não é imediata.

## Roadmap

- [x] Fase 0: preparação
- [x] Fase 1: Home
- [x] Fase 2: galerias (`fineline.html`, `blackwork.html`), catálogo de flashes (`disponiveis.html`) e lightbox
- [x] Fase 3: página de orçamento (formulário, resumo, abertura do Instagram e espaço para o Cal.com)
- [ ] Ativar a agenda Cal.com (preencher `data-cal-url`)
- [x] Fase 4 (código): metadados, JSON-LD, sitemap, robots, cache, favicon, 404 e imagem de compartilhamento
- [ ] Fase 4 (sua parte): Lighthouse ≥ 90 medido, Search Console e Perfil da Empresa no Google (ver checklist)
- [ ] Fase 5: testes com clientes e lançamento

## Observações

- Os orçamentos são feitos somente pelo Instagram ([@sizotto.ink](https://www.instagram.com/sizotto.ink)); o formulário do site apenas organiza o briefing e não envia dados a nenhum servidor.
- Atendimento somente para maiores de 18 anos.
- As fotos do portfólio são trabalhos da tatuadora; use-as somente com autorização das clientes.
- Se o site ganhar um domínio próprio, atualize o canonical, o Open Graph e o JSON-LD, hoje apontando para `sizottoink.vercel.app`.

## Contato

- Instagram: [@sizotto.ink](https://www.instagram.com/sizotto.ink)
- TikTok: [@sizotto.ink](https://www.tiktok.com/@sizotto.ink)

## Licença

Todos os direitos reservados 2026 © Sizotto INK. O código e as imagens não podem ser copiados ou reutilizados sem autorização.
